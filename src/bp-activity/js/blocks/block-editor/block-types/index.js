/**
 * WordPress dependencies.
 */
const {
	blocks: {
		unregisterBlockType,
		setDefaultBlockName,
		getBlockTypes,
	},
	blockLibrary: {
		registerCoreBlocks,
	},
} = wp;

/**
 * External dependencies.
 */
const { indexOf } = lodash;

/**
 * Internal dependencies.
 */
import './bp-text';
import { BP_TEXT_BLOCK } from './constants';

const registerActivityBlocks = () => {
	registerCoreBlocks();

	const whiteList = [
		'bp/text',
		'core/image',
		'core-embed/twitter',
		'core-embed/youtube',
		'core-embed/facebook',
		'core-embed/instagram',
		'core-embed/wordpress',
		'core-embed/vimeo',
		'core-embed/crowdsignal',
		'core/missing',
		'core/block',
	];

	getBlockTypes().forEach( ( { name } ) => {
		if ( indexOf( whiteList, name ) === -1 ) {
			unregisterBlockType( name );
		}
	} );

	setDefaultBlockName( BP_TEXT_BLOCK );
};

export default registerActivityBlocks;
