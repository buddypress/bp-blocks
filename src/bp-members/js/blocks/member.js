/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { Placeholder, Disabled } = wp.components;
const { ServerSideRender } = wp.editor;
const { __ } = wp.i18n;

/**
 * Internal dependencies.
 */
import BPAutocompleter from '../../../bp-core/js/blocks/bp-autocompleter';

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

	edit: function( { attributes, setAttributes } ) {
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
					/>
				</Placeholder>
			);
		}

		return (
			<Disabled>
				<ServerSideRender block="bp/member" attributes={ attributes } />
			</Disabled>
		)
	},

	save: function() {
		return null;
	}
} );
