const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'bp/group', {
	title: __( 'Group', 'buddypress' ),

	description: __( 'BuddyPress Group.', 'buddypress' ),

	icon: 'buddicons-groups',

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
