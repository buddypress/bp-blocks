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
 * BP Blocks Init hook.
 *
 * @since 6.0.0
 */
function bp_blocks_init() {
	/**
	 * Hook here to register your BuddyPress blocks.
	 *
	 * @since 6.0.0
	 */
	do_action( 'bp_blocks_init' );
}
add_action( 'bp_init', 'bp_blocks_init' );

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

/**
 * Register a BuddyPress block type.
 *
 * @since 6.0.0
 *
 * @param array $args The registration arguments for the block type.
 * @return BP_Block   The BuddyPress block type object.
 */
function bp_register_block( $args = array() ) {
	return new BP_Block( $args );
}
