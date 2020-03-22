<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-groups\bp-groups-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add new BP Groups Blocks.
 *
 * @since 6.1.0
 *
 * @param array $blocks The list of BP Groups blocks.
 * @return array The list of BP Groups blocks.
 */
function bp_blocks_register_group_blocks( $blocks ) {
	return array_merge(
		$blocks,
		array(
			'bp/groups' => array(
				'name'               => 'bp/groups',
				'editor_script'      => 'bp-groups-block',
				'editor_script_url'  => plugins_url( 'js/blocks/groups.js', __FILE__ ),
				'editor_script_deps' => array(
					'wp-blocks',
					'wp-element',
					'wp-i18n',
				),
				'style'              => 'bp-groups-block',
				'style_url'          => plugins_url( 'css/blocks/groups.css', __FILE__ ),
				'attributes'         => array(),
			),
		)
	);
}
add_filter( 'bp_groups_register_blocks', 'bp_blocks_register_group_blocks', 10, 1 );
