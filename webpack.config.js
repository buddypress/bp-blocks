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
			"bp-core/js/dynamic-widget-block": './src/bp-core/js/dynamic-widget-block.js',
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
				}
			},
			requestToHandle( request ) {
				if ( request === '@buddypress/block-components' ) {
					return 'bp-block-components';
				} else if ( request === '@buddypress/block-data' ) {
					return 'bp-block-data';
				}
			}
		} )
	]
}
