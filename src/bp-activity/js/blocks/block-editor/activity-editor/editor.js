/**
 * WordPress dependencies.
 */
const {
	data: {
		useSelect,
		useDispatch,
	},
	element: {
		useMemo,
	},
	blocks: {
		serialize,
		synchronizeBlocksWithTemplate,
	},
	mediaUtils: {
		uploadMedia,
	},
	i18n: {
		__,
	},
	components: {
		Popover,
	},
	blockEditor: {
		BlockEditorKeyboardShortcuts,
		BlockEditorProvider,
		BlockList,
		WritingFlow,
		ObserveTyping,
	},
} = wp;

/**
 * Internal dependencies.
 */
import { BP_ACTIVITY_STORE_KEY } from '../store';

export default function BlockEditor( { settings: _settings } ) {
	const blocks = useSelect( ( select ) => {
		return select( BP_ACTIVITY_STORE_KEY ).getBlocks();
	}, [] );
	const { updateContent, resetJustPostedActivity } = useDispatch( BP_ACTIVITY_STORE_KEY );
	const activityCreated = useSelect( ( select ) => {
		return select( BP_ACTIVITY_STORE_KEY ).getJustPostedActivity();
	}, [] );
	const { createInfoNotice, createErrorNotice, removeNotice } = useDispatch( 'core/notices' );

	const canUserCreateMedia = useSelect( ( select ) => {
		const _canUserCreateMedia = select( 'core' ).canUser( 'create', 'media' );
		return _canUserCreateMedia || _canUserCreateMedia !== false;
	}, [] );

	const settings = useMemo(() => {
		if ( ! canUserCreateMedia ) {
			return _settings;
		}
		return {
			..._settings,
			mediaUpload( { onError, ...rest } ) {
				uploadMedia( {
					wpAllowedMimeTypes: _settings.allowedMimeTypes,
					onError: ( { message } ) => onError( message ),
					...rest,
				} );
			},
		};
	}, [ canUserCreateMedia, _settings ] );

	// Apply template if available.
	const activityBlocks = settings.template ?
		synchronizeBlocksWithTemplate( blocks, settings.template )
		: blocks;

	const updateBlocks = ( newBlocks ) => {
		updateContent( serialize( newBlocks ), newBlocks );
	};

	const resetActivity = ( activity ) => {
		updateBlocks( activity.blocks );
		removeNotice( 'activity-posted-error' );
	};

	if ( activityCreated ) {
		if ( activityCreated.link ) {
			if ( settings.isActivityAdminScreen && true === settings.isActivityAdminScreen ) {
				createInfoNotice( __( 'Activity successfully published', 'buddypress' ), {
					type: 'snackbar',
					isDismissible: true,
					actions: [ {
						label: __( 'View activity', 'buddypress' ),
						url: activityCreated.link,
					} ],
				} );
			} else {
				activityCreated.message = __( 'View shared activity', 'buddypress' );
				window.parent.postMessage( activityCreated, window.parent.location.href );
			}
		}

		if ( activityCreated.error ) {
			createErrorNotice( activityCreated.error, {
				id: 'activity-posted-error',
				isDismissible: true,
				actions: [ {
					label: __( 'Restore Activity content', 'buddypress' ),
					onClick: () => { resetActivity( activityCreated ); },
				} ],
			} );
		}

		if ( activityCreated.id ) {
			resetJustPostedActivity();
		}
	}

	return (
		<div className="activity-block-editor">
			<BlockEditorProvider
				value={ activityBlocks }
				onChange={ updateBlocks }
				settings={ settings }
			>
				<div className="editor-styles-wrapper">
					<BlockEditorKeyboardShortcuts />
					<Popover.Slot name="block-toolbar" />
						<WritingFlow>
							<ObserveTyping>
								<BlockList className="activity-block-editor__block-list" />
							</ObserveTyping>
						</WritingFlow>
					<Popover.Slot />
				</div>
			</BlockEditorProvider>
		</div>
	);
}
