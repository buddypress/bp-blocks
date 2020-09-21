/**
 * Internal dependencies.
 */
import EditText from './edit';
import SaveText from './save';
import { BP_TEXT_BLOCK } from './constants';

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

registerBlockType( BP_TEXT_BLOCK, {
	title: __( 'Text', 'buddypress' ),
	description: __( 'What’s on your mind buddy? Use this block to write your awesome updates.', 'buddypress' ),
	icon: 'format-status',
	category: 'common',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: '',
		},
		placeholder: {
			type: 'string',
			default: __( 'Start writing or type / to choose a block', 'buddypress' ),
		}
	},
	edit: EditText,
	save: SaveText,
} );
