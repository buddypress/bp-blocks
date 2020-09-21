/**
 * WordPress dependencies.
 */
const {
	domReady,
	element: {
		render,
		Fragment,
	},
	data: {
		useSelect,
	},
	components: {
		Popover,
		SlotFillProvider,
		DropZoneProvider,
	},
} = wp;

/**
 * Internal dependencies.
 */
import { BP_ACTIVITY_STORE_KEY } from './block-editor/store';
import EditorSkeleton from './block-editor/activity-editor/skeleton';
import Notices from './block-editor/activity-editor/notices';
import Header from './block-editor/activity-editor/header';
import Sidebar from './block-editor/activity-editor/sidebar';
import BlockEditor from './block-editor/activity-editor/editor';
import registerActivityBlocks from './block-editor/block-types';

/**
 * Styles.
 */
import '../../css/blocks/activity-editor.scss';

function Editor( { settings } ) {
	const isSidebarVisible = useSelect( ( select ) => {
		return select( BP_ACTIVITY_STORE_KEY ).isSidebarVisible();
	}, [] );

	return (
		<SlotFillProvider>
			<DropZoneProvider>
				<EditorSkeleton
					className={ isSidebarVisible ? 'sidebar-visible' : 'sidebar-invisible' }
					header={<Header />}
					sidebar={<Sidebar />}
					content={(
						<Fragment>
							<Notices />
							<BlockEditor settings={settings} />
						</Fragment>
					)}
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
