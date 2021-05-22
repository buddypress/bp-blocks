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
		RangeControl,
		SelectControl,
		TextControl,
		ToggleControl,
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

/**
 * Internal dependencies.
 */
import { TYPES } from './constants';

const editDynamicMembersListBlock = ( { attributes, setAttributes } ) => {
	const { title, maxMembers, memberDefault, linkTitle } = attributes;

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
					<RangeControl
						label={ __( 'Max members to show', 'buddypress' ) }
						value={ maxMembers }
						onChange={ ( value ) =>
							setAttributes( { maxMembers: value } )
						}
						min={ 1 }
						max={ 10 }
						required
					/>
					<SelectControl
						label={ __( 'Default members to show', 'buddypress' ) }
						value={ memberDefault }
						options={ TYPES }
						onChange={ ( option ) => {
							setAttributes( { memberDefault: option } );
						} }
					/>
					<ToggleControl
						label={ __( 'Link block title to Members directory', 'buddypress' ) }
						checked={ !! linkTitle }
						onChange={ () => {
							setAttributes( { linkTitle: ! linkTitle } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<ServerSideRender block="bp/dynamic-members" attributes={ attributes } />
			</Disabled>
		</Fragment>
	);
};

export default editDynamicMembersListBlock;
