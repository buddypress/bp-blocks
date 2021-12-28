/**
 * External dependencies.
 */
const {
	find,
} = lodash;

/**
 * WordPress dependencies.
 */
const {
	blockEditor: {
		InspectorControls,
		RichText,
		useBlockProps,
	},
	components: {
		PanelBody,
	},
	element: {
		createElement,
		Fragment,
	},
	i18n: {
		__,
	},
} = wp;

/**
 * BuddyPress dependencies.
 */
const {
	blockData: {
		isActive,
	}
} = bp;

/**
 * Internal dependencies.
 */
import { SEARCH_OPTIONS } from './constants';
import SearchOptionCheckbox from './option-checkbox';
import SearchOptionsRadioGroup from './options-radiogroup';

const editSearchFormBlock = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps();
	const { activeOptions, placeholder, action, label, buttonText, defaultOption } = attributes;

	const setAvailableOptions = ( option, isChecked ) => {
		let newOptions = activeOptions;

		if ( ! isChecked ) {
			newOptions = newOptions.filter( ( currentOption ) => currentOption !== option );
		} else {
			newOptions = [ option, ...newOptions ];
		}

		newOptions.sort();

		setAttributes( { activeOptions: newOptions } );
	};

	const searchSettings = SEARCH_OPTIONS.filter( ( option ) => 'posts' === option.value || isActive( option.value ) ).map( ( option, key ) => {
		return (
			<SearchOptionCheckbox
				key={ 'option__' + key }
				label={ option.label }
				checked={ -1 !== activeOptions.indexOf( option.value ) }
				option={ option.value }
				onChecked={ setAvailableOptions }
				defaultOption={ defaultOption }
			/>
		);
	} );

	const enabledSearchOptions = SEARCH_OPTIONS.filter( ( option ) => -1 !== activeOptions.indexOf( option.value ) );

	const setDefaultOption = ( option ) => {
		const defaultOption = find( SEARCH_OPTIONS, [ 'value', option ] );

		setAttributes( {
			defaultOption: option,
			placeholder: defaultOption.placeholder,
		} );
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Search options', 'bp-search-block' ) } initialOpen={ true }>
					{ searchSettings }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<form action={ action } method="post">
					<RichText
						tagname="label"
						className="bp-search-label"
						aria-label={ __( 'Label text', 'bp-search-block' ) }
						placeholder={ __( 'Add label…', 'bp-search-block' ) }
						withoutInteractiveFormatting
						value={ label }
						onChange={ ( html ) => setAttributes( { label: html } ) }
					/>
					<div className="bp-block-search__inside-wrapper">
						<input
							type="search"
							className="bp-block-search__input"
							name="search-terms"
							placeholder={ placeholder }
						/>
						<RichText
							tagname="button"
							className="wp-block-search__button bp-search-button"
							aria-label={ __( 'Button text', 'bp-search-block' ) }
							placeholder={ __( 'Add text…', 'bp-search-block' ) }
							withoutInteractiveFormatting
							value={ buttonText }
							onChange={ ( html ) => setAttributes( { buttonText: html } ) }
						/>
					</div>
					<SearchOptionsRadioGroup
						selected={ defaultOption }
						options={ enabledSearchOptions }
						onSelected={ setDefaultOption }
					/>
				</form>
			</div>
		</Fragment>
	);
};

export default editSearchFormBlock;
