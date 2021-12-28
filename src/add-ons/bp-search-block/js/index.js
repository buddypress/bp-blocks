/**
 * WordPress dependencies.
 */
 const {
	blocks: {
		registerBlockType,
	},
	element: {
		createElement,
	},
	i18n: {
		__,
	},
} = wp;

/**
 * Internal dependencies.
 */
import editSearchFormBlock from './search-form/edit';
import saveSearchFormBlock from './search-form/save';
import metadata from '../block.json';

registerBlockType( metadata, {
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
