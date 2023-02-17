/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import editSearchFormBlock from './search-form/edit';
import saveSearchFormBlock from './search-form/save';
import metadata from '../block.json';

registerBlockType( metadata, {
	title: __( 'Community Search', 'bp-search-block' ),
	description: __( 'A Block to search for posts, sites, activities, members or groups from any post, page or widget of your BuddyPress powered community site!', 'bp-search-block' ),
	icon: {
		background: '#fff',
		foreground: '#d84800',
		src: 'search',
	},
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: '.bp-search-label',
			default: __( 'Search', 'bp-search-block' ),
		},
		useLabel: {
			type: 'boolean',
			default: true,
		},
		buttonText: {
			type: 'string',
			source: 'html',
			selector: '.bp-search-button',
			default: __( 'Search', 'bp-search-block' ),
		},
		useIcon: {
			type: 'boolean',
			default: false,
		},
		placeholder: {
			'type': 'string',
			'default': __( 'Search posts', 'bp-search-block' ),
		},
		activeOptions: {
			type: 'array',
			default: ['posts'],
		},
		defaultOption: {
			type: 'string',
			default: 'posts',
		},
		action: {
			type: 'string',
			default: window.bpSearchFormAction || '',
		},
	},
	edit: editSearchFormBlock,
	save: saveSearchFormBlock,
} );
