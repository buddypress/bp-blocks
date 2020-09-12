/**
 * WordPress dependencies.
 */
const {
	blockEditor: {
    RichText,
  },
} = wp;

const SaveText = ( { attributes } ) => {
  return (
    <RichText.Content
      tagName="p"
      value={ attributes.content }
    />
  );
};

export default SaveText;
