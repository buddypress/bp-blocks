<?php
/**
 * BP Activity Blocks Filters.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-activity\bp-activity-filters
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Filter the activity content to adapt it if it contains Blocks.
add_filter( 'bp_get_activity_content_body', 'bp_activity_do_blocks', 9 );

// Disable too restrictive filters.
remove_filter( 'bp_get_activity_content_body', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_get_activity_parent_content', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_get_activity_latest_update', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_get_activity_latest_update_excerpt', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_get_activity_feed_item_description', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_activity_content_before_save', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_activity_action_before_save', 'bp_activity_filter_kses', 1 );
remove_filter( 'bp_activity_latest_update_content', 'bp_activity_filter_kses', 1 );

/**
 * Make sure the WP Emoji output is containing all needed attributes.
 *
 * @since 6.1.0
 *
 * @param string $activity_content The activity content.
 * @return string The sanitized activity content.
 */
function bp_blocks_activity_kses( $activity_content ) {
	$emojis = array();

	preg_match_all( '%(<!--.*?(-->|$))|(<[^>]*(>|$)|>)%', $activity_content, $tags );
	$tags = reset( $tags );

	if ( $tags ) {
		foreach ( $tags as $tag ) {
			preg_match( '%^<\s*(/\s*)?([a-zA-Z0-9-]+)([^>]*)>?$%', wp_kses_stripslashes( $tag ), $matches );

			if ( isset( $matches[2] ) && 'img' === $matches[2] ) {
				$attributes = wp_kses_hair( $tag, wp_allowed_protocols() );

				if ( isset( $attributes['class']['value'] ) && in_array( $attributes['class']['value'], array( 'wp-smiley', 'emoji' ), true ) ) {
					if ( 'wp-smiley' === $attributes['class']['value'] ) {
						$bp_should_allow = wp_kses( $tag, array( 'img' => array( 'src' => true, 'alt' => true, 'class' => true, 'style' => true ) ) );
					} else {
						$bp_should_allow = wp_kses( $tag, array( 'img' => array( 'draggable' => true, 'role' => true, 'class' => true, 'alt' => true, 'src' => true ) ) );
					}

					$emojis[] = array(
						'bp_should_allow' => $bp_should_allow,
						'bp_sanitized'    => bp_activity_filter_kses( $tag ),
					);
				}
			}
		}
	}

	$bp_sanitized = bp_activity_filter_kses( $activity_content );

	if ( ! $emojis ) {
		return $bp_sanitized;
	}

	foreach ( $emojis as $emoji ) {
		$bp_sanitized = str_replace( $emoji['bp_sanitized'], $emoji['bp_should_allow'], $bp_sanitized );
	}

	return $bp_sanitized;
}
add_filter( 'bp_get_activity_content_body', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_parent_content', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update_excerpt', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_feed_item_description', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_content_before_save', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_action_before_save', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_latest_update_content', 'bp_blocks_activity_kses', 1 );
