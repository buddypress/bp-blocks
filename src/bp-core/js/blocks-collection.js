/**
 * WordPress dependencies.
 */
const {
	blocks: {
		registerBlockCollection,
	},
	i18n: {
		__,
	},
} = wp;

registerBlockCollection( 'bp', {
	title: __( 'BuddyPress', 'buddypress' ),
	icon: 'buddicons-buddypress-logo',
} );
