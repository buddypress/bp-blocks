<?php
/**
 * BP Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\functions
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Only includes Active components' blocks PHP script.
 *
 * @since 6.0.0
 */
function inc() {
	$build_dir = trailingslashit( bp_blocks()->dir ) . 'build';

	// Include Block components.
	require $build_dir . '/bp-core/bp-core-blocks.php';

	foreach ( array_keys( buddypress()->active_components ) as $component ) {
		if ( ! is_dir( $build_dir . '/bp-' . $component ) ) {
			continue;
		}

		require $build_dir . '/bp-' . $component . '/bp-' . $component . '-blocks.php';

		if ( 'activity' === $component ) {
			require $build_dir . '/bp-' . $component . '/bp-' . $component . '-filters.php';
		}
	}
}
add_action( 'bp_include', __NAMESPACE__ . '\inc', 20 );

// Remove some BP Hooks.
remove_action( 'bp_blocks_init', 'bp_register_block_components', 1 );
remove_action( 'bp_blocks_init', 'bp_register_block_assets', 2 );
