/**
 * WordPress dependencies
 */
const domReady = wp.domReady;
const { render, createElement } = wp.element;
const { Popover, SlotFillProvider, DropZoneProvider } = wp.components;
const { __experimentalEditorSkeleton } = wp.blockEditor;

/**
 * Internal dependencies
 */
import './store';
import Notices from './components/notices'
import Header from './components/header';
import Sidebar from './components/sidebar';
import BlockEditor from './components/editor';
import registerActivityBlocks from './block-types';

/**
 * Styles
 */
import '../../css/blocks/activity-editor.scss';

function Editor( { settings } ) {
	const EditorSkeleton = __experimentalEditorSkeleton;

	return (
		<SlotFillProvider>
			<DropZoneProvider>
				<EditorSkeleton
					header={ <Header /> }
					sidebar={<Sidebar />}
					content={
						<>
							<Notices />
							<BlockEditor settings={settings} />
						</>
					}
				/>
				<Popover.Slot />
			</DropZoneProvider>
		</SlotFillProvider>
	);
}

domReady( function() {
	const settings = window.activityEditorSettings || {};
	registerActivityBlocks();
	render( <Editor settings={ settings } />, document.getElementById( 'bp-activity-block-editor' ) );
} );
