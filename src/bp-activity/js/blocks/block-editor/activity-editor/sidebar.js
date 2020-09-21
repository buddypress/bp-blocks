/**
 * WordPress dependencies.
 */
const {
	components: {
		Panel,
		PanelBody,
		PanelRow,
		Dropdown,
		Button,
		DateTimePicker,
		Dashicon,
		SelectControl,
		ExternalLink,
	},
	i18n: {
		__,
	},
	date: {
		dateI18n,
		__experimentalGetSettings,
	},
	data: {
		useSelect,
		useDispatch,
	},
	element: {
		useState,
	},
} = wp;

/**
 * BuddyPress dependencies.
 */
const { AutoCompleter } = bp.blockComponents;

/**
 * Internal dependencies.
 */
import { BP_ACTIVITY_STORE_KEY } from '../store';

const GROUP_STATI = {
	public: __( 'Public', 'buddypress' ),
	private: __( 'Private', 'buddypress' ),
	hidden: __( 'Hidden', 'buddypress' ),
};

const getSlugValue = ( item ) => {
	if ( item && item.status && GROUP_STATI[ item.status ] ) {
		return GROUP_STATI[ item.status ];
	}

	return null;
};

export default function Sidebar() {
	const [ component, onSelect ] = useState( 'activity' );
	const { activityDate, userGroups, group, user } = useSelect( ( select ) => {
		const store = select( BP_ACTIVITY_STORE_KEY );

		return {
			activityDate: store.getActivityDate(),
			userGroups: store.getUserGroups(),
			group: store.getActivityGroup(),
			user: store.getCurrentUser(),
		};
	}, [] );

	const {
		setActivityDate,
		setActivityGroup,
		resetActivityGroup,
	} = useDispatch( BP_ACTIVITY_STORE_KEY );

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
					opened
				>
					<PanelRow className="activity-editor-sidebar-main-panel__schedule">
						<span>{ __( 'Publish', 'buddypress' ) }</span>
						<Dropdown
							position="bottom left"
							contentClassName="activity-editor-sidebar-main-panel-schedule__dialog"
							renderToggle={ ( { onToggle, isOpen } ) => (
								<Button
									className="activity-editor-sidebar-main-panel-schedule__toggle"
									onClick={ onToggle }
									aria-expanded={ isOpen }
									isLink
								>
									{ scheduleLabel }
								</Button>
							) }
							renderContent={ () => <DateTimePicker currentDate={ currentDate } onChange={ ( date ) => setActivityDate( date ) } /> }
						/>

						{ !! activityDate && (
							<Button
								className="activity-editor-sidebar-main-panel-schedule__cancel"
								onClick={ () => setActivityDate( '' ) }
								isLink
							>
								<Dashicon icon="dismiss" />
								<span className="screen-reader-text">
									{ __( 'Cancel Schedule', 'buddypress' ) }
								</span>
							</Button>
						) }
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
									objectQueryArgs={ { 'show_hidden': true, 'user_id': user.id } }
									slugValue={ getSlugValue }
									ariaLabel={ __( 'Group\'s name', 'buddypress' ) }
									placeholder={ __( 'Enter Group\'s name here…', 'buddypress' ) }
									onSelectItem={ ( { itemID } ) => setActivityGroup( itemID ) }
									useAvatar
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
