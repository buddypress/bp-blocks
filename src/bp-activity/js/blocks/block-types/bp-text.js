/**
 * WordPress dependencies.
 */
const { registerBlockType, createBlock } = wp.blocks;
const { useDispatch } = wp.data;
const { RichText, BlockControls } = wp.blockEditor;
const { __, sprintf } = wp.i18n;

const editText = ( { attributes, mergeBlocks, onReplace, clientId, setAttributes } ) => {
	const { content } = attributes;
	const name = 'bp/text';
	const { removeBlock } = useDispatch( 'core/block-editor' );
	const onRemove = () => removeBlock( clientId );

	return (
		<>
			<BlockControls/>
			<RichText
				identifier="content"
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
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ onRemove }
				aria-label={
					content
						? __( 'Text block', 'buddypress' )
						: __( 'Empty block; start writing or type forward slash to choose a block', 'buddypress' )
				}
				placeholder={ __( 'Start writing or type / to choose a block', 'buddypress' ) }
			/>
		</>
	);
}

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

	edit: editText,

	save: function( { attributes } ) {
        return (
            <RichText.Content
                tagName="p"
                value={ attributes.content }
            />
        );
    },
} );
