/**
 * WordPress dependencies.
 */
import {
    InspectorControls,
} from '@wordpress/block-editor';
import {
	Disabled,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

const editLoginForm = ( { attributes, setAttributes } ) => {
	const { title, forgotPwdLink } = attributes;

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
					<ToggleControl
						label={ __( 'Include the link to reset the user password', 'buddypress' ) }
						checked={ !! forgotPwdLink }
						onChange={ () => {
							setAttributes( { forgotPwdLink: ! forgotPwdLink } );
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
