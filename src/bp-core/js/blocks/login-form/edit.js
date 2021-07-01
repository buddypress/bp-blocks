/**
 * WordPress dependencies.
 */
 const {
	blockEditor: {
		InspectorControls,
	},
	components: {
		Disabled,
		PanelBody,
		TextControl,
	},
	editor: {
		ServerSideRender,
	},
	element: {
		Fragment,
		createElement,
	},
	i18n: {
		__,
	},
} = wp;

const editLoginForm = ( { attributes, setAttributes } ) => {
	const { title } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'buddypress' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Title', 'buddypress' ) }
						value={ title }
						onChange={ ( text ) => {
							setAttributes( { title: text } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<ServerSideRender block="bp/login-form" attributes={ attributes } />
			</Disabled>
		</Fragment>
	);
};

export default editLoginForm;
