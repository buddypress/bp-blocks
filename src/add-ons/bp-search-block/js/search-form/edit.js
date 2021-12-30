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
		ToggleControl,
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
	const {
		activeOptions,
		placeholder,
		action,
		label,
		useLabel,
		buttonText,
		useIcon,
		defaultOption,
	} = attributes;

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
				<PanelBody title={ __( 'Display options', 'bp-search-block' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show the search label', 'bp-search-block' ) }
						checked={ !! useLabel }
						onChange={ () => {
							setAttributes( { useLabel: ! useLabel } );
						} }
						help={
							useLabel
								? __( 'Display a label over the search field.', 'bp-search-block' )
								: __( 'Toggle to display a label over the search field.', 'bp-search-block' )
						}
					/>
					<ToggleControl
						label={ __( 'Use a Search Icon', 'bp-search-block' ) }
						checked={ !! useIcon }
						onChange={ () => {
							setAttributes( { useIcon: ! useIcon } );
						} }
						help={
							useIcon
								? __( 'Use a search icon instead of the search button text.', 'bp-search-block' )
								: __( 'Toggle to use a search icon instead of the search button text.', 'bp-search-block' )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<form action={ action } method="post">
					{ useLabel && (
						<RichText
							tagname="label"
							className="bp-search-label"
							aria-label={ __( 'Label text', 'bp-search-block' ) }
							placeholder={ __( 'Add label…', 'bp-search-block' ) }
							withoutInteractiveFormatting
							value={ label }
							onChange={ ( html ) => setAttributes( { label: html } ) }
						/>
					) }
					<div className="bp-block-search__inside-wrapper">
						<input
							type="search"
							className="bp-block-search__input"
							name="search-terms"
							placeholder={ placeholder }
						/>

						{ !! useIcon && (
							<button
								type="button"
								className="wp-block-search__button bp-search-button bp-block-search__icon-button has-icon"
							>
								<div className="bp-search-block-icon">
									<span className="screen-reader-text">{ __( 'Search', 'bp-search-block' ) }</span>
								</div>
							</button>
						) }

						{ ! useIcon && (
							<RichText
								tagname="button"
								className="wp-block-search__button bp-search-button"
								aria-label={ __( 'Button text', 'bp-search-block' ) }
								placeholder={ __( 'Add text…', 'bp-search-block' ) }
								withoutInteractiveFormatting
								value={ buttonText }
								onChange={ ( html ) => setAttributes( { buttonText: html } ) }
							/>
						) }
					</div>
					<div className="bp-block-search-for__wrapper">
						<strong className="bp-block-search-for__label">{ __( 'Search for:', 'bp-search-block' ) }</strong>
						<div className="bp-block-search-for__options">
							<SearchOptionsRadioGroup
								selected={ defaultOption }
								options={ enabledSearchOptions }
								onSelected={ setDefaultOption }
							/>
						</div>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default editSearchFormBlock;
