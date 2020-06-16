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
add_filter( 'bp_get_activity_content_body', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_parent_content', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_latest_update_excerpt', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_get_activity_feed_item_description', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_content_before_save', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_action_before_save', 'bp_blocks_activity_kses', 1 );
add_filter( 'bp_activity_latest_update_content', 'bp_blocks_activity_kses', 1 );

/**
 * Filters the Acticity loop to only fetch past activities.
 *
 * NB: this still needs some work (eg: Acticity Scheduled User screen, activity action string
 * adaptations, Activity Admin status column, Activity edit screen...).
 *
 * @since 6.1.0
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
add_filter( 'bp_after_has_activities_parse_args', 'bp_blocks_activity_has_activities_without_scheduled_ones', 10, 1 );

/**
 * Makes sure the activity recorded time is saved if set.
 *
 * @since 6.1.0
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
 * @since 6.1.0
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
		add_filter( 'bp_after_activity_add_parse_args', 'bp_blocks_activity_set_recorded_time_argument', 10, 1 );
	}

	return $prepared_activity;
}
add_filter( 'bp_rest_activity_pre_insert_value', 'bp_blocks_activity_rest_pre_insert_value', 10, 2 );

/**
 * Restrict the Groups Autocompleter results to the loggedin user.
 *
 * NB: the BP Autocompleter component should be improved to accept more props.
 * This is a temporary work around.
 *
 * @since 6.1.0
 *
 * @param array           $args The Groups query arguments.
 * @param WP_REST_Request $request
 */
function bp_blocks_activity_rest_restrict_groups( $args = array(), $request ) {
	$headers = $request->get_headers();
	if ( isset( $headers['referer'] ) ) {
		$referer = reset( $headers['referer'] );
	}

	$is_admin_activity_add = add_query_arg( 'page', 'bp-activity-new', admin_url( 'admin.php' ) ) === $referer;

	if ( $is_admin_activity_add ) {
		$args['user_id'] = bp_loggedin_user_id();
	}

	return $args;
}
add_filter( 'bp_rest_groups_get_items_query_args', 'bp_blocks_activity_rest_restrict_groups', 10, 2 );
