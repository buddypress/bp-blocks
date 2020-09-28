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
 * @since 7.0.0
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
					'wp-components',
					'wp-i18n',
					'wp-compose',
					'wp-data',
					'wp-api-fetch',
					'wp-url',
					'wp-block-editor',
					'bp-block-components',
					'lodash',
				),
				'style'              => 'bp-members-block',
				'style_url'          => plugins_url( 'css/blocks/members.css', __FILE__ ),
				'attributes'         => array(
					'itemIDs'            => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'integer',
						),
					),
					'avatarSize'         => array(
						'type'    => 'string',
						'default' => 'full',
					),
					'displayMentionSlug' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'displayUserName'    => array(
						'type'    => 'boolean',
						'default' => true,
					),
				),
				'render_callback'    => 'bp_members_render_members_block',
			),
		)
	);
}
add_filter( 'bp_members_register_blocks', 'bp_blocks_register_member_blocks', 10, 1 );

/**
 * Callback function to render the BP Members Block.
 *
 * @since 7.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_members_render_members_block( $attributes = array() ) {
	$bp = buddypress();

	$block_args = wp_parse_args(
		$attributes,
		array(
			'itemIDs'            => array(),
			'avatarSize'         => 'full',
			'displayMentionSlug' => true,
			'displayUserName'    => true,
		)
	);

	return sprintf( '<p>%s</p>', implode( ', ', $block_args['itemIDs'] ) );
}
