/**
 * WordPress dependencies.
 */
const {
	blockEditor: {
		RichText,
		useBlockProps,
	},
	element: {
		createElement,
	},
	i18n: {
		__,
	},
} = wp;

/**
 * Internal dependencies.
 */
import { SEARCH_OPTIONS } from './constants';

const saveSearchFormBlock = ( { attributes } ) => {
	const blockProps = useBlockProps.save();
	const {
		label,
		useLabel,
		buttonText,
		useIcon,
		placeholder,
		activeOptions,
		defaultOption,
		action,
	} = attributes;
	const enabledSearchOptions = SEARCH_OPTIONS.filter( ( option ) => -1 !== activeOptions.indexOf( option.value ) );
	let options = [];

	enabledSearchOptions.forEach( ( option, key ) => {
		let isChecked  = false;

		if ( option.value === defaultOption ) {
			isChecked = 'checked';
		}

		options.push(
			<li key={ 'bp-search-option__' + key }>
				<label>
					<input type="radio" name="search-which" value={ option.value } data-placeholder={ option.placeholder } checked={ isChecked }/>
					{ option.label }
				</label>
			</li>
		);
	} );

	return (
		<div { ...blockProps }>
			<form action={ action } method="post">
				{ useLabel && (
					<RichText.Content tagName="label" value={ label } className="bp-search-label" />
				) }
				<div className="bp-block-search__inside-wrapper">
					<input
						type="search"
						className="bp-block-search__input"
						name="search-terms"
						placeholder={ placeholder }
					/>

					{ useIcon && (
						<button
							type="button"
							className="wp-block-search__button bp-search-button bp-block-search__icon-button has-icon"
						>
							<div class="bp-search-block-icon" />
						</button>
					) }

					{ ! useIcon && (
						<RichText.Content tagName="button" type="submit" value={ buttonText } className="wp-block-search__button bp-search-button" />
					) }
				</div>
				<ul>{ options }</ul>
			</form>
		</div>
	);
};

export default saveSearchFormBlock;
