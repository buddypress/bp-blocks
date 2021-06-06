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
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-components.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-components',
		'window.bp = window.bp || {};
		bp.blockComponents = bpBlock.blockComponents;
		delete bpBlock;',
		'after'
	);

	wp_register_script(
		'bp-block-data',
		plugins_url( 'js/block-data.js', __FILE__ ),
		array(
			'wp-data',
			'wp-api-fetch',
			'lodash',
		),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-data.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-data',
		'window.bp = window.bp || {};
		bp.blockData = bpBlock.blockData;
		delete bpBlock;',
		'after'
	);
}
add_action( 'bp_blocks_init', __NAMESPACE__ . '\bp_register_block_components', 1 );

/**
 * Gets information about active features for BP Components.
 *
 * @since 8.0.0
 *
 * @param array           $data     The list of properties of the BuddyPress component's object.
 * @param string          $property The custom property being requested.
 * @param WP_REST_Request $request  Full details about the request.
 * @return array The information about active features for BP Components.
 */
function bp_blocks_get_rest_component_features( $data, $property, $request ) {
	$features = array();

	if ( 'features' === $property && isset( $data['name'] ) ) {
		$component_id = $data['name'];
		$bp           = buddypress();

		if ( bp_is_active( 'groups' ) && $bp->groups->id === $data['name'] ) {
			$features = array(
				'avatar' => $bp->avatar && $bp->avatar->show_avatars && ! bp_disable_group_avatar_uploads(),
				'cover'  => bp_is_active( 'groups', 'cover_image' ),
			);
		} elseif ( bp_is_active( 'members' ) && $bp->members->id === $data['name'] ) {
			$features = array(
				'avatar' => $bp->avatar && $bp->avatar->show_avatars,
				'cover'  => bp_is_active( 'members', 'cover_image' ),
			);
		} elseif ( bp_is_active( 'activity' ) && $bp->activity->id ===  $data['name'] ) {
			$features = array(
				'mentions' => bp_activity_do_mentions(),
			);
		}
	}

	return $features;
}

/**
 * Adds a new rest field to fetch features information about the BP Components.
 *
 * @since 8.0.0
 */
function bp_blocks_register_components_rest_field() {
	/**
	 * NB: bp_rest_register_field is only used for BP Components like:
	 * `groups` or `members`.
	 */
	register_rest_field(
		'bp_components',
		'features',
		array(
			'get_callback' => __NAMESPACE__ . '\bp_blocks_get_rest_component_features',
			'schema'       => array(
				'description' => __( 'Information about active features for the component.', 'buddypress' ),
				'type'        => 'array',
				'context'     => array( 'view', 'edit' ),
			),
		)
	);
}
add_action( 'bp_rest_api_init', __NAMESPACE__ . '\bp_blocks_register_components_rest_field' );

/**
 * Preload the Active BuddyPress Components.
 *
 * @since 8.0.0
 *
 * @param string[] $paths The Block Editors preload paths.
 * @return string[] The Block Editors preload paths.
 */
function bp_blocks_preload_paths( $paths = array() ) {
	return array_merge(
		$paths,
		array(
			'/buddypress/v1/components?status=active',
		)
	);
}
add_filter( 'block_editor_rest_api_preload_paths', __NAMESPACE__ . '\bp_blocks_preload_paths' );
