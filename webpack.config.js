const path = require( 'path' );

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

module.exports = {
    ...defaultConfig,
    ...{
        entry: {
            "bp-core/js/block-data": {
				import: './src/bp-core/js/block-assets/block-data.js',
				library: {
					name: [ 'bp', 'blockData' ],
					type: 'window',
				},
			},
			"bp-core/js/block-components": {
				import: './src/bp-core/js/block-components/block-components.js',
				library: {
					name: [ 'bp', 'blockComponents' ],
					type: 'window',
				},
			},
			"add-ons/bp-search-block/js/index": './src/add-ons/bp-search-block/js/index.js',
			"add-ons/bp-search-block/js/view": './src/add-ons/bp-search-block/js/view.js',
        },
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'dist' ),
		}
    }
}
