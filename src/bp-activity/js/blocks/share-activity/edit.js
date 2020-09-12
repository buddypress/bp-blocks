/**
 * WordPress dependencies.
 */
const {
	element: {
		Fragment,
	},
  i18n: {
    __,
  },
  blockEditor: {
    RichText,
    getColorClassName,
    InspectorControls,
    getColorObjectByColorValue,
    getColorObjectByAttributeValues,
    PanelColorSettings,
  },
  data: {
    useSelect,
  },
  components: {
    PanelBody,
    RangeControl,
    ToggleControl,
  },
} = wp;

/**
 * External dependencies.
 */
const {
  identity,
  isEqual,
  isObject,
  pickBy,
  mapValues,
} = lodash;

/**
 * Internal dependencies.
 */
import {
  INITIAL_BORDER_RADIUS_POSITION,
  MIN_BORDER_RADIUS_VALUE,
  MAX_BORDER_RADIUS_VALUE,
} from './constants';

const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) ) {
		return object;
	}
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		identity
	);
	return isEqual( cleanedNestedObjects, {} ) ? undefined
		: cleanedNestedObjects;
};

const ShareActivityEdit = ( { attributes, setAttributes } ) => {
	const { text, backgroundColor, textColor, borderRadius, style, wpLoginLinkFallback } = attributes;
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );
	const { colors } = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getSettings();
	}, [] );

	let className = 'wp-block-button__link';
	let styleProps = {};
	let styleColors = {
		text: '',
		background: '',
	};

	if ( style ) {
		if ( style.color.text ) {
			styleColors.text = style.color.text;
			styleProps.color = style.color.text;
		}

		if ( style.color.background ) {
			styleColors.background = style.color.background;
			styleProps.backgroundColor = style.color.background;
		}
	}

	if ( !! backgroundClass || styleColors.background ) {
		className += ' has-background';

		if ( !! backgroundClass ) {
			className += ' ' + backgroundClass;
		}
	}

	if ( !! textClass || styleColors.text ) {
		className += ' has-text-color';

		if ( !! textClass ) {
			className += ' ' + textClass;
		}
	}

	const onChangeColor = ( name ) => ( value ) => {
		const colorObject = getColorObjectByColorValue( colors, value );
		const attributeName = name + 'Color';
		const colorSlug = colorObject && colorObject.slug ? colorObject.slug : undefined;
		const newStyle = {
			...style,
			color: {
				...styleColors,
				[ name ]: value,
			},
		};

		const newNamedColor = colorSlug ? colorSlug : undefined;
		const newAttributes = {
			style: cleanEmptyObject( newStyle ),
			[ attributeName ]: newNamedColor,
		};

		setAttributes( newAttributes );
	};

	return(
		<Fragment>
			<div className="wp-block-button">
				<RichText
					placeholder={ __( 'Add text', 'buddypress' ) }
					value={ text }
					allowedFormats={ ['core/bold', 'core/italic'] }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					className={ className }
					style={ {
						borderRadius: borderRadius
							? borderRadius + 'px'
							: 0,
						...styleProps,
					} }
				/>
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Unconnected users Settings', 'buddypress' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Fallback to the WordPress login link', 'buddypress' ) }
						checked={ !! wpLoginLinkFallback }
						onChange={ () => {
							setAttributes( { wpLoginLinkFallback: ! wpLoginLinkFallback } );
						} }
						help={
							wpLoginLinkFallback
								? __( 'Toggle to hide the button to unconnected users.', 'buddypress' )
								: __( 'Toggle to use the WordPress login link for unconnected users.', 'buddypress' )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Border settings', 'buddypress' ) } initialOpen={ false }>
					<RangeControl
						value={ borderRadius }
						label={ __( 'Border radius', 'buddypress' ) }
						min={ MIN_BORDER_RADIUS_VALUE }
						max={ MAX_BORDER_RADIUS_VALUE }
						initialPosition={ INITIAL_BORDER_RADIUS_POSITION }
						allowReset
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'buddypress' ) }
					initialOpen={ false }
					colorSettings={
						[
							{
								label: __( 'Text Color', 'buddypress' ),
								onChange: onChangeColor( 'text' ),
								value: getColorObjectByAttributeValues(
									colors,
									textColor,
									styleColors.text,
								).color,
							},
							{
								label: __( 'Background Color', 'buddypress' ),
								onChange: onChangeColor( 'background' ),
								value: getColorObjectByAttributeValues(
									colors,
									backgroundColor,
									styleColors.background,
								).color,
							},
						]
					}
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default ShareActivityEdit;
