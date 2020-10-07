<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-groups\bp-groups-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Override BP Groups Blocks.
 *
 * @since 7.0.0
 *
 * @return array The list of BP Groups blocks.
 */
function register_group_blocks() {
	return array(
		'bp/group'  => array(
			'name'               => 'bp/group',
			'editor_script'      => 'bp-group-block',
			'editor_script_url'  => plugins_url( 'js/blocks/group.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-editor',
				'wp-compose',
				'wp-data',
				'wp-block-editor',
				'bp-block-components',
			),
			'style'              => 'bp-group-block',
			'style_url'          => plugins_url( 'css/blocks/group.css', __FILE__ ),
			'attributes'         => array(
				'itemID'              => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'avatarSize'          => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'displayDescription'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayActionButton' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayCoverImage'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_groups_render_group_block',
		),
		'bp/groups' => array(
			'name'               => 'bp/groups',
			'editor_script'      => 'bp-groups-block',
			'editor_script_url'  => plugins_url( 'js/blocks/groups.js', __FILE__ ),
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
			'style'              => 'bp-groups-block',
			'style_url'          => plugins_url( 'css/blocks/groups.css', __FILE__ ),
			'attributes'         => array(
				'itemIDs'          => array(
					'type'  => 'array',
					'items' => array(
						'type' => 'integer',
					),
				),
				'avatarSize'       => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'displayGroupName' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'extraInfo'        => array(
					'type'    => 'string',
					'default' => 'none',
					'enum'    => array( 'description', 'popular', 'active', 'none' ),
				),
				'layoutPreference' => array(
					'type'    => 'string',
					'default' => 'list',
					'enum'    => array( 'list', 'grid' ),
				),
				'columns'          => array(
					'type'    => 'number',
					'default' => 2,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_groups_render_groups_block',
		),
	);
}
add_filter( 'bp_groups_register_blocks', __NAMESPACE__ . '\register_group_blocks', 10, 0 );

/**
 * Callback function to render the BP Group Block.
 *
 * @since 6.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_groups_render_group_block( $attributes = array() ) {
	$bp = buddypress();

	$block_args = wp_parse_args(
		$attributes,
		array(
			'itemID'              => 0,
			'avatarSize'          => 'full',
			'displayDescription'  => true,
			'displayActionButton' => true,
			'displayCoverImage'   => true,
		)
	);

	if ( ! $block_args['itemID'] ) {
		return;
	}

	// Set the group ID and container classes.
	$group_id          = (int) $block_args['itemID'];
	$container_classes = array( 'bp-block-group' );

	// Group object.
	$group = groups_get_group( $group_id );

	if ( ! $group->id ) {
		return;
	}

	// Avatar variables.
	$avatar           = '';
	$avatar_container = '';

	// Cover image variable.
	$cover_image     = '';
	$cover_style     = '';
	$cover_container = '';

	// Group name/link/description variables.
	$group_name        = bp_get_group_name( $group );
	$group_link        = bp_get_group_permalink( $group );
	$group_description = '';
	$group_content     = '';

	// Group action button.
	$action_button         = '';
	$display_action_button = (bool) $block_args['displayActionButton'];

	if ( $bp->avatar && $bp->avatar->show_avatars && ! bp_disable_group_avatar_uploads() && in_array( $block_args['avatarSize'], array( 'thumb', 'full' ), true ) ) {
		$avatar = bp_core_fetch_avatar(
			array(
				'item_id' => $group->id,
				'object'  => 'group',
				'type'    => $block_args['avatarSize'],
				'html'    => false,
			)
		);

		$container_classes[] = 'avatar-' . $block_args['avatarSize'];
	} else {
		$container_classes[] = 'avatar-none';
	}

	if ( $avatar ) {
		$avatar_container = sprintf(
			'<div class="item-header-avatar">
				<a href="%1$s">
					<img src="%2$s" alt="%3$s" class="avatar">
				</a>
			</div>',
			esc_url( $group_link ),
			esc_url( $avatar ),
			// Translators: %s is the group's name.
			sprintf( esc_html__( 'Group Profile photo of %s', 'buddypress' ), $group_name )
		);
	}

	$display_cover_image = (bool) $block_args['displayCoverImage'];
	if ( bp_is_active( 'groups', 'cover_image' ) && $display_cover_image ) {
		$cover_image = bp_attachments_get_attachment(
			'url',
			array(
				'item_id'    => $group->id,
				'object_dir' => 'groups',
			)
		);

		if ( $cover_image ) {
			$cover_style = sprintf(
				' style="background-image: url( %s );"',
				esc_url( $cover_image )
			);
		}

		$cover_container = sprintf(
			'<div class="bp-group-cover-image"%s></div>',
			$cover_style
		);

		$container_classes[] = 'has-cover';
	}

	$display_description = (bool) $block_args['displayDescription'];
	if ( $display_description ) {
		$group_description = bp_get_group_description( $group );
		$group_content     = sprintf(
			'<div class="group-description-content">%s</div>',
			$group_description
		);

		$container_classes[] = 'has-description';
	}

	if ( $display_action_button ) {
		$action_button = sprintf(
			'<div class="bp-profile-button">
				<a href="%1$s" class="button large primary button-primary" role="button">%2$s</a>
			</div>',
			esc_url( $group_link ),
			esc_html__( 'Visit Group', 'buddypress' )
		);
	}

	$output = sprintf(
		'<div class="%1$s">
			%2$s
			<div class="group-content">
				%3$s
				<div class="group-description">
					<strong><a href="%4$s">%5$s</a></strong>
					%6$s
					%7$s
				</div>
			</div>
		</div>',
		implode( ' ', array_map( 'sanitize_html_class', $container_classes ) ),
		$cover_container,
		$avatar_container,
		esc_url( $group_link ),
		esc_html( $group_name ),
		$group_content,
		$action_button
	);

	// Compact all interesting parameters.
	$params = array_merge( $block_args, compact( 'group_name', 'group_link', 'group_description', 'avatar', 'cover_image' ) );

	/**
	 * Filter here to edit the output of the single group block.
	 *
	 * @since 6.0.0
	 *
	 * @param string          $output The HTML output of the block.
	 * @param BP_Groups_Group $group  The group object.
	 * @param array           $params The block extended parameters.
	 */
	return apply_filters( 'bp_groups_render_group_block_output', $output, $group, $params );
}

/**
 * Callback function to render the BP Groups Block.
 *
 * @since 7.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_groups_render_groups_block( $attributes = array() ) {
	$bp = buddypress();

	$block_args = wp_parse_args(
		$attributes,
		array(
			'itemIDs'          => array(),
			'avatarSize'       => 'full',
			'displayGroupName' => true,
			'extraInfo'        => 'none',
			'layoutPreference' => 'list',
			'columns'          => '2',
		)
	);

	$group_ids = wp_parse_id_list( $block_args['itemIDs'] );
	if ( ! array_filter( $group_ids ) ) {
		return '';
	}

	$container_classes = sprintf( 'bp-block-groups avatar-%s', $block_args['avatarSize'] );
	if ( 'grid' === $block_args['layoutPreference'] ) {
		$container_classes .= sprintf( ' is-grid columns-%d', (int) $block_args['columns'] );
	}

	$query = groups_get_groups(
		array(
			'include' => $group_ids,
		)
	);

	// Initialize the output and the groups.
	$output = '';
	$groups = $query['groups'];

	foreach ( $groups as $group ) {
		$has_description    = false;
		$group_item_classes = 'group-content';

		if ( 'list' === $block_args['layoutPreference'] && 'description' === $block_args['extraInfo'] && isset( $group->description ) && $group->description ) {
			$has_description    = true;
			$group_item_classes = 'group-content has-description';
		}

		$output .= sprintf( '<div class="%s">', $group_item_classes );

		// Get Member link.
		$group_link = bp_get_group_permalink( $group );

		// Set the Avatar output.
		if ( $bp->avatar && $bp->avatar->show_avatars && ! bp_disable_group_avatar_uploads() && 'none' !== $block_args['avatarSize'] ) {
			$output .= sprintf(
				'<div class="item-header-avatar">
					<a href="%1$s">
						<img class="avatar" alt="%2$s" src="%3$s" />
					</a>
				</div>',
				esc_url( $group_link ),
				/* translators: %s: the group's name */
				sprintf( esc_attr__( 'Profile photo of %s', 'buddypress' ), $group->display_name ),
				esc_url(
					bp_core_fetch_avatar(
						array(
							'item_id' => $group->id,
							'object'  => 'group',
							'type'    => $block_args['avatarSize'],
							'html'    => false,
						)
					)
				)
			);
		}

		$output .= '<div class="group-description">';

		if ( $block_args['displayGroupName'] ) {
			$output .= sprintf(
				'<strong><a href="%1$s">%2$s</a></strong>',
				esc_url( $group_link ),
				esc_html( $group->name )
			);
		}

		// Add the latest activity the group posted.
		if ( $has_description && $group->description ) {
			$output .= sprintf(
				'<div class="group-description-content">%s</div>',
				bp_get_group_description( $group ),
			);
		} elseif ( 'active' === $block_args['extraInfo'] ) {
			$output .= sprintf(
				'<time datetime="%1$s">%2$s</time>',
				esc_attr( bp_core_get_iso8601_date( $group->last_activity ) ),
				/* translators: %s: a human time diff. */
				sprintf( esc_html__( 'Active %s', 'buddypress' ), bp_get_group_last_active( $group ) )
			);
		} elseif ( 'popular' === $block_args['extraInfo'] ) {
			$total_member_count = $group->total_member_count;

			$output .= sprintf(
				'<div class="group-meta">%s</div>',
				/* translators: %d: the number of group members. */
				esc_html( sprintf( _n( '%d member', '%d members', $total_member_count, 'buddypress' ), $total_member_count ) ),
			);
		}

		$output .= '</div></div>';
	}

	// Set the final output.
	$output = sprintf( '<div class="%1$s">%2$s</div>', $container_classes, $output );

	/**
	 * Filter here to edit the output of the groups block.
	 *
	 * @since 7.0.0
	 *
	 * @param string $output     The HTML output of the block.
	 * @param array  $block_args The block arguments.
	 * @param array  $groups     The list of BP_Groups_Group objects.
	 */
	return apply_filters( 'bp_groups_render_groups_block_output', $output, $block_args, $groups );
}
