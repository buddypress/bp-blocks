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
			require $build_dir . '/bp-' . $component . '/bp-' . $component . '-functions.php';
		}
	}
}
add_action( 'bp_include', __NAMESPACE__ . '\inc', 20 );

// Remove some BP Hooks.
remove_action( 'bp_blocks_init', 'bp_register_block_components', 1 );
remove_filter( 'bp_blocks_editor_settings', 'bp_members_editor_settings' );

/**
 * Allow listing the active BP components using the REST API.
 *
 * @since 8.0.0
 *
 * @param boolean         $retval Whether items can be fetched or not.
 * @param WP_REST_Request $request Full data about the request.
 */
function bp_blocks_rest_allow_get_active_components( $retval, $request ) {
	if ( true === $retval ) {
		return $retval;
	}

	return 'active' === $request->get_param( 'status' ) && current_user_can( 'publish_posts' );
}
add_filter( 'bp_rest_components_get_items_permissions_check', __NAMESPACE__ . '\bp_blocks_rest_allow_get_active_components', 10, 2 );
