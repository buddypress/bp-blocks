/**
 * WordPress dependencies
 */
const { useSelect, useDispatch } = wp.data;
const { useMemo } = wp.element;
const { serialize, synchronizeBlocksWithTemplate } = wp.blocks;
const { uploadMedia } = wp.mediaUtils;
const {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} = wp.blockEditor;
const { Popover } = wp.components;
const { __ } = wp.i18n;

function BlockEditor( { settings: _settings } ) {
	const blocks = useSelect( ( select ) => {
		return select( 'bp/activity' ).getBlocks();
	}, [] );
	const { updateContent, resetJustPostedActivity } = useDispatch( 'bp/activity' );
	const actictivityCreated = useSelect( ( select ) => {
		return select( 'bp/activity' ).getJustPostedActivity();
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
	const activityBlocks = settings.template ? synchronizeBlocksWithTemplate( blocks, settings.template ) : blocks;

	const updateBlocks = ( newBlocks ) => {
		updateContent( serialize( newBlocks ), newBlocks );
	}

	const resetActivity = ( activity ) => {
		updateBlocks( activity.blocks );
		removeNotice( 'activity-posted-error' );
	}

	if ( actictivityCreated ) {
		if ( actictivityCreated.link ) {
			if ( settings.isActivityAdminScreen && true === settings.isActivityAdminScreen ) {
				createInfoNotice( __( 'Activity successfully published', 'buddypress' ), {
					type: 'snackbar',
					isDismissible: true,
					actions: [ {
						label: __( 'View activity', 'buddypress' ),
						url: actictivityCreated.link,
					} ],
				} );
			} else {
				actictivityCreated.message = __( 'View shared activity', 'buddypress' );
				window.parent.postMessage( actictivityCreated, window.parent.location.href );
			}
		}

		if ( actictivityCreated.error ) {
			createErrorNotice( actictivityCreated.error, {
				id: 'activity-posted-error',
				isDismissible: true,
				actions: [ {
					label: __( 'Restore Activity content', 'buddypress' ),
					onClick: () => { resetActivity( actictivityCreated ) },
				} ],
			} );
		}

		if ( actictivityCreated.id ) {
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

export default BlockEditor;

