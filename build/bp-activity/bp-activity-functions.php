<?php
/**
 * BP Activity functions.
 *
 * Functions to add to BuddyPress Core.
 *
 * @package \bp-blocks\build\bp-activity\bp-activity-functions
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Returns the list of available BuddyPress activity types.
 *
 * @since 8.0.0
 *
 * @return array An array of activity type labels keyed by type names.
 */
function bp_activity_get_types_list() {
	$actions_object = bp_activity_get_actions();
	$actions_array  = get_object_vars( $actions_object );

	$types = array();
	foreach ( $actions_array as $component => $actions ) {
		$new_types = wp_list_pluck( $actions, 'label', 'key' );

		if ( $types ) {
			// Makes sure activity types are unique.
			$new_types = array_diff_key( $new_types, $types );

			if ( 'friends' === $component ) {
				$new_types = array_diff_key(
					array(
						'friendship_accepted'              => false,
						'friendship_created'               => false,
						'friends_register_activity_action' => false,
					),
					$new_types
				);

				$new_types['friendship_accepted,friendship_created'] = __( 'Friendships', 'buddypress' );
			}
		}

		$types = array_merge( $types, $new_types );
	}

	/**
	 * Filter here to edit the activity types list.
	 *
	 * @since 8.0.0
	 *
	 * @param array $types An array of activity type labels keyed by type names.
	 */
	return apply_filters( 'bp_activity_get_rest_types', $types );
}
