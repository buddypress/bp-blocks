/**
 * WordPress dependencies.
 */
const {
	blocks: {
		createBlock,
	},
	data: {
		useDispatch,
	},
	blockEditor: {
		RichText,
		BlockControls,
	},
	richText: {
		insert,
		create,
		getTextContent,
	},
	components: {
		Button,
		ToolbarGroup,
		Popover,
		Dashicon,
	},
	element: {
		renderToString,
		useState,
		useRef,
		Fragment,
	},
	i18n: {
		__,
	},
} = wp;

/**
 * Internal dependencies.
 */
import EmojiPickerTabs from '../emojis/emoji-picker';
import { BP_TEXT_BLOCK } from './constants';

const getRange = () => {
	const selection = window.getSelection();
	return selection.rangeCount ? selection.getRangeAt( 0 ) : null;
};

const EditText = ( {
	attributes,
	mergeBlocks,
	onReplace,
	clientId,
	setAttributes,
} ) => {
	const { content, placeholder } = attributes;
	const name = BP_TEXT_BLOCK;
	const { removeBlock } = useDispatch( 'core/block-editor' );
	const onRemove = () => removeBlock( clientId );
	const [ isVisible, setVisible ] = useState( false );

	// Used to track the current RichText.
	const ref = useRef();

	const setContent = ( content ) => {
		setAttributes( { content: content } );
	};

	const insertEmoji = ( emoji ) => {
		const anchor = getRange();
		const valueToInsert = emoji;
		const value = create( { html: renderToString( content ) } );
		const textValue = getTextContent( value );

		value.start = anchor.startOffset;
		value.end   = anchor.endOffset;

		// The text value contains HTML tags.
		if ( textValue.length !== anchor.startContainer.length ) {
			let index = anchor.startContainer.textContent;
			if ( null !== anchor.startContainer.nextSibling ) {
				index += anchor.startContainer.nextSibling.outerHTML;
			}

			// Try to find the best approaching inde.
			if ( 1 < index.length ) {
				const findIndex = textValue.indexOf( index );

				if ( -1 !== findIndex ) {
					value.start += findIndex;
					value.end   += findIndex;
				}
			} else {
				// Otherwise put it at the end of the text value.
				value.start += textValue.length;
				value.end   += textValue.length;
			}
		}

		const newContent = insert( value, valueToInsert );

		/**
		 * @todo: This needs to be improved as our anchor is not taking in account the
		 * format applied to the text.
		 */
		setAttributes( { content: getTextContent( newContent ) } );

		// Give the focus back to the RichText.
		ref.current.focus();
	};

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<Button
						className="components-dropdown-menu__toggle"
						onClick={ setVisible }
					>
						<Dashicon icon="smiley"/>
						{ isVisible && (
							<Popover
								className="activity-editor-emoji-picker__popover"
								position="bottom center"
								onClose={ () => setVisible( false ) }
							>
								<EmojiPickerTabs onPick={ insertEmoji } />
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
				placeholder={ placeholder }
			/>
		</Fragment>
	);
}

export default EditText;
