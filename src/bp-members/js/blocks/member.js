/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { Placeholder, Disabled } = wp.components;
const { withSelect } = wp.data;
const { compose } = wp.compose;
const { ServerSideRender } = wp.editor;
const { __ } = wp.i18n;

/**
 * Internal dependencies.
 */
import BPAutocompleter from '../../../bp-core/js/blocks/bp-autocompleter';

const editMember = ( { attributes, setAttributes, bpSettings } ) => {
	const { isAvatarEnabled } = bpSettings;

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
		<Disabled>
			<ServerSideRender block="bp/member" attributes={ attributes } />
		</Disabled>
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
		}
	},

	edit: editMemberBlock,

	save: function() {
		return null;
	}
} );
