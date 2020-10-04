<?php
/**
 * BP Blocks Globals.
 *
 * @package   bp-blocks
 * @subpackage \inc\globals
 */

namespace BP\Blocks;

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register plugin globals.
 *
 * @since 6.0.0
 */
function globals() {
	$bpb = bp_blocks();

	$bpb->version = '7.0.0-alpha';

	// Path.
	$bpb->dir = plugin_dir_path( dirname( __FILE__ ) );

	// URL.
	$bpb->url = plugins_url( dirname( __FILE__ ) );

	// Activity update recorded time.
	$bpb->activity_recorded_time = '';
}
add_action( 'bp_include', __NAMESPACE__ . '\globals' );
