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

const SaveText = ( { attributes } ) => (
	<RichText.Content
		tagName="p"
		value={ attributes.content }
	/>
);

SaveText.propTypes = {
	attributes: PropTypes.shape({
		content: PropTypes.string.isRequired,
	}).isRequired,
};

export default SaveText;
