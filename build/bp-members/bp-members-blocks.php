<?php
/**
 * BP Members Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \inc\bp-members\bp-members-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add new BP Members Blocks.
 *
 * @since 6.1.0
 *
 * @param array $blocks The list of BP Members blocks.
 * @return array The list of BP Members blocks.
 */
function bp_blocks_register_member_blocks( $blocks ) {
	return array_merge(
		$blocks,
		array(
			'bp/members' => array(
				'name'               => 'bp/members',
				'editor_script'      => 'bp-members-block',
				'editor_script_url'  => plugins_url( 'js/blocks/members.js', __FILE__ ),
				'editor_script_deps' => array(
					'wp-blocks',
					'wp-element',
					'wp-i18n',
				),
				'style'              => 'bp-members-block',
				'style_url'          => plugins_url( 'css/blocks/members.css', __FILE__ ),
				'attributes'         => array(),
			),
		)
	);
}
add_filter( 'bp_members_register_blocks', 'bp_blocks_register_member_blocks', 10, 1 );
