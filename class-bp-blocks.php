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
 * Version:           6.0.0-alpha
 * Author:            The BuddyPress Community
 * Author URI:        https://buddypress.org
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages/
 * Text Domain:       buddypress
 * GitHub Plugin URI: https://github.com/buddypress/bp-blocks
 */

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
	 * Initialize the plugin.
	 *
	 * @since 6.0.0
	 */
	private function __construct() {
		// Autoload Classes.
		spl_autoload_register( array( $this, 'autoload' ) );

		// Load Globals & Functions.
		$inc_path = plugin_dir_path( __FILE__ ) . 'inc/';

		require $inc_path . 'globals.php';
		require $inc_path . 'functions.php';
	}

	/**
	 * Autoload classes when needed.
	 *
	 * @since  6.0.0
	 *
	 * @param string $class The class name.
	 */
	public function autoload( $class ) {
		$name = str_replace( '_', '-', strtolower( $class ) );

		// For now we only need the BP Block class.
		if ( 'bp-block' !== $name ) {
			return;
		}

		$path = plugin_dir_path( __FILE__ ) . "inc/classes/class-{$name}.php";

		// Sanity check.
		if ( ! file_exists( $path ) ) {
			return;
		}

		require $path;
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
add_action( 'bp_include', 'bp_blocks', 9 );
