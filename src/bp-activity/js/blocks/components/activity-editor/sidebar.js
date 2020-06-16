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
	SelectControl,
	ExternalLink,
} = wp.components;
const { __ } = wp.i18n;
const { dateI18n, __experimentalGetSettings } = wp.date;
const { useSelect, useDispatch } = wp.data;
const { useState } = wp.element;

/**
 * BuddyPress dependencies.
 */
const { AutoCompleter } = bp.blockComponents;

function Sidebar() {
	const [ isOpen, onToggle ] = useState( false );
	const [ component, onSelect ] = useState( 'activity' );
	const activityDate = useSelect( ( select ) => {
		return select( 'bp/activity' ).getActivityDate();
	}, [] );
	const userGroups = useSelect( ( select ) => {
		return select( 'bp/activity' ).getUserGroups();
	}, [] );
	const group = useSelect( ( select ) => {
		return select( 'bp/activity' ).getActivityGroup();
	}, [] );
	const { setActivityDate, setActivityGroup, resetActivityGroup } = useDispatch( 'bp/activity' );

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

					{ userGroups && 0 !== userGroups.length && ! group && (
						<PanelRow className="activity-editor-sidebar-main-panel__postin">
							<span>{ __( 'Post in', 'buddypress' ) }</span>
							<SelectControl
								value={ component }
								options={ [
									{ label: __( 'my profile', 'buddypress' ), value: 'activity' },
									{ label: __( 'a Group', 'buddypress' ), value: 'groups' },
								] }
								onChange={ ( component ) => onSelect( component ) }
							/>
						</PanelRow>
					) }
					{ 'groups' === component && ! group && (
						<>
							<PanelRow className="activity-editor-sidebar-main-panel-postingroups-help">
								<p className="description">
									{ __( 'Start typing the name of the group you want to post your activity into.', 'buddypress' ) }
								</p>
							</PanelRow>
							<PanelRow className="activity-editor-sidebar-main-panel-postingroups-autocomplete">
								<AutoCompleter
									component="groups"
									ariaLabel={ __( 'Group\'s name', 'buddypress' ) }
									placeholder={ __( 'Enter Group\'s name here…', 'buddypress' ) }
									onSelectItem={ ( { itemID } ) => setActivityGroup( itemID ) }
									useAvatar={ true }
								/>
							</PanelRow>
						</>
					) }
					{ !! group && !! group.id && (
						<PanelRow className="activity-editor-sidebar-main-panel-postingroups-selection">
							<span>{ __( 'Post in', 'buddypress' ) }</span>
							<ExternalLink href={ group.link }>{ group.name }</ExternalLink>
							<Button
								className="activity-editor-sidebar-main-panel-postingroups-selection__cancel"
								onClick={ () => resetActivityGroup() }
								isLink
							>
								<Dashicon icon="dismiss" />
								<span className="screen-reader-text">{ __( 'Remove Group', 'buddypress' ) }</span>
							</Button>
						</PanelRow>
					) }
				</PanelBody>
			</Panel>
		</div>
	);
}

export default Sidebar;
