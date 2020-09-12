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

registerBlockType( 'bp/members', {
	title: __( 'Members', 'buddypress' ),
	description: __( 'BuddyPress Members.', 'buddypress' ),
	icon: 'groups',
	category: 'buddypress',
	attributes: {},
	edit: function() {
		return(
			<p>{ __( 'BuddyPress Members.', 'buddypress' ) }</p>
		)
	},
} );
