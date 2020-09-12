/**
 * WordPress dependencies.
 */
const {
  blocks: {
    registerBlockType,
  },
  i18n: {
    __,
  },
} = wp;

registerBlockType( 'bp/groups', {
	title: __( 'Groups', 'buddypress' ),
	description: __( 'BuddyPress Groups.', 'buddypress' ),
	icon: 'buddicons-groups',
	category: 'buddypress',
	attributes: {},
	edit: function() {
		return(
			<p>{ __( 'BuddyPress Groups.', 'buddypress' ) }</p>
		)
	},
} );
