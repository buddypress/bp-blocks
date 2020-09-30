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
					'layoutPreference'   => array(
						'type'    => 'string',
						'default' => 'list',
						'enum'    => array( 'list', 'grid' ),
					),
					'columns'            => array(
						'type'    => 'number',
						'default' => 2,
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
			'layoutPreference'   => 'list',
			'columns'            => '2',
		)
	);

	$member_ids = wp_parse_id_list( $block_args['itemIDs'] );
	if ( ! array_filter( $member_ids ) ) {
		return '';
	}

	$container_classes = sprintf( 'bp-block-members avatar-%s', $block_args['avatarSize'] );
	if ( 'grid' === $block_args['layoutPreference'] ) {
		$container_classes .= sprintf( ' is-grid columns-%d', (int) $block_args['columns'] );
	}

	$query = bp_core_get_users(
		array(
			'user_ids' => $member_ids,
		)
	);

	// Initialize the output and the members.
	$output  = '';
	$members = $query['users'];

	foreach ( $members as $member ) {
		$output .= '<div class="member-content">';

		// Get Member link.
		$member_link = bp_core_get_user_domain( $member->ID );

		// Set the Avatar output.
		if ( $bp->avatar && $bp->avatar->show_avatars && 'none' !== $block_args['avatarSize'] ) {
			$output .= sprintf(
				'<div class="item-header-avatar">
					<a href="%1$s">
						<img class="avatar" alt="%2$s" src="%3$s" />
					</a>
				</div>',
				esc_url( $member_link ),
				/* translators: %s: the member display name */
				sprintf( esc_attr__( 'Profile photo of %s', 'buddypress' ), $member->display_name ),
				esc_url(
					bp_core_fetch_avatar(
						array(
							'item_id' => $member->ID,
							'object'  => 'user',
							'type'    => $block_args['avatarSize'],
							'html'    => false,
						)
					)
				)
			);
		}

		$output .= '<div class="member-description">';
		if ( $block_args['displayUserName'] ) {
			$output .= sprintf(
				'<strong><a href="%1$s">%2$s</a></strong>',
				esc_url( $member_link ),
				esc_html( $member->display_name )
			);
		}

		if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() && $block_args['displayMentionSlug'] ) {
			$output .= sprintf(
				'<span class="user-nicename">@%s</span>',
				esc_html( $member->user_nicename )
			);
		}

		$output .= '</div></div>';
	}

	// Set the final output.
	$output = sprintf( '<div class="%1$s">%2$s</div>', $container_classes, $output );

	/**
	 * Filter here to edit the output of the members block.
	 *
	 * @since 7.0.0
	 *
	 * @param string $output     The HTML output of the block.
	 * @param array  $block_args The block arguments.
	 * @param array  $members    The list of WP_User objects.
	 */
	return apply_filters( 'bp_members_render_members_block_output', $output, $block_args, $members );
}
