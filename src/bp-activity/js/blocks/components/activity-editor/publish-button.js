/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button, Dashicon, VisuallyHidden } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

class ActivityPublishButton extends Component {
	constructor() {
		super( ...arguments );
	}

	postActivity() {
		const { user, content, date, onInsertActivity } = this.props;
		const activity = {
			type: 'activity_update',
			user_id: user.id,
			component: 'activity',
			content: content,
			date: date,
		};

		return onInsertActivity( activity );
	}

	toggleSidebarVisibility() {
		const { onToggleSidebarVisibility, isSidebarVisible } = this.props;

		return onToggleSidebarVisibility( ! isSidebarVisible );
	}

	render() {
		const { content, inserting } = this.props;
		const isDisabled = ! content || inserting;
		const isBusy = !! inserting;

		return (
			<div className="activity-editor-header__settings">
				<Button
					className="activity-editor-header__publish-button"
					isPrimary
					disabled={ isDisabled }
					isBusy={ isBusy }
					onClick={ () => this.postActivity() }
				>
					{ __( 'Publish', 'buddypress' ) }
				</Button>

				<Button
					className="activity-editor-header__sidebar-toggle"
					onClick={ () => this.toggleSidebarVisibility() }
				>
					<Dashicon icon="admin-generic"/>
					<VisuallyHidden>{ __( 'Toggle Settings Sidebar', 'buddypress' ) }</VisuallyHidden>
				</Button>
			</div>
		);
	}
};

export default compose( [
	withSelect( ( select ) => {
		const store = select( 'bp/activity' );
		return {
			user: store.getCurrentUser(),
			content: store.getContent(),
			inserting: store.isInsertingActivity(),
			isSidebarVisible: store.isSidebarVisible(),
			date: store.getActivityDate(),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onInsertActivity( activity ) {
			dispatch( 'bp/activity' ).insertActivity( activity );
		},
		onToggleSidebarVisibility( visibility ) {
			dispatch( 'bp/activity' ).toggleSidebarVisibility( visibility );
		},
	} ) ),
] )( ActivityPublishButton );
