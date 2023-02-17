/**
 * WordPress dependencies.
 */
import {
	CheckboxControl,
	Disabled,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const SearchOptionCheckbox = ( { label, option, checked, onChecked, defaultOption } ) => {
	const [ isChecked, setChecked ] = useState();

	const setChanged = ( value ) => {
		onChecked( option, value );
		setChecked( value );
	};

	const optionCheckbox = (
		<CheckboxControl
			label={ label }
			checked={ isChecked || checked }
			onChange={ ( value ) => setChanged( value ) }
		/>
	);

	if ( option === defaultOption ) {
		return (
			<Disabled>{ optionCheckbox }</Disabled>
		);
	}

	return optionCheckbox;
};

export default SearchOptionCheckbox;
