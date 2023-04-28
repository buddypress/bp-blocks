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
