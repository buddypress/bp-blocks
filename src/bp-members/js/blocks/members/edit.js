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

const editMembers = ( { attributes, setAttributes, bpSettings, bpMembers } ) => {
	const {
		isAvatarEnabled,
		isMentionEnabled,
		isCoverImageEnabled,
	} = bpSettings;
	const {
		itemIDs,
		avatarSize,
		displayMentionSlug,
		displayUserName,
		displayCoverImage,
	} = attributes;
	const hasMembers = 0 !== itemIDs.length;
	const [ members, queryMembers ] = useState( [] );
	let membersList;

	if ( hasMembers && itemIDs.length !== members.length ) {
		apiFetch( {
			path: addQueryArgs( `/buddypress/v1/members`, { include: itemIDs } ),
		} ).then( items => {
			queryMembers( items );
		} )
	}

	if ( members.length ) {
		membersList = members.map( ( member ) => {
			return (
				<div key={ 'bp-member-' + member.id } className="bp-members-block-list">
					{ isAvatarEnabled && (
						<img key={ 'avatar-' + member.id } className="user-avatar" alt="" src={ member.avatar_urls[ avatarSize ] } />
					) }
					<span>{ member.name }</span>
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
						label={ __( 'Display Profile button', 'buddypress' ) }
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

					{ isCoverImageEnabled && (
						<ToggleControl
							label={ __( 'Display Cover Image', 'buddypress' ) }
							checked={ !! displayCoverImage }
							onChange={ () => {
								setAttributes( { displayCoverImage: ! displayCoverImage } );
							} }
							help={
								displayCoverImage
									? __( 'Include the user\'s cover image over their display name.', 'buddypress' )
									: __( 'Toggle to display the user\'s cover image over their display name.', 'buddypress' )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ membersList }
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
