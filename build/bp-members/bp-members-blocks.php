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
 * Register Members Blocks.
 *
 * @since 6.0.0
 */
function bp_members_register_blocks() {
	bp_register_block(
		array(
			'name'               => 'bp/member',
			'editor_script'      => 'bp-member-block',
			'editor_script_url'  => plugins_url( 'js/blocks/member.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-api-fetch',
				'wp-editor',
				'wp-compose',
				'wp-data',
				'wp-block-editor',
			),
			'style'              => 'bp-member-block',
			'style_url'          => plugins_url( 'css/blocks/member.css', __FILE__ ),
			'render_callback'    => 'bp_members_render_member_block',
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
		)
	);
}
add_action( 'bp_blocks_init', 'bp_members_register_blocks', 10 );

/**
 * Add BP Members blocks specific settings to the BP Blocks Editor ones.
 *
 * @since 6.0.0
 *
 * @param array $bp_editor_settings BP blocks editor settings.
 * @return array BP Members blocks editor settings.
 */
function bp_members_editor_settings( $bp_editor_settings = array() ) {
	$bp = buddypress();

	return array_merge(
		$bp_editor_settings,
		array(
			'members' => array(
				'isMentionEnabled'    => bp_is_active( 'activity' ) && bp_activity_do_mentions(),
				'isAvatarEnabled'     => $bp->avatar && $bp->avatar->show_avatars,
				'isCoverImageEnabled' => bp_is_active( 'xprofile', 'cover_image' ),
			),
		)
	);
}
add_filter( 'bp_blocks_editor_settings', 'bp_members_editor_settings' );

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
			// Translators: %s is the member's display name.
			sprintf( esc_html__( 'Profile photo of %s', 'buddypress' ), $display_name )
		);
	}

	$display_cover_image = (bool) $block_args['displayCoverImage'];
	if ( bp_is_active( 'xprofile', 'cover_image' ) && $display_cover_image ) {
		$cover_image = bp_attachments_get_attachment(
			'url',
			array(
				'item_id' => $member_id,
			)
		);

		if ( $cover_image ) {
			$cover_image = sprintf(
				' style="background-image: url( %s );"',
				esc_url( $cover_image )
			);
		}

		$cover_container = sprintf(
			'<div class="bp-member-cover-image"%s></div>',
			$cover_image
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

	return sprintf(
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
		$action_button,
	);
}
