/**
 * WordPress dependencies.
 */
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;
const { RichText, getColorClassName, __experimentalGetGradientClass } = wp.blockEditor;

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
		const { text, backgroundColor, textColor, gradient, style } = attributes;
		const backgroundClass = getColorClassName(
			'background-color',
			backgroundColor
		);
		const gradientClass = __experimentalGetGradientClass( gradient );
		const textClass = getColorClassName( 'color', textColor );
		let className = 'wp-block-button__link';

		if ( !! backgroundClass ) {
			className += 'has-background ' + backgroundClass;
		}

		if ( !! textClass ) {
			className += 'has-text-color ' + textClass;
		}

		return(
			<div className="wp-block-button">
				<RichText
					placeholder={ __( 'Add text', 'buddypress' ) }
					value={ text }
					allowedFormats={ ['core/bold', 'core/italic'] }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					className={ className }
				/>
			</div>
		);
	}
} );
