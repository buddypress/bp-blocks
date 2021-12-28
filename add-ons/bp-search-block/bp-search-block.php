<?php
/**
 * A BuddyPress Block to search for members, groups from any post, page or widget of your community site!
 *
 * @package   bp-search-block
 * @author    The BuddyPress Community
 * @license   GPL-2.0+
 * @link      https://buddypress.org
 *
 * @wordpress-plugin
 * Plugin Name:       BP Search Block
 * Plugin URI:        https://github.com/buddypress/bp-blocks
 * Description:       Help the visitors or members of your BuddyPress powered community site to find the posts, the sites, the members or the groups they are looking for.
 * Version:           1.0.0
 * Author:            The BuddyPress Community
 * Author URI:        https://buddypress.org
 * Requires at least: 5.8
 * Requires PHP:      5.6
 * Text Domain:       bp-search-block
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages/
 * GitHub Plugin URI: https://github.com/buddypress/bp-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the BP Search Block.
 *
 * @since 1.0.0
 */
function bp_search_block_init() {
	register_block_type( __DIR__ );

	// Define the search form action.
	wp_add_inline_script(
		'bp-search-form-editor-script',
		sprintf( 'window.bpSearchFormAction = \'%s\';', bp_search_form_action() ),
		'before'
	);

	// @todo Load available translations.
	//wp_set_script_translations( 'bp-search-block-editor-script-js', 'bp-search-block' );
}
add_action( 'bp_core_blocks_init', 'bp_search_block_init' );
