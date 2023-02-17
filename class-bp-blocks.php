<?php
/**
 * BuddyPress Blocks development plugin.
 *
 * @package   bp-blocks
 * @author    The BuddyPress Community
 * @license   GPL-2.0+
 * @link      https://buddypress.org
 *
 * @buddypress-plugin
 * Plugin Name:       BP Blocks
 * Plugin URI:        https://github.com/buddypress/bp-blocks
 * Description:       BuddyPress Blocks development plugin.
 * Version:           12.0.0-alpha
 * Author:            The BuddyPress Community
 * Author URI:        https://buddypress.org
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages/
 * Text Domain:       buddypress
 * GitHub Plugin URI: https://github.com/buddypress/bp-blocks
 * Requires at least: 5.7
 * Requires PHP:      5.6
 * Requires Plugins:  buddypress
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main Class
 *
 * @since 6.0.0
 */
final class BP_Blocks {
	/**
	 * Instance of this class.
	 *
	 * @var object
	 */
	protected static $instance = null;

	/**
	 * Used to store dynamic properties.
	 *
	 * @var array
	 */
	private $data = array();

	/**
	 * Initialize the plugin.
	 *
	 * @since 6.0.0
	 */
	private function __construct() {
		// Load Globals & Functions.
		$inc_path = plugin_dir_path( __FILE__ ) . 'inc/';

		require $inc_path . 'globals.php';
		require $inc_path . 'functions.php';
	}

	/**
	 * Magic method for checking the existence of a plugin global variable.
	 *
	 * @since 12.0.0
	 *
	 * @param string $key Key to check the set status for.
	 * @return bool
	 */
	public function __isset( $key ) {
		return isset( $this->data[ $key ] );
	}

	/**
	 * Magic method for getting a plugin global variable.
	 *
	 * @since 12.0.0
	 *
	 * @param string $key Key to return the value for.
	 * @return mixed
	 */
	public function __get( $key ) {
		$retval = null;
		if ( isset( $this->data[ $key ] ) ) {
			$retval = $this->data[ $key ];
		}

		return $retval;
	}

	/**
	 * Magic method for setting a plugin global variable.
	 *
	 * @since 12.0.0
	 *
	 * @param string $key   Key to set a value for.
	 * @param mixed  $value Value to set.
	 */
	public function __set( $key, $value ) {
		$this->data[ $key ] = $value;
	}

	/**
	 * Magic method for unsetting a plugin global variable.
	 *
	 * @since 12.0.0
	 *
	 * @param string $key Key to unset a value for.
	 */
	public function __unset( $key ) {
		if ( isset( $this->data[ $key ] ) ) {
			unset( $this->data[ $key ] );
		}
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 6.0.0
	 */
	public static function start() {

		// If the single instance hasn't been set, set it now.
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

/**
 * Start plugin.
 *
 * @since 6.0.0
 *
 * @return BP_Blocks The main instance of the plugin.
 */
function bp_blocks() {
	return BP_Blocks::start();
}
add_action( 'bp_include', __NAMESPACE__ . '\bp_blocks', 9 );

/**
 * Removes the hook to register a BP Block category.
 *
 * @since 11.0.0
 */
function bp_admin() {
	if ( has_action( 'bp_init', 'bp_block_init_category_filter' ) ) {
		// Stop using a "BuddyPress" block category for BP Blocks.
		remove_action( 'bp_init', 'bp_block_init_category_filter' );
	}
}

if ( is_admin() ) {
	add_action( 'bp_loaded', __NAMESPACE__ . '\bp_admin', 11 );
}
