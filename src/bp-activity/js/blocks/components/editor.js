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
	const blocks = useSelect( ( select ) => {
		return select( 'bp/activity' ).getBlocks();
	}, [] );
	const { createInfoNotice } = useDispatch( 'core/notices' );
	const { updateContent } = useDispatch( 'bp/activity' );

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

	function updateBlocks( newBlocks ) {
		updateContent( serialize( newBlocks ), newBlocks );
	}

	return (
		<div className="activity-block-editor">
			<BlockEditorProvider
				value={ blocks }
				onChange={ updateBlocks }
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

