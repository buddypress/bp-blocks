/**
 * WordPress dependencies.
 */
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, BlockControls } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType( 'bp/text', {
	title: __( 'Text', 'buddypress' ),

	description: __( 'What’s on your mind buddy? Use this block to write your awesome updates.', 'buddypress' ),

	icon: 'format-status',

	category: 'common',

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: '',
		},
	},

	edit: function( { attributes, setAttributes } ) {
		const { content } = attributes;

		return (
			<>
				<BlockControls/>
				<RichText
					tagName="p"
					onChange={ ( content ) => setAttributes( { content: content } ) }
					value={ content }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( name );
						}

						return createBlock( name, {
							...attributes,
							content: value,
						} );
					} }
					allowedFormats={ ['core/bold', 'core/italic', 'core/link' ] }
					aria-label={
						content
							? __( 'Paragraph block', 'buddypress' )
							: __(
									'Empty block; start writing or type forward slash to choose a block', 'buddypress'
							  )
					}
					placeholder={ __( 'Start writing or type / to choose a block', 'buddypress' ) }
				/>
			</>
		);
	},

	save: function( { attributes } ) {
        return (
            <RichText.Content
                tagName="p"
                value={ attributes.content }
            />
        );
    },
} );
