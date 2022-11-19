<?php
/**
 * BP Activity Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-activity\bp-activity-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register scripts and styles for the Activity component.
 *
 * @since TBD
 */
function bp_activity_register_scripts_and_styles() {
	wp_register_script(
		'bp-activity-modal',
		plugins_url( 'js/activity-modal.js', __FILE__ ),
		array( 'thickbox' ),
		filemtime( dirname( __FILE__ ) . '/js/activity-modal.js' ),
		true
	);

	wp_register_style(
		'bp-activity-modal',
		plugins_url( 'css/activity-modal.css', __FILE__ ),
		array( 'thickbox' ),
		filemtime( dirname( __FILE__ ) . '/css/activity-modal.css' )
	);
}
//add_action( 'bp_init', __NAMESPACE__ . '\bp_activity_register_scripts_and_styles' );

/**
 * Callback function to render the block to share post/page via Activity stream.
 *
 * @since TBD
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_activity_render_share_activity_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'text'                => '',
			'borderRadius'        => '',
			'style'               => array(),
			'backgroundColor'     => '',
			'textColor'           => '',
			'wpLoginLinkFallback' => true,
		)
	);

	if ( ! $block_args['text'] ) {
		return;
	}

	$classes       = array( 'wp-block-button__link' );
	$styles        = $block_args['style'];
	$button_styles = array();
	$button_style  = '';
	$link          = get_permalink();

	if ( ! is_user_logged_in() ) {
		if ( ! $block_args['wpLoginLinkFallback'] ) {
			return;
		} else {
			$link = wp_login_url( $link );
		}
	} else {
		// Use the BP Activity modal.
		wp_enqueue_script( 'bp-activity-modal' );
		wp_enqueue_style( 'bp-activity-modal' );

		$classes[] = 'thickbox';

		/*
		 * @todo replace this.
		$link = bp_activity_get_block_editor_link(
			array(
				'url'       => rawurlencode( $link ),
				'TB_iframe' => true,
			)
		);*/
	}

	if ( isset( $block_args['className'] ) && $block_args['className'] ) {
		$classes[] = $block_args['className'];
	}

	if ( $block_args['textColor'] ) {
		$classes = array_merge(
			$classes,
			array(
				sprintf( 'has-%s-color', $block_args['textColor'] ),
				'has-text-color',
			)
		);

		unset( $styles['color']['text'] );
	}

	if ( $block_args['backgroundColor'] ) {
		$classes = array_merge(
			$classes,
			array(
				sprintf( 'has-%s-background-color', $block_args['backgroundColor'] ),
				'has-background',
			)
		);

		unset( $styles['color']['background'] );
	}

	if ( $block_args['borderRadius'] || 0 === $block_args['borderRadius'] ) {
		$styles['border']['border-radius'] = (int) $block_args['borderRadius'] . 'px';
	}

	if ( array_filter( $styles ) ) {
		foreach ( $styles as $style ) {
			$key = key( $style );

			if ( ! $key ) {
				continue;
			}

			$button_styles[] = sprintf( '%1$s: %2$s;', $key, $style[ $key ] );
		}

		$button_style = sprintf( 'style="%s"', implode( ' ', $button_styles ) );
	}

	// Merge link and button styles with block attributes.
	$args = array_merge(
		array(
			'link'         => $link,
			'buttonStyles' => $button_styles,
		),
		$attributes
	);

	$output = sprintf(
		'<div class="bp-block-activity-share wp-block-buttons">%1$s
			<div class="wp-block-button">%1$s
				<a href="%2$s" class="%3$s" rel="nofollow ugc"%4$s>%5$s</a>
			</div>
		</div>',
		"\n",
		esc_url( $link ),
		implode( ' ', array_map( 'sanitize_html_class', $classes ) ),
		$button_style,
		wp_kses(
			$block_args['text'],
			array(
				'strong' => true,
				'b'      => true,
				'em'     => true,
				'i'      => true,
			)
		)
	);

	/**
	 * Filter here to edit the block output.
	 *
	 * @since TBD
	 *
	 * @param string $output The HTML output of the block.
	 * @param array  $args The block extended arguments.
	 */
	return apply_filters( 'bp_activity_render_share_activity_block', $output, $args );
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
		/*
		 * @todo restore this block.
		'bp/share-activity'    => array(
			'name'               => 'bp/share-activity',
			'editor_script'      => 'bp-share-activity-block',
			'editor_script_url'  => plugins_url( 'js/blocks/share-activity.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-i18n',
				'wp-block-editor',
				'wp-components',
				'wp-data',
				'lodash',
			),
			'attributes'         => array(
				'text'                => array(
					'type'    => 'string',
					'default' => __( 'Share into my Activities', 'buddypress' ),
				),
				'borderRadius'        => array(
					'type' => 'number',
				),
				'style'               => array(
					'type' => 'object',
				),
				'backgroundColor'     => array(
					'type' => 'string',
				),
				'textColor'           => array(
					'type' => 'string',
				),
				'wpLoginLinkFallback' => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_activity_render_share_activity_block',
		),*/
		'bp/latest-activities' => array(
			'name'               => 'bp/latest-activities',
			'editor_script'      => 'bp-latest-activities-block',
			'editor_script_url'  => plugins_url( 'js/blocks/latest-activities.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-block-editor',
				'wp-server-side-render',
				'bp-block-data',
			),
			'style'              => 'bp-latest-activities-block',
			'style_url'          => plugins_url( 'css/blocks/latest-activities.css', __FILE__ ),
			'attributes'         => array(
				'title'         => array(
					'type'    => 'string',
					'default' => __( 'Latest updates', 'buddypress' ),
				),
				'maxActivities' => array(
					'type'    => 'number',
					'default' => 5,
				),
				'type'          => array(
					'type'    => 'array',
					'default' => array( 'activity_update' ),
				),
				'postId'        => array(
					'type'    => 'number',
					'default' => 0,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_activity_render_latest_activities_block',
		),
	);

	if ( bp_is_active( 'activity', 'embeds' ) ) {
		$blocks['bp/embed-activity'] = array(
			'name'               => 'bp/embed-activity',
			'editor_script'      => 'bp-embed-activity-block',
			'editor_script_url'  => plugins_url( 'js/blocks/embed-activity.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-i18n',
				'wp-components',
				'wp-block-editor',
				'wp-data',
				'wp-compose',
				'bp-block-data',
			),
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
