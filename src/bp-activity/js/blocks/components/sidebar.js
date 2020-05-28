/**
 * WordPress dependencies
 */
const { createSlotFill, Panel } = wp.components;
const { __ } = wp.i18n;

const { Slot: InspectorSlot, Fill: InspectorFill } = createSlotFill(
	'StandAloneBlockEditorSidebarInspector'
);

function Sidebar() {
	return (
		<div
			className="activity-editor-sidebar"
			role="region"
			aria-label={ __( 'Activity Block Editor advanced settings.', 'buddypress' ) }
			tabIndex="-1"
		>
			<Panel header={ __( 'Settings', 'buddypress' ) }>
				<InspectorSlot bubblesVirtually />
			</Panel>
		</div>
	);
}

Sidebar.InspectorFill = InspectorFill;

export default Sidebar;
