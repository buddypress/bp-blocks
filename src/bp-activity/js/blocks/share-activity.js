/**
 * WordPress dependencies.
 */
const {
	i18n: {
		__,
	},
	blocks: {
		registerBlockType,
	},
} = wp;

/**
 * Internal dependencies.
 */
import ShareActivityEdit from './share-activity/edit';
import { INITIAL_BORDER_RADIUS_POSITION } from './share-activity/constants';

registerBlockType( 'bp/share-activity', {
	title: __( 'Share into activities', 'buddypress' ),
	description: __( 'Action button to share the displayed post/page into user’s activity stream.', 'buddypress' ),
	icon: {
		background: '#fff',
		foreground: '#d84800',
		src: 'buddicons-activity',
	},
	category: 'buddypress',
	attributes: {
		text: {
			type: 'string',
			default: __( 'Share into my Activities', 'buddypress' ),
		},
		borderRadius: {
			type: 'number',
			default: INITIAL_BORDER_RADIUS_POSITION,
		},
		style: {
			type: 'object',
		},
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		wpLoginLinkFallback: {
			type: 'boolean',
			default: true,
		},
	},
	supports: {
		multiple: false,
		align: true,
	},
	edit: ShareActivityEdit,
} );
