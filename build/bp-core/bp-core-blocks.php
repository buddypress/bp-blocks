<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-core\bp-core-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the BP Block components.
 *
 * @since 6.0.0
 */
function bp_register_block_components() {
	wp_register_script(
		'bp-block-components',
		plugins_url( 'js/block-components.js', __FILE__ ),
		array(
			'wp-element',
			'wp-components',
			'wp-i18n',
			'wp-api-fetch',
			'wp-url',
		),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-components.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-components',
		'window.bp = window.bp || {};
		bp.blockComponents = bpBlock.blockComponents;
		delete bpBlock;',
		'after'
	);

	wp_register_script(
		'bp-block-data',
		plugins_url( 'js/block-data.js', __FILE__ ),
		array(
			'wp-data',
			'wp-api-fetch',
			'lodash',
		),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-data.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-data',
		'window.bp = window.bp || {};
		bp.blockData = bpBlock.blockData;
		delete bpBlock;',
		'after'
	);
}
add_action( 'bp_blocks_init', __NAMESPACE__ . '\bp_register_block_components', 1 );

/**
 * Preload the Active BuddyPress Components.
 *
 * @since 8.0.0
 *
 * @param string[] $paths The Block Editors preload paths.
 * @return string[] The Block Editors preload paths.
 */
function bp_block_preload_paths( $paths = array() ) {
	return array_merge(
		$paths,
		array(
			'/buddypress/v1/components?status=active',
		)
	);
}
add_filter( 'block_editor_rest_api_preload_paths', __NAMESPACE__ . '\bp_block_preload_paths' );
