/**
 * WordPress dependencies
 */
const {
	url: {
		addQueryArgs,
	},
	i18n: {
		__,
		_n,
		sprintf,
	},
} = wp;

/**
 * External dependencies.
 */
const {
	template,
} = lodash;

/**
 * Front-end Dynamic Groups block class.
 */
 class bpDynamicGroupsBlock {
	constructor( settings, blocks ) {
		const { path, root, nonce } = settings;
		this.path = path;
		this.root = root;
		this.nonce = nonce,
		this.blocks = blocks;

		this.blocks.forEach( ( block, i ) => {
			const { type } = block.query_args || 'active';
			const { body } = block.preloaded || [];

			this.blocks[ i ].groups = {
				'active': [],
				'newest': [],
				'popular': [],
				'alphabetical': [],
			}

			if ( ! this.blocks[ i ].groups[ type ].length && body && body.length ) {
				this.blocks[ i ].groups[ type ] = body;
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

	loop( groups = [], container = '', type = 'active' ) {
		const tmpl = this.useTemplate( 'bp-dynamic-groups-item' );
		const selector = document.querySelector( '#' + container );
		let output = '';

		if ( groups && groups.length ) {
			groups.forEach( ( group ) => {
				if ( 'newest' === type && group.created_since ) {
					/* translators: %s is time elapsed since the group was created */
					group.extra = sprintf( __( 'Created %s', 'buddypress' ), group.created_since );
				} else if ( 'popular' === type && group.total_member_count ) {
					group.extra = sprintf(
						/* translators: %s is the number of Group members */
						_n( '%s member', '%s members', group.total_member_count, 'buddypress' ),
						group.total_member_count
					);
				} else {
					/* translators: %s is time elapsed since the last activity happened */
					group.extra = sprintf( __( 'Active %s', 'buddypress' ), group.last_activity_diff );
				}

				output += tmpl( group );
			} );
		} else {
			output = '<div class="widget-error">' + __( 'There are no groups to display.', 'buddypress' ) + '</div>';
		}

		selector.innerHTML = output;
	}

	getGroups( type = 'active', blockIndex = 0 ) {
		this.blocks[ blockIndex ].query_args.type = type;

		if ( this.blocks[ blockIndex ].groups[ type ].length ) {
			this.loop( this.blocks[ blockIndex ].groups[ type ], this.blocks[ blockIndex ].selector, type );
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
					this.blocks[ blockIndex ].groups[ type ] = data;
					this.loop( this.blocks[ blockIndex ].groups[ type ], this.blocks[ blockIndex ].selector, type );
				}
			);
		}
	}

	start() {
		this.blocks.forEach( ( block, i ) => {
			const { selector } = block;
			const { type } = block.query_args;
			const list = document.querySelector( '#' + selector ).closest( '.bp-dynamic-block-container' );

			// Get default Block's type groups.
			this.getGroups( type, i );

			// Listen to Block's Nav item clics
			list.querySelectorAll( '.item-options a' ).forEach( ( navItem ) => {
				navItem.addEventListener( 'click', ( event ) => {
					event.preventDefault();

					// Changes the displayed filter.
					event.target.closest( '.item-options' ).querySelector( '.selected' ).classList.remove( 'selected' );
					event.target.classList.add( 'selected' );

					const newType = event.target.getAttribute( 'data-bp-sort' );

					if ( newType !== this.blocks[ i ].query_args.type ) {
						this.getGroups( newType, i );
					}
				} );
			} );
		} );
	}
}

const settings = window.bpDynamicGroupsSettings || {};
const blocks = window.bpDynamicGroupsBlocks || [];
const bpDynamicGroups = new bpDynamicGroupsBlock( settings, blocks );

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', bpDynamicGroups.start() );
} else {
	bpDynamicGroups.start();
}
