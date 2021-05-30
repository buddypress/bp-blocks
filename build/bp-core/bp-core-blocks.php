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
		bp_get_version(),
		false
	);
}
add_action( 'bp_blocks_init', __NAMESPACE__ . '\bp_register_block_components', 1 );
