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

export default isActive;
