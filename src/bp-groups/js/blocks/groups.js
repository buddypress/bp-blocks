/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'bp/groups', {
	title: __( 'Groups', 'buddypress' ),

	description: __( 'BuddyPress Groups.', 'buddypress' ),

	icon: 'buddicons-groups',

	category: 'buddypress',

	attributes: {},

	edit: function( { attributes, setAttributes } ) {
		return(
			<p>{ __( 'BuddyPress Groups.', 'buddypress' ) }</p>
		)
	}
} );
