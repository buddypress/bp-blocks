const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'bp/member', {
	title: __( 'Member', 'buddypress' ),

	description: __( 'BuddyPress Member.', 'buddypress' ),

	icon: 'admin-users',

	category: 'buddypress',

	attributes: {},

	edit: function( props ) {
		return (
			<p>{ __( 'Under construction', 'buddypress' )}</p>
		);
	},

	save: function( props ) {
		return null;
	}
} );
