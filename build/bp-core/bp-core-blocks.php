<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-core\bp-core-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the BP Block components.
 *
 * @since 6.0.0
 */
function bp_register_block_components() {
	$server_side_renderer_dep = 'wp-server-side-render';
	if ( bp_is_running_wp( '5.3.0', '<' ) ) {
		$server_side_renderer_dep = 'wp-editor';
	}

	wp_register_script(
		'bp-block-components',
		plugins_url( 'js/block-components.js', __FILE__ ),
		array(
			'wp-element',
			'wp-components',
			'wp-i18n',
			'wp-api-fetch',
			'wp-url',
			$server_side_renderer_dep,
		),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-components.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-components',
		'window.bp = window.bp || {};
		bp.blockComponents = bpBlock.blockComponents;
		delete bpBlock;',
		'after'
	);

	wp_register_script(
		'bp-block-data',
		plugins_url( 'js/block-data.js', __FILE__ ),
		array(
			'wp-data',
			'wp-api-fetch',
			'lodash',
		),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( dirname( __FILE__ ) . '/js/block-data.js' ) : bp_get_version(),
		false
	);

	wp_add_inline_script(
		'bp-block-data',
		sprintf(
			'window.bp = window.bp || {};
			bp.blockData = bpBlock.blockData;
			bp.blockData.embedScriptURL = \'%s\';
			delete bpBlock;',
			esc_url_raw( includes_url( 'js/wp-embed.min.js' ) )
		),
		'after'
	);
}
add_action( 'bp_blocks_init', __NAMESPACE__ . '\bp_register_block_components', 1 );

/**
 * Registers a new script to manage dynamic Widget Blocks.
 *
 * @since 9.0.0
 *
 * @param array $scripts Data about the scripts to register.
 * @return array Data about the scripts to register.
 */
function bp_core_register_scripts( $scripts = array() ) {
	$scripts['bp-dynamic-widget-block-script'] = array(
		'file'         => esc_url( plugins_url( 'js/dynamic-widget-block.js', __FILE__ ) ),
		'dependencies' => array(
			'lodash',
			'wp-url',
		),
		'footer'       => true,
	);

	return $scripts;
}
add_filter( 'bp_core_register_common_scripts', __NAMESPACE__ . '\bp_core_register_scripts', 1, 1 );

/**
 * Register the Core blocks.
 *
 * @since 9.0.0
 */
function register_core_blocks() {
	// The BP Core Login block should be defined into the following array.
	$blocks = array();

	if ( 'nouveau' === bp_get_theme_compat_id() ) {
		/**
		 * NB: This block should be registered from the BP Nouveau template
		 * using the `bp_core_register_blocks` filter.
		 */
		$blocks['bp/primary-nav'] = array(
			'name'               => 'bp/primary-nav',
			'editor_script'      => 'bp-primary-nav-block',
			'editor_script_url'  => plugins_url( 'js/blocks/primary-nav.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-block-editor',
				'bp-block-data',
				'bp-block-components',
			),
			'editor_style'       => 'bp-primary-nav-block',
			'editor_style_url'   => plugins_url( 'css/blocks/primary-nav.css', __FILE__ ),
			'attributes'         => array(
				'displayTitle' => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_nouveau_render_primary_nav_block',
		);
	}

	$blocks['bp/login-form'] = array(
		'name'               => 'bp/login-form',
		'editor_script'      => 'bp-login-form-block',
		'editor_script_url'  => plugins_url( 'js/blocks/login-form.js', __FILE__ ),
		'editor_script_deps' => array(
			'wp-blocks',
			'wp-element',
			'wp-components',
			'wp-i18n',
			'wp-block-editor',
			'bp-block-components',
		),
		'style'              => 'bp-login-form-block',
		'style_url'          => plugins_url( 'css/blocks/login-form.css', __FILE__ ),
		'attributes'         => array(
			'title' => array(
				'type'    => 'string',
				'default' => '',
			),
		),
		'render_callback'    => __NAMESPACE__ . '\bp_block_render_login_form_block',
	);

	return $blocks;
}
add_filter( 'bp_core_register_blocks', __NAMESPACE__ . '\register_core_blocks', 10, 0 );

/**
 * Unregister Blocks from the post context.
 *
 * @todo This function should be moved into the BP Nouveau Template Pack.
 *
 * @since 9.0.0
 */
function bp_nouveau_unregister_blocks_for_post_context() {
	$blocks_to_unregister = array();

	if ( 'nouveau' === bp_get_theme_compat_id() ) {
		$blocks_to_unregister[] = 'bp/primary-nav'; // This Block is restricted to the Widget Block Editor.
	}

	/**
	 * Filter here to remove Blocks from the post context.
	 *
	 * @since 9.0.0
	 *
	 * @param array $value The list of Block names to unregister.
	 */
	$blocks = apply_filters(
		'bp_blocks_post_context_unregistered_blocks',
		$blocks_to_unregister
	);

	foreach ( $blocks as $block ) {
		unregister_block_type( $block );
	}
}
add_action( 'load-post.php', __NAMESPACE__ . '\bp_nouveau_unregister_blocks_for_post_context' );
add_action( 'load-post-new.php', __NAMESPACE__ . '\bp_nouveau_unregister_blocks_for_post_context' );

/**
 * Preload the Active BuddyPress Components.
 *
 * @since 9.0.0
 *
 * @param string[] $paths The Block Editors preload paths.
 * @return string[] The Block Editors preload paths.
 */
function bp_blocks_preload_paths( $paths = array() ) {
	return array_merge(
		$paths,
		array(
			'/buddypress/v1/components?status=active',
		)
	);
}
add_filter( 'block_editor_rest_api_preload_paths', __NAMESPACE__ . '\bp_blocks_preload_paths' );

/**
 * Callback function to render the BP Primary Nav Block.
 *
 * @todo This function should be moved into the BP Nouveau Template Pack.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_nouveau_render_primary_nav_block( $attributes = array() ) {
	$widget_content = '';
	$widget_title   = '';
	$block_args     = bp_parse_args(
		$attributes,
		array(
			'displayTitle' => true,
		),
		'widget_object_nav'
	);

	// Previewing the Block inside the editor.
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		$widget_title = bp_get_loggedin_user_fullname();

		ob_start();

		// Temporary override the displayed user by the logged in one.
		add_filter( 'bp_displayed_user_id', 'bp_loggedin_user_id' );

		bp_get_template_part( 'members/single/parts/item-nav' );
		$widget_content = ob_get_clean();

		// Remove the temporary override.
		remove_filter( 'bp_displayed_user_id', 'bp_loggedin_user_id' );
	} else {
		ob_start();

		if ( bp_is_user() ) {
			$widget_title = bp_get_displayed_user_fullname();
			bp_get_template_part( 'members/single/parts/item-nav' );
		} elseif ( bp_is_group() ) {
			$widget_title = bp_get_current_group_name();
			bp_get_template_part( 'groups/single/parts/item-nav' );
		} elseif ( bp_is_directory() ) {
			$widget_title = bp_get_directory_title( bp_current_component() );
			bp_get_template_part( 'common/nav/directory-nav' );
		}

		$widget_content = ob_get_clean();
	}

	if ( ! $widget_content ) {
		return '';
	}

	// Set the Block's title.
	if ( true === $block_args['displayTitle'] ) {
		$widget_content = sprintf(
			'<h2 class="widget-title">%1$s</h2>
			%2$s',
			esc_html( $widget_title ),
			$widget_content
		);
	}

	// Only add a block wrapper if not loaded into a Widgets sidebar.
	if ( ! did_action( 'dynamic_sidebar_before' ) ) {
		$classnames         = 'widget_nav_menu buddypress_object_nav buddypress widget';
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

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
 * @todo This function should be moved into the BP Nouveau Template Pack.
 *
 * @since 9.0.0
 *
 * @param string $classname The classname to be used in the block widget's container HTML.
 * @param string $block_name The name of the block.
 * @return string The classname to be used in the block widget's container HTML.
 */
function bp_nouveau_get_widget_block_classname( $classname, $block_name ) {
	if ( 'bp/primary-nav' === $block_name ) {
		$classname .= ' widget_nav_menu buddypress_object_nav buddypress';
	}

	if ( 'bp/login-form' === $block_name ) {
		$classname .= ' widget_bp_core_login_widget buddypress widget';
	}

	return $classname;
}
add_filter( 'widget_block_dynamic_classname', __NAMESPACE__ . '\bp_nouveau_get_widget_block_classname', 10, 2 );

/**
 * Checks if a Widget/Block is active.
 *
 * @todo This function should be used by the Legacy & Nouveau template packs to
 * replace `is_active_widget( false, false, 'widget_id_base', true )`.
 *
 * @since 9.0.0
 *
 * @param string $block_name     The Block name to check (eg: 'bp/sitewide-notices'). Optional.
 * @param string $widget_id_base The Widget ID base to check (eg: 'bp_messages_sitewide_notices_widget' ). Optional.
 * @return boolean True if the Widget/Block is active. False otherwise.
 */
function bp_is_widget_block_active( $block_name = '', $widget_id_base = '' ) {
	$is_active = array(
		'widget' => false,
		'block'  => false,
	);

	if ( $block_name ) {
		$widget_blocks = get_option( 'widget_block', array() );
		$sidebars      = wp_get_sidebars_widgets();

		if ( ! $widget_blocks || ! $sidebars ) {
			return false;
		}

		// Neutralize inactive sidebar.
		unset( $sidebars['wp_inactive_widgets'] );

		$widgets_content = '';
		foreach ( $widget_blocks as $key => $widget_block ) {
			$widget_block_reference = 'block-' . $key;

			if ( ! isset( $widget_block['content'] ) || ! $widget_block['content'] ) {
				continue;
			}

			foreach ( $sidebars as $sidebar ) {
				if ( is_array( $sidebar ) && in_array( $widget_block_reference, $sidebar, true ) ) {
					$widgets_content .= $widget_block['content'] . "\n";
				}
			}
		}

		$is_active['block'] = has_block( $block_name, $widgets_content );
	}

	if ( $widget_id_base ) {
		$is_active['widget'] = is_active_widget( false, false, $widget_id_base, true );
	}

	return 0 !== count( array_filter( $is_active ) );
}

/**
 * Callback function to render the BP Login Form.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_block_render_login_form_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'title' => '',
		)
	);

	$title = $block_args['title'];

	$classnames         = 'widget_bp_core_login_widget buddypress widget';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	$widget_content = '';

	if ( $title ) {
		$widget_content .= sprintf(
			'<h2 class="widget-title">%s</h2>',
			esc_html( $title )
		);
	}

	if ( is_user_logged_in() ) {
		$action_output = '';
		if ( has_action( 'bp_before_login_widget_loggedin' ) ) {
			ob_start();
			/**
			 * Fires before the display of widget content if logged in.
			 *
			 * @since 1.9.0
			 */
			do_action( 'bp_before_login_widget_loggedin' );
			$action_output = ob_get_clean();
		}

		if ( $action_output ) {
			$widget_content .= $action_output;
		}

		$widget_content .= sprintf(
			'<div class="bp-login-widget-user-avatar">
				<a href="%1$s">
					%2$s
				</a>
			</div>',
			bp_loggedin_user_domain(),
			bp_get_loggedin_user_avatar(
				array(
					'type'   => 'thumb',
					'width'  => 50,
					'height' => 50,
				)
			)
		);

		$widget_content .= sprintf(
			'<div class="bp-login-widget-user-links">
				<div class="bp-login-widget-user-link">%1$s</div>
				<div class="bp-login-widget-user-logout"><a class="logout" href="%2$s">%3$s</a></div>
			</div>',
			bp_core_get_userlink( bp_loggedin_user_id() ),
			wp_logout_url( bp_get_requested_url() ),
			__( 'Log Out', 'buddypress' )
		);

		$action_output = '';
		if ( has_action( 'bp_after_login_widget_loggedin' ) ) {
			ob_start();
			/**
			 * Fires after the display of widget content if logged in.
			 *
			 * @since 1.9.0
			 */
			do_action( 'bp_after_login_widget_loggedin' );
			$action_output = ob_get_clean();
		}

		if ( $action_output ) {
			$widget_content .= $action_output;
		}
	} else {
		$action_output = '';
		if ( has_action( 'bp_before_login_widget_loggedout' ) ) {
			ob_start();
			/**
			 * Fires before the display of widget content if logged out.
			 *
			 * @since 1.9.0
			 */
			do_action( 'bp_before_login_widget_loggedout' );
			$action_output = ob_get_clean();
		}

		if ( $action_output ) {
			$widget_content .= $action_output;
		}

		add_filter( 'login_form_bottom', __NAMESPACE__ . '\bp_blocks_get_login_widget_registration_link', 10, 2 );

		$widget_content .= wp_login_form(
			array(
				'echo'           => false,
				'form_id'        => 'bp-login-widget-form',
				'id_username'    => 'bp-login-widget-user-login',
				'label_username' => __( 'Username', 'buddypress' ),
				'id_password'    => 'bp-login-widget-user-pass',
				'label_password' => __( 'Password', 'buddypress' ),
				'id_remember'    => 'bp-login-widget-rememberme',
				'id_submit'      => 'bp-login-widget-submit',
			)
		);

		remove_filter( 'login_form_bottom', __NAMESPACE__ . '\bp_blocks_get_login_widget_registration_link', 10, 2 );

		$action_output = '';
		if ( has_action( 'bp_after_login_widget_loggedout' ) ) {
			ob_start();
			/**
			 * Fires after the display of widget content if logged out.
			 *
			 * @since 1.9.0
			 */
			do_action( 'bp_after_login_widget_loggedout' );
			$action_output = ob_get_clean();
		}

		if ( $action_output ) {
			$widget_content .= $action_output;
		}
	}

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
 * Create a link to the registration form
 * for use on the bottom of the login form widget.
 *
 * @since 9.0.0
 *
 * @param string $content Content to display. Default empty.
 * @param array  $args    Array of login form arguments.
 * @return string           HTML output.
 */
function bp_blocks_get_login_widget_registration_link( $content = '', $args = array() ) {
	if ( isset( $args['form_id'] ) && 'bp-login-widget-form' === $args['form_id'] && bp_get_signup_allowed() ) {
		$content .= sprintf(
			'<p class="bp-login-widget-register-link"><a href="%1$s">%2$s</a></p>',
			esc_url( bp_get_signup_page() ),
			esc_html__( 'Register', 'buddypress' )
		);
	}

	$action_output = '';
	if ( has_action( 'bp_login_widget_form' ) ) {
		ob_start();
		/**
		 * Fires inside the display of the login widget form.
		 *
		 * @since 2.4.0
		 */
		do_action( 'bp_login_widget_form' );
		$action_output = ob_get_clean();
	}

	if ( $action_output ) {
		$content .= $action_output;
	}

	return $content;
}

