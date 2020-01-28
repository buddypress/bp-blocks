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
			),
			'style'              => 'bp-member-block',
			'style_url'          => plugins_url( 'css/blocks/member.css', __FILE__ ),
			'render_callback'    => 'bp_members_render_member_block',
			'attributes'         => array(
				'itemID' => array(
					'type'    => 'integer',
					'default' => 0,
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
	$block_args = wp_parse_args(
		$attributes,
		array(
			'itemID' => 0,
		)
	);

	if ( ! $block_args['itemID'] ) {
		return;
	}

	$member_id        = (int) $block_args['itemID'];
	$username         = bp_core_get_username( $member_id );
	$at_mention       = '';
	$avatar_container = '';
	$display_name     = bp_core_get_user_displayname( $member_id );
	$member_link      = bp_core_get_user_domain( $member_id );
	$avatar           = bp_core_fetch_avatar(
		array(
			'item_id' => $member_id,
			'object'  => 'user',
			'type'    => 'full',
			'html'    => false,
		)
	);

	if ( $avatar ) {
		$avatar_container = sprintf(
			'<div class="item-header-avatar">
				<a href="%1$s">
					<img src="%2$s" alt="%3$s">
				</a>
			</div>',
			esc_url( $member_link ),
			esc_url( $avatar ),
			// Translators: %s is the member's display name.
			sprintf( esc_html__( 'Profile photo of %s', 'buddypress' ), $display_name )
		);
	}

	if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() ) {
		$at_mention = sprintf(
			'<span class="user-nicename"><a href="%1$s">@%2$s</a></span>',
			esc_url( $member_link ),
			esc_html( $username )
		);
	}

	return sprintf(
		'<div class="bp-block-member">
			%1$s
			<div class="member-description">
				<strong>%2$s</strong>
				%3$s
			</div>
		</div>',
		$avatar_container,
		esc_html( $display_name ),
		$at_mention
	);
}
