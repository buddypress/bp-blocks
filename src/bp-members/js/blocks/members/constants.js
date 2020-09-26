/**
 * WordPress dependencies.
 */
const {
	i18n: {
		__,
	},
} = wp;

/**
 * Identifier for the initial border radius position.
 *
 * @type {Array}
 */
export const AVATAR_SIZES = [
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
