/**
 * WordPress dependencies.
 */
const {
	data: {
		useSelect,
	},
} = wp;

/**
 * External dependencies.
 */
const {
	find,
	get,
} = lodash;

/**
 * Internal dependencies.
 */
import BP_CORE_STORE_KEY from './register';

/**
 * Checks whether a component or the feature of an active component is enabled.
 *
 * @since 8.0.0
 *
 * @param {string} component (required) The component to check.
 * @param {string} feature (optional) The feature to check.
 * @return {boolean} Whether a component or the feature of an active component is enabled.
 */
export function isActive( component, feature = '' ) {
	const components = useSelect( ( select ) => {
		return select( BP_CORE_STORE_KEY ).getActiveComponents();
	}, [] );

	const activeComponent = find( components, ['name', component] );

	if ( ! feature ) {
		return !! activeComponent;
	}

	return get( activeComponent, [ 'features', feature ] );
}

/**
 * Returns the logged in user object.
 *
 * @since 8.0.0
 *
 * @return {Object} The logged in user object.
 */
export function loggedInUser() {
	const loggedInUser = useSelect( ( select ) => {
		return select( 'core' ).getCurrentUser();
	}, [] );

	return loggedInUser;
}

export default isActive;
