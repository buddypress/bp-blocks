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
		useDispatch,
	},
	components: {
		Popover,
		SlotFillProvider,
		FocusReturnProvider,
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
	const { activeComponents } = settings;
	const { setActiveComponents } = useDispatch( BP_ACTIVITY_STORE_KEY );

	// Set active components.
	setActiveComponents( activeComponents );

	return (
		<SlotFillProvider>
			<FocusReturnProvider>
				<EditorSkeleton
					className={ isSidebarVisible ? 'sidebar-visible' : 'sidebar-invisible' }
					header={<Header />}
					sidebar={<Sidebar />}
					content={
						<Fragment>
							<Notices />
							<BlockEditor settings={settings} />
						</Fragment>
					}
				/>
				<Popover.Slot />
			</FocusReturnProvider>
		</SlotFillProvider>
	);
}

domReady( function() {
	const settings = window.activityEditorSettings || {};
	registerActivityBlocks();
	render( <Editor settings={ settings } />, document.getElementById( 'bp-activity-block-editor' ) );
} );
