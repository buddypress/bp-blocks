/**
 * WordPress dependencies.
 */
 const {
	blocks: {
		registerBlockType,
	},
	blockEditor: {
		useBlockProps,
	},
	element: {
		createElement,
	},
	i18n: {
		__,
	},
} = wp;

import metadata from '../block.json';

registerBlockType( metadata, {
	icon: {
		background: '#fff',
		foreground: '#d84800',
		src: 'search',
	},
	edit() {
		const blockProps = useBlockProps();

		return (
			<div>Hello World (from the editor).</div>
		);
	},
	save() {
		const blockProps = useBlockProps.save();

		return (
			<div>
				Hello World (from the frontend).
			</div>
		);
	},
} );
