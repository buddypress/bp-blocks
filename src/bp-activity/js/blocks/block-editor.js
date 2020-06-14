/**
 * WordPress dependencies
 */
const domReady = wp.domReady;
const { render, createElement } = wp.element;
const { Popover, SlotFillProvider, DropZoneProvider } = wp.components;
const { __experimentalEditorSkeleton } = wp.blockEditor;
const { useSelect } = wp.data;

/**
 * Internal dependencies
 */
import './store';
import Notices from './components/activity-editor/notices'
import Header from './components/activity-editor/header';
import Sidebar from './components/activity-editor/sidebar';
import BlockEditor from './components/activity-editor/editor';
import registerActivityBlocks from './components/block-types';

/**
 * Styles
 */
import '../../css/blocks/activity-editor.scss';

function Editor( { settings } ) {
	const EditorSkeleton = __experimentalEditorSkeleton;
	const isSidebarVisible = useSelect( ( select ) => {
		return select( 'bp/activity' ).isSidebarVisible();
	}, [] );

	return (
		<SlotFillProvider>
			<DropZoneProvider>
				<EditorSkeleton
					className={ isSidebarVisible ? 'sidebar-visible' : 'sidebar-invisible' }
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
