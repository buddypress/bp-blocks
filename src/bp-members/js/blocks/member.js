/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement, Fragment } = wp.element;
const { Placeholder, Disabled, PanelBody, SelectControl, ToggleControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { withSelect } = wp.data;
const { compose } = wp.compose;
const { ServerSideRender } = wp.editor;
const { __ } = wp.i18n;

/**
 * Internal dependencies.
 */
import BPAutocompleter from '../../../bp-core/js/blocks/bp-autocompleter';

const AVATAR_SIZES = [
	{
		label: __( 'None', 'buddypress' ),
		value: 'none',
	},
	{
		label: __( 'Thumb', 'buddypress' ),
		value: 'thumb',
	},
	{
		label: __( 'Full', 'buddypress' ),
		value: 'full',
	},
];

const editMember = ( { attributes, setAttributes, bpSettings } ) => {
	const { isAvatarEnabled, isMentionEnabled } = bpSettings;
	const { avatarSize, displayMentionSlug, displayActionButton } = attributes;

	if ( ! attributes.itemID ) {
		return (
			<Placeholder
				icon="admin-users"
				label={ __( 'BuddyPress Member', 'buddypress' ) }
				instructions={ __( 'Start typing the name of the member you want to feature into this post.', 'buddypress' ) }
			>
				<BPAutocompleter
					component="members"
					ariaLabel={ __( 'Member\'s username', 'buddypress' ) }
					placeholder={ __( 'Enter Member\'s username here…', 'buddypress' ) }
					onSelectItem={ setAttributes }
					useAvatar={ isAvatarEnabled }
				/>
			</Placeholder>
		);
	}

	return (
		<Fragment>
			<InspectorControls>
				{ isAvatarEnabled && (
					<PanelBody title={ __( 'Avatar settings', 'buddypress' ) }>
						<SelectControl
							label={ __( 'Size', 'buddypress' ) }
							value={ avatarSize }
							options={ AVATAR_SIZES }
							onChange={ ( option ) => {
								setAttributes( { avatarSize: option } );
							} }
						/>
					</PanelBody>
				) }
				{ isMentionEnabled && (
					<PanelBody title={ __( 'Mention settings', 'buddypress' ) }>
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
					</PanelBody>
				) }
				<PanelBody title={ __( 'Profile button settings', 'buddypress' ) }>
					<ToggleControl
						label={ __( 'Display Profile button', 'buddypress' ) }
						checked={ !! displayActionButton }
						onChange={ () => {
							setAttributes( { displayActionButton: ! displayActionButton } );
						} }
						help={
							displayMentionSlug
								? __( 'Include a link to the user\'s profile page under their display name.', 'buddypress' )
								: __( 'Toggle to display a link to the user\'s profile page under their display name.', 'buddypress' )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<ServerSideRender block="bp/member" attributes={ attributes } />
			</Disabled>
		</Fragment>
	);
};

const editMemberBlock = compose( [
	withSelect( ( select ) => {
		const editorSettings = select( 'core/editor' ).getEditorSettings();
		return {
			bpSettings: editorSettings.bp.members || {},
		};
	} ),
] )( editMember );

registerBlockType( 'bp/member', {
	title: __( 'Member', 'buddypress' ),

	description: __( 'BuddyPress Member.', 'buddypress' ),

	icon: 'admin-users',

	category: 'buddypress',

	attributes: {
		itemID: {
			type: 'integer',
			default: 0,
		},
		avatarSize: {
			type: 'string',
			default: 'full',
		},
		displayMentionSlug: {
			type: 'boolean',
			default: true,
		},
		displayActionButton: {
			type: 'boolean',
			default: true,
		},
	},

	edit: editMemberBlock,

	save: function() {
		return null;
	}
} );
