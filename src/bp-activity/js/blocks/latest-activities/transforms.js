/**
 * WordPress dependencies.
 */
 const {
	blocks: {
		createBlock,
	},
} = wp;

/**
 * Transforms Nouveau Activity Widget to Activity Block.
 *
 * @type {Object}
 */
const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/legacy-widget' ],
			isMatch: ( { idBase, instance } ) => {
				if ( ! instance?.raw ) {
					return false;
				}

				return idBase === 'bp_latest_activities';
			},
			transform: ( { instance } ) => {
				return createBlock( 'bp/latest-activities', {
					title: instance.raw.title,
					maxActivities: instance.raw.max,
					type: instance.raw.type,
				} );
			},
		},
	],
};

export default transforms;
