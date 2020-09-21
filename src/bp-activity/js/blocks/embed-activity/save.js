/**
 * External dependencies.
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies.
 */
const {
	blockEditor: {
		RichText,
	},
} = wp;

const EmbedActivityBlockSave = ( { attributes } ) => {
	const {
		url,
		caption
	} = attributes;

	if ( !url ) {
		return null;
	}

	return (
		<figure className="wp-block-embed is-type-bp-activity">
			<div className="wp-block-embed__wrapper">
				{
					`\n${url}\n` /* URL needs to be on its own line. */
				}
			</div>
			{ !RichText.isEmpty( caption ) && (
				<RichText.Content
					tagName="figcaption"
					value={ caption }
				/>
			) }
		</figure>
	);
};

EmbedActivityBlockSave.propTypes = {
	attributes: PropTypes.shape({
		url: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
	}).isRequired,
};

export default EmbedActivityBlockSave;
