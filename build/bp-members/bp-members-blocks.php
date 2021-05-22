<?php
/**
 * BP Members Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-members\bp-members-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Override BP Members Blocks.
 *
 * @since 7.0.0
 *
 * @return array The list of BP Members blocks.
 */
function register_member_blocks() {
	return array(
		'bp/member'          => array(
			'name'               => 'bp/member',
			'editor_script'      => 'bp-member-block',
			'editor_script_url'  => plugins_url( 'js/blocks/member.js', __FILE__ ),
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
			'style'              => 'bp-member-block',
			'style_url'          => plugins_url( 'css/blocks/member.css', __FILE__ ),
			'attributes'         => array(
				'itemID'              => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'avatarSize'          => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'displayMentionSlug'  => array(
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
			'render_callback'    => __NAMESPACE__ . '\bp_members_render_member_block',
		),
		'bp/members'         => array(
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
				'extraData'          => array(
					'type'    => 'string',
					'default' => 'none',
					'enum'    => array( 'last_activity', 'latest_update', 'none' ),
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
			'render_callback'    => __NAMESPACE__ . '\bp_members_render_members_block',
		),
		'bp/dynamic-members' => array(
			'name'               => 'bp/dynamic-members',
			'editor_script'      => 'bp-dynamic-members-block',
			'editor_script_url'  => plugins_url( 'js/blocks/dynamic-members.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-editor',
				'wp-block-editor',
			),
			'style'              => 'bp-dynamic-members-block',
			'style_url'          => plugins_url( 'css/blocks/dynamic-members.css', __FILE__ ),
			'attributes'         => array(
				'title'         => array(
					'type'    => 'string',
					'default' => __( 'Members', 'buddypress' ),
				),
				'maxMembers'    => array(
					'type'    => 'number',
					'default' => 5,
				),
				'memberDefault' => array(
					'type'    => 'string',
					'default' => 'active',
				),
				'linkTitle'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_members_render_dynamic_members_block',
		),
	);
}
add_filter( 'bp_members_register_blocks', __NAMESPACE__ . '\register_member_blocks', 10, 0 );

/**
 * Adds a new rest field to fetch extra information about the user.
 *
 * This is used by the Dynamic members widget/block.
 *
 * @since 8.0.0
 */
function bp_members_register_widgets_rest_field() {
	bp_rest_register_field(
		'members',
		'extra',
		array(
			'get_callback' => __NAMESPACE__ . '\bp_members_widgets_get_rest_extra_field',
			'schema'       => array(
				'description' => __( 'Extra information about the member to be used by the Members dynamic widget.', 'buddypress' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
			),
		)
	);
}
add_action( 'bp_rest_api_init', __NAMESPACE__ . '\bp_members_register_widgets_rest_field' );

/**
 * Gets the extra information about the user used by the dynamic members widget.
 *
 * @since 8.0.0
 *
 * @param array           $data     The list of properties of the BuddyPress member's object.
 * @param string          $property The custom property being requested.
 * @param WP_REST_Request $request  Full details about the request.
 * @return string The extra information about the user used by the dynamic members widget.
 */
function bp_members_widgets_get_rest_extra_field( $data, $property, $request ) {
	$value = null;
	if ( 'extra' === $property ) {
		$type    = $request->get_param( 'type' );
		$user_id = (int) $data['id'];

		// Registration date (human time diff).
		if ( 'newest' === $type ) {
			$user  = bp_core_get_core_userdata( $user_id );
			$value = bp_core_get_last_activity(
				$user->user_registered,
				/* translators: %s is time elapsed since the registration date happened */
				_x( 'registered %s', 'Records the timestamp that the user registered into the activity stream', 'buddypress' )
			);

			// Amount of friends.
		} elseif ( bp_is_active( 'friends' ) && 'popular' === $type ) {
			$total_friend_count = friends_get_total_friend_count( $user_id );

			/** This filter is documented in buddypress/src/bp-friends/bp-friends-template.php */
			$value = apply_filters(
				'bp_get_member_total_friend_count',
				/* translators: %d: total friend count */
				sprintf( _n( '%s friend', '%s friends', $total_friend_count, 'buddypress' ), number_format_i18n( $total_friend_count ) )
			);

			// Last activity date (human time diff).
		} else {
			/* translators: %s is time elapsed since the last activity happened */
			$value = sprintf( __( 'Active %s', 'buddypress' ), bp_core_time_since( bp_get_user_last_activity( $user_id ) ) );
		}
	}

	return $value;
}

/**
 * Registers a new script to manage the dynamic part of the Dynamic members widget/block.
 *
 * @since 8.0.0
 *
 * @param array $scripts Data about the scripts to register.
 * @return array Data about the scripts to register.
 */
function bp_members_register_scripts( $scripts = array() ) {
	$scripts['bp-dynamic-members-script'] = array(
		'file'         => esc_url( plugins_url( 'js/dynamic-members.js', __FILE__ ) ),
		'dependencies' => array(
			'lodash',
			'wp-url',
		),
		'footer'       => true,
	);

	return $scripts;
}
add_filter( 'bp_core_register_common_scripts', __NAMESPACE__ . '\bp_members_register_scripts', 10, 1 );

/**
 * Callback function to render the BP Member Block.
 *
 * @since 6.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_members_render_member_block( $attributes = array() ) {
	$bp = buddypress();

	$block_args = wp_parse_args(
		$attributes,
		array(
			'itemID'              => 0,
			'avatarSize'          => 'full',
			'displayMentionSlug'  => true,
			'displayActionButton' => true,
			'displayCoverImage'   => true,
		)
	);

	if ( ! $block_args['itemID'] ) {
		return;
	}

	// Set the member ID and container classes.
	$member_id         = (int) $block_args['itemID'];
	$container_classes = array( 'bp-block-member' );

	// Mention variables.
	$username   = bp_core_get_username( $member_id );
	$at_mention = '';

	// Avatar variables.
	$avatar           = '';
	$avatar_container = '';

	// Cover image variable.
	$cover_image     = '';
	$cover_style     = '';
	$cover_container = '';

	// Member name variables.
	$display_name = bp_core_get_user_displayname( $member_id );
	$member_link  = bp_core_get_user_domain( $member_id );

	// Member action button.
	$action_button         = '';
	$display_action_button = (bool) $block_args['displayActionButton'];

	if ( $bp->avatar && $bp->avatar->show_avatars && in_array( $block_args['avatarSize'], array( 'thumb', 'full' ), true ) ) {
		$avatar = bp_core_fetch_avatar(
			array(
				'item_id' => $member_id,
				'object'  => 'user',
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
			esc_url( $member_link ),
			esc_url( $avatar ),
			/* translators: %s: member name */
			sprintf( esc_html__( 'Profile photo of %s', 'buddypress' ), $display_name )
		);
	}

	$display_cover_image = (bool) $block_args['displayCoverImage'];
	if ( bp_is_active( 'members', 'cover_image' ) && $display_cover_image ) {
		$cover_image = bp_attachments_get_attachment(
			'url',
			array(
				'item_id' => $member_id,
			)
		);

		if ( $cover_image ) {
			$cover_style = sprintf(
				' style="background-image: url( %s );"',
				esc_url( $cover_image )
			);
		}

		$cover_container = sprintf(
			'<div class="bp-member-cover-image"%s></div>',
			$cover_style
		);

		$container_classes[] = 'has-cover';
	}

	$display_mention_slug = (bool) $block_args['displayMentionSlug'];
	if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() && $display_mention_slug ) {
		$at_mention = sprintf(
			'<span class="user-nicename">@%s</span>',
			esc_html( $username )
		);
	}

	if ( $display_action_button ) {
		$action_button = sprintf(
			'<div class="bp-profile-button">
				<a href="%1$s" class="button large primary button-primary" role="button">%2$s</a>
			</div>',
			esc_url( $member_link ),
			esc_html__( 'View Profile', 'buddypress' )
		);
	}

	$output = sprintf(
		'<div class="%1$s">
			%2$s
			<div class="member-content">
				%3$s
				<div class="member-description">
					<strong><a href="%4$s">%5$s</a></strong>
					%6$s
					%7$s
				</div>
			</div>
		</div>',
		implode( ' ', array_map( 'sanitize_html_class', $container_classes ) ),
		$cover_container,
		$avatar_container,
		esc_url( $member_link ),
		esc_html( $display_name ),
		$at_mention,
		$action_button
	);

	// Compact all interesting parameters.
	$params = array_merge( $block_args, compact( 'username', 'display_name', 'member_link', 'avatar', 'cover_image' ) );

	/**
	 * Filter here to edit the output of the single member block.
	 *
	 * @since 6.0.0
	 *
	 * @param string          $output The HTML output of the block.
	 * @param array           $params The block extended parameters.
	 */
	return apply_filters( 'bp_members_render_member_block_output', $output, $params );
}

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
			'extraData'          => 'none',
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

	$query_args = array(
		'user_ids' => $member_ids,
	);

	if ( 'none' !== $block_args['extraData'] ) {
		$query_args['populate_extras'] = true;
	}

	$query = bp_core_get_users( $query_args );

	// Initialize the output and the members.
	$output  = '';
	$members = $query['users'];

	foreach ( $members as $member ) {
		$has_activity        = false;
		$member_item_classes = 'member-content';

		if ( 'list' === $block_args['layoutPreference'] && 'latest_update' === $block_args['extraData'] && isset( $member->latest_update ) && $member->latest_update ) {
			$has_activity        = true;
			$member_item_classes = 'member-content has-activity';
		}

		$output .= sprintf( '<div class="%s">', $member_item_classes );

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

		// Add the latest activity the member posted.
		if ( $has_activity ) {
			$activity_content = '';
			$activity_data    = maybe_unserialize( $member->latest_update );

			if ( isset( $activity_data['content'] ) ) {
				$activity_content = apply_filters( 'bp_get_activity_content', $activity_data['content'] );
			}

			$display_name = '';
			if ( $block_args['displayUserName'] ) {
				$display_name = $member->display_name;
			}

			$mention_name = '';
			if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() && $block_args['displayMentionSlug'] ) {
				$mention_name = '(@' . $member->user_nicename . ')';
			}

			$output .= sprintf(
				'<blockquote class="wp-block-quote">
					%1$s
					<cite>
						<span>%2$s</span>
						%3$s
					</cite>
				</blockquote>',
				$activity_content,
				esc_html( $display_name ),
				esc_html( $mention_name )
			);
		} else {
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

			if ( 'last_activity' === $block_args['extraData'] ) {
				$output .= sprintf(
					'<time datetime="%1$s">%2$s</time>',
					esc_attr( bp_core_get_iso8601_date( $member->last_activity ) ),
					/* translators: %s: a human time diff */
					sprintf( esc_html__( 'Active %s', 'buddypress' ), bp_core_time_since( $member->last_activity ) )
				);
			}
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

/**
 * Returns the template to use for the Dynamic Members block items.
 *
 * @since 8.0.0
 *
 * @param string $type   Whether to use the template for JavaScript or PHP.
 * @param array  $tokens The data to use to customize the template (Needed for the PHP template).
 * @return string HTML/JS output.
 */
function bp_members_get_dynamic_members_template( $type = 'js', $tokens = array() ) {
	$template = '
		<script type="html/template" id="tmpl-bp-dynamic-members-item">
			<li class="vcard">
				<div class="item-avatar">
					<a href="{{{data.link}}}" class="bp-tooltip" data-bp-tooltip="{{data.name}}">
						<img loading="lazy" src="{{{data.avatar_urls.thumb}}}" class="avatar user-{{data.id}}-avatar avatar-50 photo" width="50" height="50" alt="' . esc_html__( 'Profile Photo', 'buddypress' ) . '">
					</a>
				</div>

				<div class="item">
					<div class="item-title fn"><a href="{{{data.link}}}">{{data.name}}</a></div>
					<div class="item-meta">
						<span class="activity">{{data.extra}}</span>
					</div>
				</div>
			</li>
		</script>
	';

	if ( 'js' !== $type ) {
		$template = wp_kses(
			$template,
			array(
				'li'   => array( 'class' => true ),
				'div'  => array( 'class' => true ),
				'span' => array( 'class' => true ),
				'a'    => array(
					'href'            => true,
					'class'           => true,
					'data-bp-tooltip' => true,
				),
				'img'  => array(
					'src'     => true,
					'class'   => true,
					'loading' => true,
				),
			)
		);

		return bp_core_replace_tokens_in_text( $template, $tokens );
	}

	return $template;
}

/**
 * Registers a specific globals to be used by Members Blocks.
 *
 * @since 8.0.0
 */
function bp_members_register_block_globals() {
	buddypress()->members->blocks = array(
		'bp/dynamic-members' => array(),
	);
}
add_action( 'bp_members_setup_globals', __NAMESPACE__ . '\bp_members_register_block_globals' );

/**
 * Adds specific script data for the BP Members blocks.
 *
 * Only used for the BP Dynamic Members block.
 *
 * @since 8.0.0
 */
function bp_members_blocks_add_script_data() {
	$dynamic_members_blocks = array_filter( buddypress()->members->blocks['bp/dynamic-members'] );

	if ( ! $dynamic_members_blocks ) {
		return;
	}

	// Include the common JS template.
	echo bp_members_get_dynamic_members_template(); // phpcs:ignore

	// List the block specific props.
	wp_add_inline_script(
		'bp-dynamic-members-script',
		sprintf( 'var bpDynamicMembersBlocks = %s;', wp_json_encode( array_values( $dynamic_members_blocks ) ) ),
		'before'
	);
}

/**
 * Callback function to render the Dynamic Members Block.
 *
 * @since 8.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_members_render_dynamic_members_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'title'         => __( 'Members', 'buddypress' ),
			'maxMembers'    => 5,
			'memberDefault' => 'active',
			'linkTitle'     => false,
		)
	);

	$classnames         = 'widget_bp_core_members_widget buddypress widget';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	$max_members = (int) $block_args['maxMembers'];
	$no_members  = __( 'No one has signed up yet!', 'buddypress' );

	/** This filter is documented in buddypress/src/bp-members/classes/class-bp-core-members-widget.php */
	$separator = apply_filters( 'bp_members_widget_separator', '|' );

	// Make sure the widget ID is unique.
	$widget_id              = uniqid( 'members-list-' );
	$members_directory_link = bp_get_members_directory_permalink();

	// Set the Block's title.
	if ( true === $block_args['linkTitle'] ) {
		$widget_content = sprintf(
			'<h2><a href="%1$s">%2$s</a></h2>',
			esc_url( $members_directory_link ),
			esc_html( $block_args['title'] )
		);
	} else {
		$widget_content = sprintf( '<h2 class="widget-title">%s</h2>', esc_html( $block_args['title'] ) );
	}

	$item_options = array(
		'newest' => array(
			'class' => '',
			'label' => __( 'Newest', 'buddypress' ),
		),
		'active' => array(
			'class' => '',
			'label' => __( 'Active', 'buddypress' ),
		),
	);

	if ( bp_is_active( 'friends' ) ) {
		$item_options['popular'] = array(
			'class' => '',
			'label' => __( 'Popular', 'buddypress' ),
		);
	}

	$item_options_output = array();
	$separator_output    = sprintf( ' <span class="bp-separator" role="separator">%s</span> ', esc_html( $separator ) );

	foreach ( $item_options as $item_type => $item_attr ) {
		if ( $block_args['memberDefault'] === $item_type ) {
			$item_attr['class'] = ' class="selected"';
		}

		$item_options_output[] = sprintf(
			'<a href="%1$s" id="%2$s" data-bp-sort="%3$s"%4$s>%5$s</a>',
			esc_url( $members_directory_link ),
			esc_attr( $item_attr['id'] ),
			esc_attr( $item_type ),
			$item_attr['class'],
			esc_html( $item_attr['label'] )
		);
	}

	$preview      = '';
	$default_args = array(
		'type'     => $block_args['memberDefault'],
		'per_page' => $max_members,
	);

	// Previewing the Block inside the editor.
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		$bp_query = bp_core_get_users( $default_args );
		$preview  = sprintf( '<div class="widget-error">%s</div>', $no_members );

		if ( is_array( $bp_query['users'] ) && 0 < count( $bp_query['users'] ) ) {
			$preview = '';
			foreach ( $bp_query['users'] as $user ) {
				if ( 'newest' === $block_args['memberDefault'] ) {
					$extra = bp_core_get_last_activity(
						$user->user_registered,
						/* translators: %s is time elapsed since the registration date happened */
						_x( 'registered %s', 'Records the timestamp that the user registered into the activity stream', 'buddypress' )
					);
				} elseif ( 'popular' === $block_args['memberDefault'] && isset( $item_options['popular'] ) && isset( $user->total_friend_count ) ) {
					/** This filter is documented in buddypress/src/bp-friends/bp-friends-template.php */
					$extra = apply_filters(
						'bp_get_member_total_friend_count',
						/* translators: %s: total friend count */
						sprintf( _n( '%s friend', '%s friends', $user->total_friend_count, 'buddypress' ), number_format_i18n( $user->total_friend_count ) )
					);
				} else {
					/* translators: %s is time elapsed since the last activity happened */
					$extra = sprintf( __( 'Active %s', 'buddypress' ), bp_core_time_since( $user->last_activity ) );
				}

				$preview .= bp_members_get_dynamic_members_template(
					'php',
					array(
						'data.link'              => bp_core_get_user_domain( $user->ID, $user->user_nicename, $user->user_login ),
						'data.name'              => $user->display_name,
						'data.avatar_urls.thumb' => bp_core_fetch_avatar(
							array(
								'item_id' => $user->ID,
								'html'    => false,
							)
						),
						'data.id'                => $user->ID,
						'data.extra'             => $extra,
					)
				);
			}
		}
	} else {
		// Get corresponding members.
		$path = sprintf(
			'/%1$s/%2$s/%3$s',
			bp_rest_namespace(),
			bp_rest_version(),
			buddypress()->members->id,
		);

		$default_path = add_query_arg(
			$default_args,
			$path
		);

		$preloaded_members = array();
		if ( bp_is_running_wp( '5.0.0' ) ) {
			$preloaded_members = rest_preload_api_request( '', $default_path );
		}

		buddypress()->members->blocks['bp/dynamic-members'][ $widget_id ] = (object) array(
			'selector'   => $widget_id,
			'query_args' => $default_args,
			'preloaded'  => reset( $preloaded_members ),
		);

		// Only enqueue common/specific scripts and data once per page load.
		if ( ! has_action( 'wp_footer', __NAMESPACE__ . '\bp_members_blocks_add_script_data', 1 ) ) {
			wp_enqueue_script( 'bp-dynamic-members-script' );
			wp_localize_script(
				'bp-dynamic-members-script',
				'bpDynamicMembersSettings',
				array(
					'path'    => ltrim( $path, '/' ),
					'root'    => esc_url_raw( get_rest_url() ),
					'nonce'   => wp_create_nonce( 'wp_rest' ),
					'strings' => array(
						'noMembersFound' => $no_members,
					),
				)
			);

			add_action( 'wp_footer', __NAMESPACE__ . '\bp_members_blocks_add_script_data', 1 );
		}
	}

	$widget_content .= sprintf(
		'<div class="item-options">
			%1$s
		</div>
		<ul id="%2$s" class="item-list" aria-live="polite" aria-relevant="all" aria-atomic="true">
			%3$s
		</ul>',
		implode( $separator_output, $item_options_output ),
		esc_attr( $widget_id ),
		$preview
	);

	// Only add a block wrapper if not loaded into a Widgets sidebar.
	if ( ! did_action( 'dynamic_sidebar_before' ) ) {
		return sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$widget_content
		);
	}

	return $widget_content;
}

/**
 * Make sure the BP Classnames are included into Widget Blocks.
 *
 * @since 8.0.0
 *
 * @param string $classname The classname to be used in the block widget's container HTML.
 * @param string $block_name The name of the block.
 * @return string The classname to be used in the block widget's container HTML.
 */
function bp_members_get_widget_block_dynamic_classname( $classname, $block_name ) {
	if ( 'bp/dynamic-members' === $block_name ) {
		$classname .= ' widget_bp_core_members_widget buddypress';
	}

	return $classname;
}
add_filter( 'widget_block_dynamic_classname', __NAMESPACE__ . '\bp_members_get_widget_block_dynamic_classname', 10, 2 );
