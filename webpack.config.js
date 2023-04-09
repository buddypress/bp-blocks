const path = require( 'path' );

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = {
    ...defaultConfig,
    ...{
        entry: {
			"bp-activity/blocks/embed-activity/index": './src/bp-activity/blocks/embed-activity/embed-activity.js',
			"bp-activity/blocks/latest-activities/index": './src/bp-activity/blocks/latest-activities/latest-activities.js',
            "bp-core/blocks/block-data/index": {
				import: './src/bp-core/blocks/block-assets/block-data.js',
				library: {
					name: [ 'bp', 'blockData' ],
					type: 'window',
				},
			},
			"bp-core/blocks/block-components/index": {
				import: './src/bp-core/blocks/block-components/block-components.js',
				library: {
					name: [ 'bp', 'blockComponents' ],
					type: 'window',
				},
			},
			"bp-core/blocks/block-collection/index": './src/bp-core/blocks/block-collection/block-collection.js',
			"bp-core/blocks/login-form/index": './src/bp-core/blocks/login-form/login-form.js',
			"bp-core/blocks/primary-nav/index": './src/bp-core/blocks/primary-nav/primary-nav.js',
			"bp-core/js/dynamic-widget-block": {
				import: './src/bp-core/js/dynamic-widget-block.js',
				library: {
					name: [ 'bp', 'dynamicWidgetBlock' ],
					type: 'window',
				},
			},
			"bp-friends/blocks/dynamic-widget/index": './src/bp-friends/blocks/dynamic-widget/friends.js',
			"bp-friends/js/dynamic-widget-block": './src/bp-friends/js/friends.js',
			"bp-groups/blocks/group/index": './src/bp-groups/blocks/group/group.js',
			"bp-groups/blocks/groups/index": './src/bp-groups/blocks/groups/groups.js',
			"bp-groups/blocks/dynamic-widget/index": './src/bp-groups/blocks/dynamic-widget/dynamic-groups.js',
			"bp-groups/js/dynamic-widget-block": './src/bp-groups/js/dynamic-groups.js',
			"add-ons/bp-search-block/index": './src/add-ons/bp-search-block/index.js',
			"add-ons/bp-search-block/view": './src/add-ons/bp-search-block/view.js',
        },
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'dist' ),
		}
    },
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin( {
			requestToExternal( request ) {
				if ( request === '@buddypress/block-components' ) {
					return [ 'bp', 'blockComponents' ];
				} else if ( request === '@buddypress/block-data' ) {
					return [ 'bp', 'blockData' ];
				} else if ( request === '@buddypress/dynamic-widget-block' ) {
					return [ 'bp', 'dynamicWidgetBlock' ];
				}
			},
			requestToHandle( request ) {
				if ( request === '@buddypress/block-components' ) {
					return 'bp-block-components';
				} else if ( request === '@buddypress/block-data' ) {
					return 'bp-block-data';
				} else if ( request === '@buddypress/dynamic-widget-block' ) {
					return 'bp-dynamic-widget-block';
				}
			}
		} )
	]
}
