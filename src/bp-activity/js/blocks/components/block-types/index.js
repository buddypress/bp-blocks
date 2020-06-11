/**
 * WordPress dependencies.
 */
const { unregisterBlockType, setDefaultBlockName, getBlockTypes } = wp.blocks;
const { registerCoreBlocks } = wp.blockLibrary;

/**
 * External dependencies.
 */
const { indexOf } = lodash;

/**
 * Internal dependencies.
 */
import './bp-text';

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
	]

	getBlockTypes().forEach( ( { name } ) => {
		if ( -1 === indexOf( whiteList, name ) ) {
			unregisterBlockType( name );
		}
	} );

	setDefaultBlockName( 'bp/text' );
};

export default registerActivityBlocks;
