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
			),
			'style'              => 'bp-member-block',
			'style_url'          => plugins_url( 'css/blocks/member.css', __FILE__ ),
			'render_callback'    => 'bp_members_render_member_block',
			'attributes'         => array(
				'memberID' => array(
					'type'    => 'integer',
					'default' => 0,
				),
			),
		)
	);
}
add_action( 'bp_blocks_init', 'bp_members_register_blocks', 10 );

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
			'memberID' => 0,
		)
	);

	if ( ! $block_args['memberID'] ) {
		return;
	}

	$member_id    = (int) $block_args['memberID'];
	$username     = bp_core_get_username( $member_id );
	$at_mention   = '';
	$display_name = bp_core_get_user_displayname( $member_id );
	$member_link  = bp_core_get_user_domain( $member_id );
	$avatar       = bp_core_fetch_avatar(
		array(
			'item_id' => $member_id,
			'object'  => 'user',
			'type'    => 'full',
			'html'    => false,
		)
	);

	if ( bp_is_active( 'activity' ) && bp_activity_do_mentions() ) {
		$at_mention = sprintf(
			'<span class="user-nicename"><a href="%1$s">@%2$s</a></span>',
			esc_url( $member_link ),
			esc_html( $username )
		);
	}

	return sprintf(
		'<div class="bp-block-member">
			<div class="item-header-avatar">
				<a href="%1$s">
					<img src="%2$s" alt="%3$s">
				</a>
			</div>
			<div class="member-description">
				<strong>%4$s</strong>
				%5$s
			</div>
		</div>',
		esc_url( $member_link ),
		esc_url( $avatar ),
		// Translators: %s is the member's display name.
		sprintf( esc_html__( 'Profile photo of %s', 'buddypress' ), $display_name ),
		esc_html( $display_name ),
		$at_mention
	);
}
