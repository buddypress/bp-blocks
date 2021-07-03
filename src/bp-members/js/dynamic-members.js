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
 * Front-end Dynamic Members block class.
 */
 class bpDynamicMembersBlock {
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

			this.blocks[ i ].members = {
				'active': [],
				'newest': [],
				'popular': [],
			}

			if ( ! this.blocks[ i ].members[ type ].length && body && body.length ) {
				this.blocks[ i ].members[ type ] = body;
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

	loop( members = [], container = '' ) {
		const tmpl = this.useTemplate( 'bp-dynamic-members-item' );
		const selector = document.querySelector( '#' + container );
		const { noMembersFound } = this.strings;
		let output = '';

		if ( members && members.length ) {
			members.forEach( ( member ) => {
				output += tmpl( member);
			} );
		} else {
			output = '<div class="widget-error">' + noMembersFound + '</div>';
		}

		selector.innerHTML = output;
	}

	getMembers( type = 'active', blockIndex = 0 ) {
		this.blocks[ blockIndex ].query_args.type = type;

		if ( this.blocks[ blockIndex ].members[ type ].length ) {
			this.loop( this.blocks[ blockIndex ].members[ type ], this.blocks[ blockIndex ].selector );
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
					this.blocks[ blockIndex ].members[ type ] = data;
					this.loop( this.blocks[ blockIndex ].members[ type ], this.blocks[ blockIndex ].selector );
				}
			);
		}
	}

	start() {
		this.blocks.forEach( ( block, i ) => {
			const { selector } = block;
			const { type } = block.query_args;
			const list = document.querySelector( '#' + selector ).closest( '.bp-dynamic-block-container' );

			// Get default Block's type members.
			this.getMembers( type, i );

			// Listen to Block's Nav item clics
			list.querySelectorAll( '.item-options a' ).forEach( ( navItem ) => {
				navItem.addEventListener( 'click', ( event ) => {
					event.preventDefault();

					// Changes the displayed filter.
					event.target.closest( '.item-options' ).querySelector( '.selected' ).classList.remove( 'selected' );
					event.target.classList.add( 'selected' );

					const newType = event.target.getAttribute( 'data-bp-sort' );

					if ( newType !== this.blocks[ i ].query_args.type ) {
						this.getMembers( newType, i );
					}
				} );
			} );
		} );
	}
}

const settings = window.bpDynamicMembersSettings || {};
const blocks = window.bpDynamicMembersBlocks || {};
const bpDynamicMembers = new bpDynamicMembersBlock( settings, blocks );

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', bpDynamicMembers.start() );
} else {
	bpDynamicMembers.start();
}
