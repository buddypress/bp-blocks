/**
 * WordPress dependencies.
 */
const {
	blockEditor: {
		InspectorControls,
	},
	components: {
		Placeholder,
		PanelBody,
		SelectControl,
		ToggleControl,
		Button,
	},
	compose: {
		compose,
	},
	data: {
		withSelect,
	},
	element: {
		createElement,
		Fragment,
		useState,
	},
	i18n: {
		__,
		sprintf,
	},
	apiFetch,
	url: {
		addQueryArgs,
	},
} = wp;

/**
 * BuddyPress dependencies.
 */
const { AutoCompleter } = bp.blockComponents;

/**
 * Internal dependencies.
 */
import { AVATAR_SIZES } from './constants';

const getSlugValue = ( item ) => {
	if ( item && item.mention_name ) {
		return item.mention_name;
	}

	return null;
}

const editMembers = ( { attributes, setAttributes, bpSettings } ) => {
	const {
		isAvatarEnabled,
		isMentionEnabled,
	} = bpSettings;
	const {
		itemIDs,
		avatarSize,
		displayMentionSlug,
		displayUserName,
	} = attributes;
	const hasMembers = 0 !== itemIDs.length;
	const [ members, setMembers ] = useState( [] );
	let membersList;

	if ( hasMembers && itemIDs.length !== members.length ) {
		/**
		 * The populate_extras param should help us to get specific BP data for fetched users
		 *
		 * @see https://github.com/buddypress/BP-REST/pull/355
		 */
		apiFetch( {
			path: addQueryArgs( `/buddypress/v1/members`, { populate_extras: true, include: itemIDs } ),
		} ).then( items => {
			setMembers( items );
		} )
	}

	if ( members.length ) {
		membersList = members.map( ( member ) => {
			return (
				<div key={ 'bp-member-' + member.id } className="member-content">
					{ isAvatarEnabled && 'none' !== avatarSize && (
						<div className="item-header-avatar">
							<a href={ member.link } target="_blank">
								<img
									key={ 'avatar-' + member.id }
									className="avatar"
									alt={ sprintf( __( 'Profile photo of %s', 'buddypress' ), member.name ) }
									src={ member.avatar_urls[ avatarSize ] }
								/>
							</a>
						</div>
					) }
					<div className="member-description">
						{ displayUserName && (
							<strong>
								<a href={ member.link } target="_blank">
									{ member.name }
								</a>
							</strong>
						) }
						{ isMentionEnabled && displayMentionSlug && (
							<span className="user-nicename">@{ member.mention_name }</span>
						) }
					</div>
				</div>
			);
		} );
	}

	const onSelectedMember = ( { itemID } ) => {
		if ( -1 === itemIDs.indexOf( itemID ) && itemID ) {
			setAttributes( { itemIDs: [...itemIDs, parseInt( itemID, 10 ) ] } );
		}
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'buddypress' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Display the user name', 'buddypress' ) }
						checked={ !! displayUserName }
						onChange={ () => {
							setAttributes( { displayUserName: ! displayUserName } );
						} }
						help={
							displayUserName
								? __( 'Include the user\'s display name.', 'buddypress' )
								: __( 'Toggle to include user\'s display name.', 'buddypress' )
						}
					/>

					{ isMentionEnabled && (
						<ToggleControl
							label={ __( 'Display Mention slug', 'buddypress' ) }
							checked={ !! displayMentionSlug }
							onChange={ () => {
								setAttributes( { displayMentionSlug: ! displayMentionSlug } );
							} }
							help={
								displayMentionSlug
									? __( 'Include the user\'s mention name under their display name.', 'buddypress' )
									: __( 'Toggle to display the user\'s mention name under their display name.', 'buddypress' )
							}
						/>
					) }

					{ isAvatarEnabled && (
						<SelectControl
							label={ __( 'Avatar size', 'buddypress' ) }
							value={ avatarSize }
							options={ AVATAR_SIZES }
							help={ __( 'Select "None" to disable the avatar.', 'buddypress' ) }
							onChange={ ( option ) => {
								setAttributes( { avatarSize: option } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div className={ 'bp-block-members avatar-' +avatarSize  }>
				{ membersList }
			</div>

			<Placeholder
				icon={ hasMembers ? '' : 'groups' }
				label={ hasMembers ? '' : __( 'BuddyPress Members', 'buddypress' ) }
				instructions={ __( 'Start typing the name of the member you want to add to the members list.', 'buddypress' ) }
				className={ 0 !== itemIDs.length ? 'is-appender' : 'is-large' }
			>
				<AutoCompleter
					component="members"
					slugValue={ getSlugValue }
					ariaLabel={ __( 'Member\'s username', 'buddypress' ) }
					placeholder={ __( 'Enter Member\'s username here…', 'buddypress' ) }
					onSelectItem={ onSelectedMember }
					useAvatar={ isAvatarEnabled }
				/>
			</Placeholder>
		</Fragment>
	);
};

const editMembersBlock = compose( [
	withSelect( ( select ) => {
		const editorSettings = select( 'core/editor' ).getEditorSettings();

		return {
			bpSettings: editorSettings.bp.members || {},
		};
	} ),
] )( editMembers );

export default editMembersBlock;
