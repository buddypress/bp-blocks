<?php
/**
 * BP Activity Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \src\bp-activity\bp-activity-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Activity Blocks.
 *
 * @since 7.0.0 Introduce the 'bp/embed-activity' block.
 * @since TBD Introduce the 'bp/share-activity' block.
 *
 * @return array The list of BP Activity blocks.
 */
function register_activity_blocks() {
	$blocks = array(
		'bp/latest-activities' => array(
			'metadata'        => trailingslashit( dirname( __FILE__ ) ) . 'blocks/latest-activities',
			'render_callback' => __NAMESPACE__ . '\bp_activity_render_latest_activities_block',
		),
	);

	if ( bp_is_active( 'activity', 'embeds' ) ) {
		$blocks['bp/embed-activity'] = array(
			'metadata' => trailingslashit( dirname( __FILE__ ) ) . 'blocks/embed-activity',
		);
	}

	return $blocks;
}
add_filter( 'bp_activity_register_blocks', __NAMESPACE__ . '\register_activity_blocks', 10, 0 );

/**
 * Callback function to render the Latest Activities Block.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_activity_render_latest_activities_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'title'         => __( 'Latest updates', 'buddypress' ),
			'maxActivities' => 5,
			'type'          => array( 'activity_update' ),
			'postId'        => 0,
		)
	);

	$max_activities = (int) $block_args['maxActivities'];

	// Should we get a specific member's activities?
	$member_id = 0;
	if ( $block_args['postId'] ) {
		$member_id = (int) get_post_field( 'post_author', $block_args['postId'] );
	} else {
		$member_id = bp_displayed_user_id();
	}

	// Set the widget's wrapper attributes.
	$types              = (array) $block_args['type'];
	$classnames         = array_map( 'sanitize_html_class', array_merge( $types, array( 'bp-latest-activities', 'buddypress', 'widget' ) ) );
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classnames ) ) );

	// Set the Block's title.
	$widget_content = sprintf( '<h2 class="widget-title">%s</h2>', esc_html( $block_args['title'] ) );

	// Avoid conflicts with other activity loops.
	$reset_activities_template = null;
	if ( ! empty( $GLOBALS['activities_template'] ) ) {
		$reset_activities_template = $GLOBALS['activities_template'];
	}

	$widget_args = array(
		'max'          => $max_activities,
		'scope'        => 'all',
		'user_id'      => $member_id,
		'object'       => false,
		'action'       => implode( ',', $types ),
		'primary_id'   => 0,
		'secondary_id' => 0,
	);

	// Build the activity loop.
	if ( 'nouveau' === bp_get_theme_compat_id() ) {
		$bp_nouveau = bp_nouveau();

		// Globalize the activity widget arguments.
		$bp_nouveau->activity->widget_args = $widget_args;

		ob_start();
		bp_get_template_part( 'activity/widget' );
		$widget_content .= ob_get_clean();

		// Reset the global.
		$bp_nouveau->activity->widget_args = array();
	} else {
		$activity_loop = sprintf( '<div class="widget-error"><p>%s</p></div>', esc_html__( 'Sorry, there was no activity found. Please try a different filter.', 'buddypress' ) );

		if ( bp_has_activities( $widget_args ) ) {
			$activity_loop = '';

			while ( bp_activities() ) {
				bp_the_activity();

				$activity_footer  = '';
				$activity_classes = 'activity-item';
				if ( bp_activity_has_content() ) {
					$activity_content = bp_get_activity_content_body();
					$activity_footer  = sprintf(
						'<footer>
							<cite>
								<a href="%1$s" class="bp-tooltip" data-bp-tooltip="%2$s">
									%3$s
								</a>
							</cite>
							%4$s
						</footer>',
						bp_get_activity_user_link(),
						bp_get_activity_member_display_name(),
						bp_get_activity_avatar(
							array(
								'type'   => 'thumb',
								'width'  => '40',
								'height' => '40',
							)
						),
						bp_insert_activity_meta()
					);
				} else {
					$activity_classes .= ' mini';
					$activity_content  = bp_get_activity_action();
				}

				$activity_loop .= sprintf(
					'<blockquote>
						<div class="%1$s">%2$s</div>
						%3$s
					</blockquote>',
					$activity_classes,
					$activity_content,
					$activity_footer
				);
			}
		}

		$widget_content .= sprintf(
			'<div class="activity-list item-list">
				%1$s
			</div>',
			$activity_loop
		);
	}

	// Adds a container to make sure the block is styled even when used into the Columns parent block.
	$widget_content = sprintf( '<div class="bp-latest-activities-block">%s</div>', "\n" . $widget_content . "\n" );

	// Reset the global template loop.
	$GLOBALS['activities_template'] = $reset_activities_template;

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
