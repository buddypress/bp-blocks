/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'bp/members', {
	title: __( 'Members', 'buddypress' ),

	description: __( 'BuddyPress Members.', 'buddypress' ),

	icon: 'groups',

	category: 'buddypress',

	attributes: {},

	edit: function( { attributes, setAttributes } ) {
		return(
			<p>{ __( 'BuddyPress Members.', 'buddypress' ) }</p>
		)
	},
} );
