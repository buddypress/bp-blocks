/**
 * WordPress dependencies
 */
const {
	url: {
		addQueryArgs,
	},
} = wp;

/**
 * External dependencies.
 */
const {
	template,
} = lodash;

/**
 * Front-end Friends block class.
 */
 class bpFriendsBlock {
	constructor( settings, blocks ) {
		const { path, root, nonce, strings } = settings;
		this.path = path;
		this.root = root;
		this.nonce = nonce,
		this.blocks = blocks;
		this.strings = strings;

		this.blocks.forEach( ( block, i ) => {
			const { type } = block.query_args || 'active';
			const { body } = block.preloaded || [];

			this.blocks[ i ].friends = {
				'active': [],
				'newest': [],
				'popular': [],
			}

			if ( ! this.blocks[ i ].friends[ type ].length && body && body.length ) {
				this.blocks[ i ].friends[ type ] = body;
			}
		} );
	}

	useTemplate( tmpl ) {
		const options = {
			evaluate:    /<#([\s\S]+?)#>/g,
			interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape:      /\{\{([^\}]+?)\}\}(?!\})/g,
			variable:    'data'
		};

		return template( document.querySelector( '#tmpl-' + tmpl ).innerHTML, options );
	}

	loop( friends = [], container = '' ) {
		const tmpl = this.useTemplate( 'bp-friends-item' );
		const selector = document.querySelector( '#' + container );
		const { noFriendsFound } = this.strings;
		let output = '';

		if ( friends && friends.length ) {
			friends.forEach( ( friend ) => {
				output += tmpl( friend);
			} );
		} else {
			output = '<div class="widget-error">' + noFriendsFound + '</div>';
		}

		selector.innerHTML = output;
	}

	getFriends( type = 'active', blockIndex = 0 ) {
		this.blocks[ blockIndex ].query_args.type = type;

		if ( this.blocks[ blockIndex ].friends[ type ].length ) {
			this.loop( this.blocks[ blockIndex ].friends[ type ], this.blocks[ blockIndex ].selector );
		} else {
			fetch( addQueryArgs( this.root + this.path, this.blocks[ blockIndex ].query_args ), {
				method: 'GET',
				headers: {
					'X-WP-Nonce' : this.nonce,
				}
			} ).then(
				( response ) => response.json()
			).then(
				( data ) => {
					this.blocks[ blockIndex ].friends[ type ] = data;
					this.loop( this.blocks[ blockIndex ].friends[ type ], this.blocks[ blockIndex ].selector );
				}
			);
		}
	}

	start() {
		this.blocks.forEach( ( block, i ) => {
			const { selector } = block;
			const { type } = block.query_args;
			const list = document.querySelector( '#' + selector ).closest( '.widget_bp_core_friends_widget' );

			// Get default Block's type friends.
			this.getFriends( type, i );

			// Listen to Block's Nav item clics
			list.querySelectorAll( '.item-options a' ).forEach( ( navItem ) => {
				navItem.addEventListener( 'click', ( event ) => {
					event.preventDefault();

					// Changes the displayed filter.
					event.target.closest( '.item-options' ).querySelector( '.selected' ).classList.remove( 'selected' );
					event.target.classList.add( 'selected' );

					const newType = event.target.getAttribute( 'data-bp-sort' );

					if ( newType !== this.blocks[ i ].query_args.type ) {
						this.getFriends( newType, i );
					}
				} );
			} );
		} );
	}
}

const settings = window.bpFriendsSettings || {};
const blocks = window.bpFriendsBlocks || {};
const bpFriends = new bpFriendsBlock( settings, blocks );

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', bpFriends.start() );
} else {
	bpFriends.start();
}
