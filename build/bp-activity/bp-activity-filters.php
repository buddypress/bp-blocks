<?php
/**
 * BP Activity Blocks Filters.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-activity\bp-activity-filters
 */

namespace BP\Blocks;

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Filter the activity content to adapt it if it contains Blocks.
add_filter( 'bp_get_activity_content_body', __NAMESPACE__ . '\bp_activity_do_blocks', 9 );

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
 * @since TBD
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
						$bp_should_allow = wp_kses(
							$tag,
							array(
								'img' => array(
									'src'   => true,
									'alt'   => true,
									'class' => true,
									'style' => true,
								),
							)
						);
					} else {
						$bp_should_allow = wp_kses(
							$tag,
							array(
								'img' => array(
									'draggable' => true,
									'role'      => true,
									'class'     => true,
									'alt'       => true,
									'src'       => true,
								),
							)
						);
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
add_filter( 'bp_get_activity_content_body', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_parent_content', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update_excerpt', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_feed_item_description', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_content_before_save', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_action_before_save', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_latest_update_content', __NAMESPACE__ . '\bp_blocks_activity_kses', 1 );

/**
 * Allow usage of the paragraph tag and the link’s target attribute into Activities content.
 *
 * @since TBD
 *
 * @param array $tags The activity allowed tags.
 * @return array The activity allowed tags.
 */
function bp_blocks_activity_allowed_tags( $tags = array() ) {
	if ( isset( $tags['a'] ) && ! isset( $tags['a']['target'] ) ) {
		$tags['a']['target'] = true;
	}

	return array_merge( $tags, array( 'p' => true ) );
}
add_filter( 'bp_activity_allowed_tags', __NAMESPACE__ . '\bp_blocks_activity_allowed_tags' );

/**
 * Filters the Acticity loop to only fetch past activities.
 *
 * NB: this still needs some work (eg: Acticity Scheduled User screen, activity action string
 * adaptations, Activity Admin status column, Activity edit screen...).
 *
 * @since TBD
 *
 * @param array $args The `bp_has_activities()` loop arguments.
 * @return array The `bp_has_activities()` loop arguments.
 */
function bp_blocks_activity_has_activities_without_scheduled_ones( $args = array() ) {
	if ( ! bp_is_single_activity() ) {
		$date_query = array(
			'relation' => 'AND',
			array(
				'before' => date( 'Y-m-d H:i:s', strtotime( current_time( 'mysql', 0 ) . '+15 seconds' ) ),
			),
		);

		if ( isset( $args['date_query'] ) && is_array( $args['date_query'] ) ) {
			$date_query = array_merge( $date_query, $args['date_query'] );
		}

		$args['date_query'] = $date_query;
	}

	return $args;
}
add_filter( 'bp_after_has_activities_parse_args', __NAMESPACE__ . '\bp_blocks_activity_has_activities_without_scheduled_ones', 10, 1 );

/**
 * Makes sure the activity recorded time is saved if set.
 *
 * @since TBD
 *
 * @param array $args The `bp_activity_add()` arguments.
 * @return array The `bp_activity_add()` arguments.
 */
function bp_blocks_activity_set_recorded_time_argument( $args ) {
	$bpb = bp_blocks();

	if ( ! empty( $bpb->activity_recorded_time ) ) {
		$args['recorded_time'] = $bpb->activity_recorded_time;

		// Reset the global.
		$bpb->activity_recorded_time = '';
	}

	return $args;
}

/**
 * Makes sure the REST Activity endpoint transports the Activity date.
 *
 * @since TBD
 *
 * @param object          $prepared_activity The activity to be saved.
 * @param WP_REST_Request $request The REST request.
 * @return object The activity to be saved.
 */
function bp_blocks_activity_rest_pre_insert_value( $prepared_activity, $request ) {
	$date = $request->get_param( 'date' );

	if ( $date ) {
		$bpb                         = bp_blocks();
		$date_data                   = rest_get_date_with_gmt( $date );
		$bpb->activity_recorded_time = end( $date_data );

		// bp_activity_post_update() does not transport the date.
		add_filter( 'bp_after_activity_add_parse_args', __NAMESPACE__ . '\bp_blocks_activity_set_recorded_time_argument', 10, 1 );
	}

	return $prepared_activity;
}
add_filter( 'bp_rest_activity_pre_insert_value', __NAMESPACE__ . '\bp_blocks_activity_rest_pre_insert_value', 10, 2 );

// Activity links moderation shouldn't take WP Emoji links in account.
remove_action( 'bp_activity_before_save', 'bp_activity_check_moderation_keys', 2, 1 );

/**
 * Moderate the posted activity item, if it contains moderate keywords.
 *
 * @since 1.6.0
 * @since 7.0.0 Make sure WP Emoji links are not taken in account into the max links count.
 *
 * @param BP_Activity_Activity $activity The activity object to check.
 */
function _bp_activity_check_moderation_keys( $activity ) {

	// Only check specific types of activity updates.
	if ( ! in_array( $activity->type, bp_activity_get_moderated_activity_types(), true ) ) {
		return;
	}

	// Remove WP Emojis from the content to moderate.
	$content_to_moderate = preg_replace( '/src=\"(https|http):\/\/s.w.org\/images\/core\/emoji.*?\"/', '', $activity->content );

	// Send back the error so activity update fails.
	// @todo This is temporary until some kind of moderation is built.
	$moderate = bp_core_check_for_moderation( $activity->user_id, '', $content_to_moderate, 'wp_error' );
	if ( is_wp_error( $moderate ) ) {
		$activity->errors = $moderate;

		// Backpat.
		$activity->component = false;
	}
}
add_action( 'bp_activity_before_save', __NAMESPACE__ . '\_bp_activity_check_moderation_keys', 2, 1 );
