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

/**
 * Internal dependencies.
 */
import editMembersBlock from './members/edit';

registerBlockType( 'bp/members', {
	title: __( 'Members', 'buddypress' ),
	description: __( 'BuddyPress Members.', 'buddypress' ),
	icon: 'groups',
	category: 'buddypress',
	attributes: {
		itemIDs: {
			type: 'array',
			items: {
				type: 'integer',
			},
			default: [],
		},
		avatarSize: {
			type: 'string',
			default: 'full',
		},
		displayMentionSlug: {
			type: 'boolean',
			default: true,
		},
		displayUserName: {
			type: 'boolean',
			default: true,
		},
	},
	edit: editMembersBlock,
} );
