/**
 * WordPress dependencies.
 */
const {
	components: {
		Button,
	},
	i18n: {
		__,
	},
	richText: {
		create,
		getTextContent,
	},
	element: {
		renderToString,
	},
} = wp;

/**
 * External dependencies.
 */
const { groupBy } = lodash;

/**
 * Internal dependencies.
 */
import EmojiPanel from './emoji-panel';
import emojiData from './emojis.json';

const EmojiPickerListItem = ( { emoji, onClick } ) => {
	if ( ! emoji ) {
		return null;
	}

	const output = getTextContent( create( { html: renderToString( emoji ) } ) );

	return (
		<li className="activity-editor-emoji-picker-list__list-item">
			<Button
				className="activity-editor-emoji-picker-list__item"
				onClick={ ( event ) => {
					event.preventDefault();
					onClick();
				} }
			>
				{ output }
			</Button>
		</li>
	);
};

const EmojiPickerList = ( { emojis, onPick } ) => {
	return (
		<ul role="list" className="activity-editor-emoji-picker-list">
			{ emojis.map( ( emoji ) => {
				return (
					<EmojiPickerListItem
						key={ emoji.id }
						emoji={ emoji.char }
						onClick={ () => {
							onPick( emoji.char );
						} }
					/>
				);
			} ) }
		</ul>
	);
};

const EmojiPickerTabs = ( { onPick } ) => {
	const categories = groupBy( emojiData, 'category' );

	return (
		<EmojiPanel
			className="activity-editor-emoji-picker__tabs"
			tabs={ [
				{
					name: 'smileys',
					title: '😀',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Smileys & Emotion', 'buddypress' ),
					items: categories['smileys-emotion'],
				},
				{
					name: 'people',
					title: '👍',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'People & Body', 'buddypress' ),
					items: categories['people-body'],
				},
				{
					name: 'animals',
					title: '🐻',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Animals & Nature', 'buddypress' ),
					items: categories['animals-nature'],
				},
				{
					name: 'food',
					title: '🍔',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Food & Drink', 'buddypress' ),
					items: categories['food-drink'],
				},
				{
					name: 'activities',
					title: '⚽️',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Activities', 'buddypress' ),
					items: categories['activities'],
				},
				{
					name: 'travel',
					title: '🚘',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Travel & Places', 'buddypress' ),
					items: categories['travel-places'],
				},
				{
					name: 'objects',
					title: '💡',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Objects', 'buddypress' ),
					items: categories['objects'],
				},
				{
					name: 'symbols',
					title: '💟',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Symbols', 'buddypress' ),
					items: categories['symbols'],
				},
				{
					name: 'flags',
					title: '🚩',
					/* translators: Emoji Category tab title in the Emoji Picker. */
					label: __( 'Flags', 'buddypress' ),
					items: categories['flags'],
				},
			] }
		>
			{ ( tab ) => {
				return(
					<div className="activity-editor-emoji-picker__results">
						<EmojiPickerList
							emojis={ tab.items }
							onPick={ onPick }
						/>
					</div>
				);
			} }
		</EmojiPanel>
	);
};

export default EmojiPickerTabs;
