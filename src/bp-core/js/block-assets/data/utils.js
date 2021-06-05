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
} = lodash;

/**
 * Internal dependencies.
 */
import BP_CORE_STORE_KEY from './register';

export function isComponentActive( component ) {
	const components = useSelect( ( select ) => {
		return select( BP_CORE_STORE_KEY ).getActiveComponents();
	}, [] );

	return !! find( components, ['name', component] );
}

export default isComponentActive;
