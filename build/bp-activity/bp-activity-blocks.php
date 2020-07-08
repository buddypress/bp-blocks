<?php
/**
 * BP Activity Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-activity\bp-activity-blocks
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
		'codeEditingEnabled'     => false,
		'__experimentalBlockPatterns'          => array(),
		'__experimentalBlockPatternCategories' => array(),
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
			'wp-format-library',
			'wp-components',
			'bp-block-components',
			'wp-compose',
			'wp-blocks',
			'wp-block-library',
			'wp-block-editor',
			'wp-data',
			'wp-i18n',
			'wp-api-fetch',
			'lodash',
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
			'wp-edit-post',
		),
		filemtime( dirname( __FILE__ ) . '/css/blocks/activity-editor.css' )
	);

	add_action( 'bp_admin_enqueue_scripts', '_bp_activity_blocks_editor_enqueue_assets' );
	add_filter( 'admin_body_class', '_bp_activity_blocks_editor_admin_body_class' );
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
	/**
	 * Filter here to add your preloaded paths.
	 *
	 * @since 6.1.0
	 *
	 * @param array $value the list of preloaded paths.
	 */
	$preload_paths = apply_filters(
		'bp_activity_blocks_editor_preload_paths',
		array(
			'/buddypress/v1/members/me?context=edit',
			'/buddypress/v1/groups/me?context=edit',
		)
	);

	// Preloads BP Activity's data.
	$preload_data = array_reduce(
		$preload_paths,
		'rest_preload_api_request',
		array()
	);

	// Create the Fetch API Preloading middleware.
	wp_add_inline_script(
		'wp-api-fetch',
		sprintf( 'wp.apiFetch.use( wp.apiFetch.createPreloadingMiddleware( %s ) );', wp_json_encode( $preload_data ) ),
		'after'
	);

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

	// Editor default styles.
	wp_enqueue_style( 'bp-activity-block-editor' );
}

/**
 * Makes sure if BuddyPress is translated that the needed admin body class is added.
 *
 * @access private
 * @since 6.1.0
 *
 * @param string $admin_body_class The Admin screen body classes.
 * @return string The Admin screen body classes.
 */
function _bp_activity_blocks_editor_admin_body_class( $admin_body_class = '' ) {
	if ( false === strpos( $admin_body_class, 'activity_page_bp-activity-new' ) ) {
		$admin_body_class .= ' activity_page_bp-activity-new';
	}

	return $admin_body_class;
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

/**
 * Determine whether an activity or its content string has blocks.
 *
 * @since 6.1.0
 * @see parse_blocks()
 *
 * @param string|int|BP_Activity_Activity|null $activity Activity content, Activity ID, or Activity object.
 * @return bool Whether the post has blocks.
 */
function bp_activity_has_blocks( $activity = null ) {
	if ( is_null( $activity ) ) {
		return false;
	}

	if ( ! is_string( $activity ) ) {
		if ( is_int( $activity ) ) {
			$bp_activity = new BP_Activity_Activity( $activity );
		} else {
			$bp_activity = $activity;
		}

		if ( $bp_activity instanceof BP_Activity_Activity ) {
			$activity = $bp_activity->content;
		}
	}

	return has_blocks( $activity );
}

/**
 * If bp_activity_do_blocks() needs to remove wpautop() from the `bp_get_activity_content_body` filter, this re-adds it afterwards,
 * for subsequent `bp_get_activity_content_body` usage.
 *
 * @access private
 *
 * @since 6.1.0
 *
 * @param string $content The activity content running through this filter.
 * @return string The unmodified activity content.
 */
function _bp_activity_restore_wpautop_hook( $content ) {
	$current_priority = has_filter( 'bp_get_activity_content_body', '_bp_activity_restore_wpautop_hook' );

	add_filter( 'bp_get_activity_content_body', 'wpautop', $current_priority - 1 );
	remove_filter( 'bp_get_activity_content_body', '_bp_activity_restore_wpautop_hook', $current_priority );

	return $content;
}

/**
 * Parses dynamic blocks out of activity content and re-renders them.
 *
 * @since 6.1.0
 *
 * @param string $content Activity content.
 * @return string Updated activity content.
 */
function bp_activity_do_blocks( $content ) {
	$blocks = parse_blocks( $content );
	$output = '';

	foreach ( $blocks as $block ) {
		$output .= render_block( $block );
	}

	// If there are blocks in this content, we shouldn't run wpautop() on it later.
	$priority = has_filter( 'bp_get_activity_content_body', 'wpautop' );
	if ( false !== $priority && doing_filter( 'bp_get_activity_content_body' ) && bp_activity_has_blocks( $content ) ) {
		remove_filter( 'bp_get_activity_content_body', 'wpautop', $priority );
		add_filter( 'bp_get_activity_content_body', '_bp_activity_restore_wpautop_hook', $priority + 1 );
	}

	return $output;
}
