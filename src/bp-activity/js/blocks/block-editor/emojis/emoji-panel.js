/**
 * WordPress dependencies.
 */
const {
	element: {
		useState,
	},
	compose: {
		useInstanceId,
	},
	components: {
		NavigableMenu,
		Button,
		VisuallyHidden,
	},
} = wp;

/**
 * External dependencies.
 */
const { partial, noop, find } = lodash;
import classnames from 'classnames';

const TabButton = ( { tabId, onClick, children, selected, ...rest } ) => (
	<Button
		role="tab"
		tabIndex={ selected ? null : -1 }
		aria-selected={ selected }
		id={ tabId }
		onClick={ onClick }
		{ ...rest }
	>
		{ children }
	</Button>
);

export default function EmojiPanel( {
	className,
	children,
	tabs,
	initialTabName,
	orientation = 'horizontal',
	activeClass = 'is-active',
	onSelect = noop,
} ) {
	const instanceId = useInstanceId( EmojiPanel, 'emoji-panel' );
	const [ selected, setSelected ] = useState(
		initialTabName || ( tabs.length > 0 ? tabs[ 0 ].name : null )
	);

	const handleClick = ( tabKey ) => {
		setSelected( tabKey );
		onSelect( tabKey );
	};

	const onNavigate = ( childIndex, child ) => {
		child.click();
	};

	const selectedTab = find( tabs, { name: selected } );
	const selectedId = `${ instanceId }-${ selectedTab.name }`;

	return (
		<div className={ className }>
			<NavigableMenu
				role="tablist"
				orientation={ orientation }
				onNavigate={ onNavigate }
				className="components-emoji-panel__tabs"
			>
				{ tabs.map( ( tab ) => (
					<TabButton
						className={ classnames(
							'components-emoji-panel__tabs-item',
							tab.className,
							{
								[ activeClass ]: tab.name === selected,
							}
						) }
						tabId={ `${ instanceId }-${ tab.name }` }
						aria-controls={ `${ instanceId }-${ tab.name }-view` }
						selected={ tab.name === selected }
						key={ tab.name }
						onClick={ partial( handleClick, tab.name ) }
					>
						{ tab.title }
						{ tab.label && (
							<VisuallyHidden>{ tab.label }</VisuallyHidden>
						) }
					</TabButton>
				) ) }
			</NavigableMenu>
			{ selectedTab && (
				<div
					aria-labelledby={ selectedId }
					role="tabpanel"
					id={ `${ selectedId }-view` }
					className="components-emoji-panel__tab-content"
				>
					{ children( selectedTab ) }
				</div>
			) }
		</div>
	);
}
