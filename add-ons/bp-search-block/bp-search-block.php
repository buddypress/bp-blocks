<?php
/**
 * A BuddyPress Block to search for activities, members, groups, sites, content from any post, page or widget of your community site!
 *
 * @package   bp-search-block
 * @author    The BuddyPress Community
 * @license   GPL-2.0+
 * @link      https://buddypress.org
 *
 * @wordpress-plugin
 * Plugin Name:       BP Search Block
 * Plugin URI:        https://github.com/buddypress/bp-blocks
 * Description:       Help the visitors or members of your BuddyPress powered community site to find the posts, the sites, the activities, the members or the groups they are looking for.
 * Version:           1.1.0
 * Author:            The BuddyPress Community
 * Author URI:        https://buddypress.org
 * Requires at least: 5.8
 * Requires PHP:      5.6
 * Requires Plugins:  buddypress
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

	// Makes sure the image URL does not end up being a 404 in WordPress 5.8 or up.
	wp_add_inline_style(
		'bp-search-form-style',
		sprintf(
			'.bp-search-block-icon { background: url( "%s" ); width: 20px; height: 20px; }',
			esc_url( plugins_url( 'assets/search.svg', __FILE__ ) )
		)
	);

	// Define the search form action.
	wp_add_inline_script(
		'bp-search-form-editor-script',
		sprintf( 'window.bpSearchFormAction = \'%s\';', bp_search_form_action() ),
		'before'
	);

	// Load available translations.
	wp_set_script_translations( 'bp-search-form-editor-script', 'bp-search-block', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'bp_core_blocks_init', 'bp_search_block_init' );
