/**
 * WordPress dependencies
 */
const { useSelect, useDispatch } = wp.data;
const { useEffect, useState, useMemo } = wp.element;
const { serialize, parse } = wp.blocks;
const { uploadMedia } = wp.mediaUtils;
const {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} = wp.blockEditor;

/**
 * Internal dependencies
 */
import Sidebar from './sidebar';

function BlockEditor( { settings: _settings } ) {
	const [ blocks, updateBlocks ] = useState( [] );
	const { createInfoNotice } = useDispatch( 'core/notices' );

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

	useEffect( () => {
		const storedBlocks = window.localStorage.getItem( 'bpActivityBlocks' );

		if ( storedBlocks && storedBlocks.length ) {
			updateBlocks( () => parse( storedBlocks ) );
			createInfoNotice( 'Blocks loaded', {
				type: 'snackbar',
				isDismissible: true,
			} );
		}
	}, [] );

	function persistBlocks( newBlocks ) {
		updateBlocks( newBlocks );
		window.localStorage.setItem( 'bpActivityBlocks', serialize( newBlocks ) );
	}

	return (
		<div className="activity-block-editor">
			<BlockEditorProvider
				value={ blocks }
				onInput={ updateBlocks }
				onChange={ persistBlocks }
				settings={ settings }
			>
				<Sidebar.InspectorFill>
					<BlockInspector />
				</Sidebar.InspectorFill>
				<div className="editor-styles-wrapper">
					<BlockEditorKeyboardShortcuts />
					<WritingFlow>
						<ObserveTyping>
							<BlockList className="activity-block-editor__block-list" />
						</ObserveTyping>
					</WritingFlow>
				</div>
			</BlockEditorProvider>

		</div>
	);
}

export default BlockEditor;

