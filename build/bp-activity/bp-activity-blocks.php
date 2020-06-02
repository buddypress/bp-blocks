<?php
/**
 * BP Activity Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-members\bp-activity-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sets the Activity block editor settings.
 *
 * @link https://github.com/getdave/standalone-block-editor
 *
 * @access private
 * @since 6.1.0
 */
function _bp_activity_blocks_get_editor_settings() {
	$settings = array(
		'disableCustomColors'    => get_theme_support( 'disable-custom-colors' ),
		'disableCustomFontSizes' => get_theme_support( 'disable-custom-font-sizes' ),
		'isRTL'                  => is_rtl(),
	);

	list( $color_palette, ) = (array) get_theme_support( 'editor-color-palette' );
	list( $font_sizes, )    = (array) get_theme_support( 'editor-font-sizes' );
	if ( false !== $color_palette ) {
		$settings['colors'] = $color_palette;
	}
	if ( false !== $font_sizes ) {
		$settings['fontSizes'] = $font_sizes;
	}

	return $settings;
}

/**
 * Loads the Activity Editor screen.
 *
 * @access private
 * @since 6.1.0
 */
function _bp_activity_blocks_editor_load_screen() {
	wp_register_script(
		'bp-activity-block-editor',
		plugins_url( 'js/blocks/block-editor.js', __FILE__ ),
		array(
			'wp-dom-ready',
			'wp-editor',
			'wp-media-utils',
			'wp-element',
			'wp-components',
			'wp-compose',
			'wp-blocks',
			'wp-block-library',
			'wp-block-editor',
			'wp-data',
			'wp-i18n',
			'wp-api-fetch',
		),
		filemtime( dirname( __FILE__ ) . '/js/blocks/block-editor.js' ),
		true
	);

	wp_register_style(
		'bp-activity-block-editor',
		plugins_url( 'css/blocks/activity-editor.css', __FILE__ ),
		array(
			'wp-format-library',
			'wp-components',
			'wp-editor',
		),
		filemtime( dirname( __FILE__ ) . '/css/blocks/activity-editor.css' )
	);

	add_action( 'bp_admin_enqueue_scripts', '_bp_activity_blocks_editor_enqueue_assets' );
}

/**
 * Enqueues the Activity Editor assets.
 *
 * @link https://github.com/getdave/standalone-block-editor
 *
 * @access private
 * @since 6.1.0
 */
function _bp_activity_blocks_editor_enqueue_assets() {
	wp_enqueue_script( 'bp-activity-block-editor' );
	wp_add_inline_script(
		'bp-activity-block-editor',
		'window.activityEditorSettings = ' . wp_json_encode( _bp_activity_blocks_get_editor_settings() ) . ';'
	);

	// Preload server-registered block schemas.
	wp_add_inline_script(
		'wp-blocks',
		'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');'
	);

	// Editor default styles
	wp_enqueue_style( 'bp-activity-block-editor' );
}

/**
 * Activity Editor Screen.
 *
 * @link https://github.com/getdave/standalone-block-editor
 *
 * @access private
 * @since 6.1.0
 */
function _bp_activity_blocks_editor_screen() {
	?>
	<div id="bp-activity-block-editor" class="bp-activity-block-editor"></div>
	<?php
}

/**
 * Adds an submenu to the Activity Admin menu.
 *
 * @access private
 * @since 6.1.0
 */
function _bp_activity_blocks_add_editor_submenu() {
	$screen = add_submenu_page(
		'bp-activity',
		__( 'Activity Block Editor', 'bp-blocks' ),
		__( 'Add new', 'bp-blocks' ),
		'bp_moderate',
		'bp-activity-new',
		'_bp_activity_blocks_editor_screen'
	);

	add_action( 'load-' . $screen, '_bp_activity_blocks_editor_load_screen' );
}
add_action( 'admin_menu', '_bp_activity_blocks_add_editor_submenu' );
