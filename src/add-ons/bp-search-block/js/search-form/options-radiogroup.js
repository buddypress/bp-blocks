/**
 * WordPress dependencies.
 */
const {
	components: {
		RadioControl,
	},
	element: {
		createElement,
		useState,
	},
} = wp;

const SearchOptionsRadioGroup = ( { selected, options, onSelected } ) => {
	const [ option, setOption ] = useState( selected );

	const setChanged = ( value ) => {
		onSelected( value );
		setOption( value );
	};

	return (
		<RadioControl
			selected={ option || selected }
			options={ options }
			onChange={ ( value ) => setChanged( value ) }
		/>
	);
};

export default SearchOptionsRadioGroup;
