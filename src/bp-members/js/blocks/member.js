const { registerBlockType } = wp.blocks;
const { Component, createElement } = wp.element;
const { Placeholder, Button, Popover, Disabled } = wp.components;
const { ServerSideRender } = wp.editor;
const { apiFetch } = wp;
const { __ } = wp.i18n;

class MemberPlaceholder extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			search: '',
			members: [],
			error: '',
		};

		this.searchUsername = this.searchUsername.bind( this );
		this.selectUsername = this.selectUsername.bind( this );
	}

	searchUsername( value ) {
		const { search } = this.state;
		this.setState( { search: value } );

		if ( value.length < search.length ) {
			this.setState( { members: [] } );
		}

		let payload = '';

		if ( value ) {
			payload = '?search=' + encodeURIComponent( value );
		}

		apiFetch( { path: '/buddypress/v1/members' + payload } ).then( members => {
            this.setState( { members: members } );
        }, error => {
            this.setState( { error: error.message } );
        } );
	}

	selectUsername( event, memberID ) {
		const { onSelectMember } = this.props;
		event.preventDefault();

		this.setState( {
			search: '',
			members: [],
			error: '',
		} );

		return onSelectMember( { memberID: memberID } );
	}

	render() {
		const { search, members } = this.state;
		let membersList;

		if ( members.length ) {
			membersList = members.map( ( member ) => {
				return (
					<button
						type="button" key={ 'editor-autocompleters__member-item-' + member.id }
						role="option"
						aria-selected="true"
						className="components-button components-autocomplete__result editor-autocompleters__user"
						onClick={ ( event ) => this.selectUsername( event, member.id ) }
					>
						<img key="avatar" className="editor-autocompleters__user-avatar" alt="" src={ member.avatar_urls.thumb } />
						<span key="name" className="editor-autocompleters__user-name">{ member.name }</span>
						<span key="slug" className="editor-autocompleters__user-slug">{ member.mention_name }</span>
					</button>
				);
			} );
		}

		return (
			<Placeholder
				icon="admin-users"
				label={ __( 'BuddyPress Member', 'buddypress' ) }
				instructions={ __( 'Start typing the name of the member you want to feature into this post.', 'buddypress' ) }
			>
				<input
					type="text"
					value={ search }
					className="components-placeholder__input"
					aria-label={ __( 'Member\'s username', 'buddypress' ) }
					placeholder={ __( 'Enter Member\'s username here…', 'buddypress' ) }
					onChange={ ( event ) => this.searchUsername( event.target.value ) }
				/>
				{ 0 !== members.length &&
					<Popover
						className="components-autocomplete__popover"
						focusOnMount={ false }
						position="bottom left"
					>
						<div className="components-autocomplete__results">
							{ membersList }
						</div>
					</Popover>
				}
			</Placeholder>
		);
	}
}

registerBlockType( 'bp/member', {
	title: __( 'Member', 'buddypress' ),

	description: __( 'BuddyPress Member.', 'buddypress' ),

	icon: 'admin-users',

	category: 'buddypress',

	attributes: {
		memberID: {
			type: 'integer',
			default: 0,
		}
	},

	edit: function( { attributes, setAttributes } ) {
		if ( ! attributes.memberID ) {
			return (
				<MemberPlaceholder onSelectMember={ setAttributes } />
			);
		}

		return (
			<Disabled>
				<ServerSideRender block="bp/member" attributes={ attributes } />
			</Disabled>
		)
	},

	save: function() {
		return null;
	}
} );
