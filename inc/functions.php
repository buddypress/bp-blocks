<?php
/**
 * BP Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\functions
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Only includes Active components' blocks PHP script.
 *
 * @since 6.0.0
 */
function bp_blocks_include() {
	$build_dir = trailingslashit( bp_blocks()->dir ) . 'build';

	foreach ( array_keys( buddypress()->active_components ) as $component ) {
		if ( ! is_dir( $build_dir . '/bp-' . $component ) ) {
			continue;
		}

		require $build_dir . '/bp-' . $component . '/bp-' . $component . '-blocks.php';
	}
}
add_action( 'bp_include', 'bp_blocks_include', 20 );
