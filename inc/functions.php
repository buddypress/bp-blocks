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
 * Foces mimes to php one.
 *
 * @since 11.0.0
 */
function filter_mimes() {
	return array(
		'php' => 'text/x-php',
	);
}

/**
 * Only includes Active components' blocks PHP script.
 *
 * @since 6.0.0
 */
function inc() {
	// BuddyPress built-in blocks.
	$build_dir = trailingslashit( bp_blocks()->dir ) . 'build';

	// Include Block components.
	require str_replace( 'build', 'dist', $build_dir ) . '/bp-core/bp-core-blocks.php';

	foreach ( array_keys( buddypress()->active_components ) as $component ) {
		if ( in_array( $component, array( 'activity', 'friends', 'groups' ), true ) ) {
			$build_dir = str_replace( 'build', 'dist', $build_dir );
		}

		if ( ! is_dir( $build_dir . '/bp-' . $component ) ) {
			continue;
		}

		require $build_dir . '/bp-' . $component . '/bp-' . $component . '-blocks.php';
	}

	// BuddyPress add-ons blocks.
	$addons_dir = trailingslashit( bp_blocks()->dir ) . 'add-ons';

	add_filter( 'mime_types',  __NAMESPACE__ . '\filter_mimes' );
	$blocks = bp_attachments_list_directory_files_recursively( $addons_dir );
	remove_filter( 'mime_types',  __NAMESPACE__ . '\filter_mimes' );

	foreach ( $blocks as $block ) {
		if ( wp_basename( $block->parent_dir_path ) !== wp_basename( $block->name, '.php' ) ) {
			continue;
		}

		include_once $block->path;
	}
}
add_action( 'bp_include', __NAMESPACE__ . '\inc', 20 );

// Remove some BP Hooks.
remove_action( 'bp_blocks_init', 'bp_register_block_components', 1 );
remove_action( 'bp_blocks_init', 'bp_register_block_assets', 2 );
remove_filter( 'block_editor_rest_api_preload_paths', 'bp_blocks_preload_paths' );
remove_filter( 'bp_core_register_blocks', 'bp_nouveau_register_primary_nav_widget_block', 20, 1 );
remove_filter( 'bp_core_register_common_scripts', 'bp_friends_register_scripts', 9, 1 );
remove_filter( 'bp_core_register_common_scripts', 'bp_members_register_scripts', 9, 1 );
remove_filter( 'bp_core_register_common_scripts', 'bp_groups_register_widget_block_scripts', 9, 1 );
remove_filter( 'bp_core_register_common_scripts', 'bp_messages_register_scripts', 9, 1 );
