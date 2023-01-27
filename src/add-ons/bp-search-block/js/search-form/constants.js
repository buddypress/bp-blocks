/**
 * WordPress dependencies.
 */
const {
	i18n: {
		_x,
		__,
	},
} = wp;

/**
 * BP Search Form options.
 *
 * Depending on BP Active components, some of this options might be removed.
 *
 * @type {Array}
 */
export const SEARCH_OPTIONS = [
	{
		label: _x( 'Activities', 'search form', 'bp-search-block' ),
		value: 'activity',
		requiredFeature: '',
		placeholder: __( 'Search activities', 'bp-search-block' ),
	},
	{
		label: _x( 'Members', 'search form', 'bp-search-block' ),
		value: 'members',
		requiredFeature: '',
		placeholder: __( 'Search members', 'bp-search-block' ),
	},
	{
		label: _x( 'Groups', 'search form', 'bp-search-block' ),
		value: 'groups',
		requiredFeature: '',
		placeholder: __( 'Search groups', 'bp-search-block' ),
	},
	{
		label: _x( 'Blogs', 'search form', 'bp-search-block' ),
		value: 'blogs',
		requiredFeature: 'sites_directory',
		placeholder: __( 'Search blogs', 'bp-search-block' ),
	},
	{
		label: _x( 'Posts', 'search form', 'bp-search-block' ),
		value: 'posts',
		placeholder: __( 'Search posts', 'bp-search-block' ),
	},
];
