<?php
/**
 * BP Blocks Globals.
 *
 * @package   bp-blocks
 * @subpackage \inc\globals
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register plugin globals.
 *
 * @since 6.0.0
 */
function bp_blocks_globals() {
	$bpb = bp_blocks();

	$bpb->version = '6.1.0-alpha';

	// Path.
	$bpb->dir = plugin_dir_path( dirname( __FILE__ ) );

	// URL.
	$bpb->url = plugins_url( dirname( __FILE__ ) );
}
add_action( 'bp_include', 'bp_blocks_globals' );
