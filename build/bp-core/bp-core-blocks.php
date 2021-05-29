<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-core\bp-core-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the BP Block components.
 *
 * @since 6.0.0
 */
function bp_register_block_components() {
	wp_register_script(
		'bp-block-components',
		plugins_url( 'js/block-components.js', __FILE__ ),
		array(
			'wp-element',
			'wp-components',
			'wp-i18n',
			'wp-api-fetch',
			'wp-url',
		),
		bp_get_version(),
		false
	);
}
add_action( 'bp_blocks_init', __NAMESPACE__ . '\bp_register_block_components', 1 );

/**
 * Unlike the Post Editor, Widgets Editor settings are not reachable.
 *
 * @since 8.0.0
 */
function bp_blocks_widgets_editor_fallback_settings() {
	$bp_widget_editor_settings = bp_blocks_editor_settings( array() );
	$bp_widget_editor_settings = reset( $bp_widget_editor_settings );

	wp_add_inline_script(
		'wp-edit-widgets',
		sprintf(
			'window.bpWidetsEditorSettings = %s;',
			wp_json_encode( $bp_widget_editor_settings )
		),
		'before'
	);
}
add_action( 'widgets_admin_page', __NAMESPACE__ . '\bp_blocks_widgets_editor_fallback_settings' );
