/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement, Fragment } = wp.element;
const { __ } = wp.i18n;
const { PanelBody, RangeControl } = wp.components;
const {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
	InspectorControls,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
	getGradientValueBySlug,
	getGradientSlugByValue,
	__experimentalPanelColorGradientSettings,
} = wp.blockEditor;
const { useSelect } = wp.data;

/**
 * External dependencies
 */
const { identity, isEqual, isObject, pickBy, mapValues } = lodash;

const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) ) {
		return object;
	}
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		identity
	);
	return isEqual( cleanedNestedObjects, {} )
		? undefined
		: cleanedNestedObjects;
};

registerBlockType( 'bp/share-activity', {
	title: __( 'Share into activities', 'buddypress' ),

	description: __( 'Action button to share the displayed post/page into user’s activity stream.', 'buddypress' ),

	icon: 'buddicons-activity',

	category: 'buddypress',

	attributes: {
		text: {
			type: 'string',
			default: __( 'Share into my Activities', 'buddypress' ),
		},
		borderRadius: {
			type: 'number',
			default: INITIAL_BORDER_RADIUS_POSITION,
		},
		style: {
			type: 'object',
		},
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		gradient: {
			type: 'string',
		},
	},

	supports: {
		multiple: false,
		align: true,
		lightBlockWrapper: true,
	},

	edit: function( { attributes, setAttributes } ) {
		const { text, backgroundColor, textColor, gradient, borderRadius, style } = attributes;
		const PanelColorGradientSettings = __experimentalPanelColorGradientSettings;
		const backgroundClass = getColorClassName(
			'background-color',
			backgroundColor
		);
		const gradientClass = __experimentalGetGradientClass( gradient );
		const textClass = getColorClassName( 'color', textColor );
		const { colors, gradients } = useSelect( ( select ) => {
			return select( 'core/block-editor' ).getSettings();
		}, [] );

		let className = 'wp-block-button__link';
		let styleProps = {};
		let styleColors = {
			text: '',
			background: '',
		};

		if ( style && style.color  ) {
			if ( style.color.text ) {
				styleColors.text = style.color.text;
				styleProps.color = style.color.text;
			}

			if ( style.color.background ) {
				styleColors.background = style.color.background;
				styleProps.backgroundColor = style.color.background;
			}
		}

		if ( !! backgroundClass ) {
			className += ' has-background ' + backgroundClass;
		}

		if ( !! textClass ) {
			className += ' has-text-color ' + textClass;
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
					<PanelBody title={ __( 'Border settings', 'buddypress' ) }>
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
					<PanelColorGradientSettings
						title={ __( 'Text Color', 'buddypress' ) }
						initialOpen={ false }
						settings={
							[
								{
									label: __( 'Text Color' ),
									onColorChange: onChangeColor( 'text' ),
									colorValue: getColorObjectByAttributeValues(
										colors,
										textColor,
										styleColors.text,
									).color,
								},
							]
						}
					/>
				</InspectorControls>
			</Fragment>
		);
	}
} );
