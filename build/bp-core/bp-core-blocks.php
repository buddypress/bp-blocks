<?php
/**
 * BP Core Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-core\bp-core-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the BP Blocks components.
 *
 * @since 6.0.0
 */
function bp_register_block_components() {
	wp_register_script( // phpcs:ignore
		'bp-block-components',
		plugins_url( 'js/block-components.js', __FILE__ ),
		array(
			'wp-element',
			'wp-components',
			'wp-i18n',
			'wp-api-fetch',
		),
		bp_get_version(),
	);
}
add_action( 'bp_blocks_init', 'bp_register_block_components', 1 );
