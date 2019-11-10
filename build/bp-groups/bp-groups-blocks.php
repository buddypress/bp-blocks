<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-groups\bp-groups-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Groups Blocks.
 *
 * @since 6.0.0
 */
function bp_groups_register_blocks() {
	bp_register_block(
		array(
			'name'               => 'bp/group',
			'editor_script'      => 'bp-group-block',
			'editor_script_url'  => plugins_url( 'js/blocks/group.js', __FILE__ ),
			'editor_script_deps' => array( 'wp-blocks', 'wp-element' ),
		)
	);
}
add_action( 'bp_blocks_init', 'bp_groups_register_blocks', 10 );
