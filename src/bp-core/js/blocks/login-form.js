/**
 * WordPress dependencies.
 */
const {
	blocks: {
		registerBlockType,
	},
	i18n: {
		__,
	},
} = wp;

/**
 * Internal dependencies.
 */
import editLoginForm from './login-form/edit';
import transforms from './login-form/transforms';

registerBlockType( 'bp/login-form', {
	title: __( 'Login Form', 'buddypress' ),
	description: __( 'Adds a login form when a user is not logged in; shows a user profile link and a logout link when the user is logged in.', 'buddypress' ),
	icon: {
		background: '#fff',
		foreground: '#d84800',
		src: 'admin-users',
	},
	category: 'buddypress',
	attributes: {
		title: {
			type: 'string',
			default: __( '', 'buddypress' ),
		},
	},
	edit: editLoginForm,
	transforms: transforms,
} );
