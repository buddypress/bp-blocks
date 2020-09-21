/**
 * Internal dependencies.
 */
import EmbedActivityBlockEdit from './embed-activity/edit';
import EmbedActivityBlockSave from './embed-activity/save';

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

registerBlockType( 'bp/embed-activity', {
	title: __( 'Embed an activity', 'buddypress' ),
	description: __( 'Add a block that displays the activity content pulled from this or other community sites.', 'buddypress' ),
	icon: 'buddicons-activity',
	category: 'buddypress',
	attributes: {
		url: {
			type: 'string',
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
		},
	},
	supports: {
		align: true,
	},
	edit: EmbedActivityBlockEdit,
	save: EmbedActivityBlockSave,
} );
