/**
 * WordPress dependencies.
 */
const { registerBlockType, createBlock } = wp.blocks;
const { useDispatch } = wp.data;
const { RichText, BlockControls } = wp.blockEditor;
const { insert, create, getTextContent } = wp.richText;
const { Button, ToolbarGroup, Popover, Dashicon } = wp.components;
const { renderToString, useState, useRef } = wp.element;
const { __ } = wp.i18n;

const getRange = () => {
	const selection = window.getSelection();
	return selection.rangeCount ? selection.getRangeAt( 0 ) : null;
}

const editText = ( { attributes, mergeBlocks, onReplace, clientId, setAttributes } ) => {
	const { content } = attributes;
	const name = 'bp/text';
	const { removeBlock } = useDispatch( 'core/block-editor' );
	const onRemove = () => removeBlock( clientId );
	const [ isVisible, setVisible ] = useState( false );

	// Used to track the current RichText.
	const ref = useRef();

	const setContent = ( content ) => {
		setAttributes( { content: content } )
	}

	const showEmojiPicker = ( emoji ) => {
		const anchor = getRange();
		const valueToInsert = emoji;
		const value = create( { html: renderToString( content ) } );

		value.start = anchor.startOffset;
		value.end   = anchor.endOffset;

		const newContent = insert( value, valueToInsert );

		/**
		 * This needs to be improved as our anchor is not taking in account the
		 * format applied to the text.
		 */
		setAttributes( { content: getTextContent( newContent ) } );

		// Give the focus back to the RichText.
		ref.current.focus();
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Button
						className="components-dropdown-menu__toggle"
						onClick={ setVisible }
					>
						<Dashicon icon="smiley"/>
						{ isVisible && (
							<Popover position="bottom center" onClose={ () => setVisible( false ) }>
								<Button key="poop" onClick={ () => showEmojiPicker( '💩' ) }>💩</Button>
								<Button key="houray" onClick={ () => showEmojiPicker( '🙌' ) }>🙌</Button>
							</Popover>
						) }
					</Button>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				identifier="content"
				tagName="p"
				ref={ ref }
				onChange={ ( content ) => setContent( content ) }
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
