<?php
/**
 * BP Members Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-members\bp-members-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Members Blocks.
 *
 * @since 6.0.0
 */
function bp_members_register_blocks() {
	bp_register_block(
		array(
			'name'               => 'bp/member',
			'editor_script'      => 'bp-member-block',
			'editor_script_url'  => plugins_url( 'js/blocks/member.js', __FILE__ ),
			'editor_script_deps' => array( 'wp-blocks', 'wp-element' ),
		)
	);
}
add_action( 'bp_blocks_init', 'bp_members_register_blocks', 10 );
