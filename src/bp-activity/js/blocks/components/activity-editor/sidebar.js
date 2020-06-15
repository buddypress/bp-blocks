/**
 * WordPress dependencies
 */
const {
	Panel,
	PanelBody,
	PanelRow,
	Dropdown,
	Button,
	DateTimePicker,
	Dashicon,
} = wp.components;
const { __ } = wp.i18n;
const { dateI18n, __experimentalGetSettings } = wp.date;
const { useSelect, useDispatch } = wp.data;
const { useState } = wp.element;

function Sidebar() {
	const [ isOpen, onToggle ] = useState( false );
	const activityDate = useSelect( ( select ) => {
		return select( 'bp/activity' ).getActivityDate();
	}, [] );
	const { setActivityDate } = useDispatch( 'bp/activity' );

	const currentDate = ! activityDate ? new Date() : activityDate;
	const dateTimeFormat = __experimentalGetSettings();
	const scheduleLabel = ! activityDate
		? __( 'Immediately', 'buddypress' )
		: dateI18n(
			`${ dateTimeFormat.formats.date } ${ dateTimeFormat.formats.time }`,
			activityDate
		);

	return (
		<div
			className="activity-editor-sidebar"
			role="region"
			aria-label={ __( 'Activity Block Editor advanced settings.', 'buddypress' ) }
			tabIndex="-1"
		>
			<Panel header={ __( 'Activity Settings', 'buddypress' ) }>
				<PanelBody
					className="activity-editor-sidebar__main-panel"
					title={ __( 'Status & sharing options', 'buddypress' ) }
					opened={ true }
				>
					<PanelRow className="activity-editor-sidebar-main-panel__schedule">
						<span>{ __( 'Publish', 'buddypress' ) }</span>
						<Dropdown
							position="bottom left"
							contentClassName="activity-editor-sidebar-main-panel-schedule__dialog"
							renderToggle={ ( { onToggle, isOpen } ) => (
								<>
									<Button
										className="activity-editor-sidebar-main-panel-schedule__toggle"
										onClick={ onToggle }
										aria-expanded={ isOpen }
										isLink
									>
										{ scheduleLabel }
									</Button>

									{ !! activityDate && (
										<Button
											className="activity-editor-sidebar-main-panel-schedule__cancel"
											onClick={ () => setActivityDate( '' ) }
											isLink
										>
											<Dashicon icon="dismiss" />
											<span className="screen-reader-text">{ __( 'Cancel Schedule', 'buddypress' ) }</span>
										</Button>
									) }
								</>
							) }
							renderContent={ () => <DateTimePicker currentDate={ currentDate } onChange={ ( date ) => setActivityDate( date ) } /> }
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
		</div>
	);
}

export default Sidebar;
