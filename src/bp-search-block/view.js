/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependency.
 */
import './view-style.scss';

/**
 * Sets the Search label for attribute and updates the search input's
 * placeholder according to the checked radio control.
 *
 * @since 1.0.0
 */
class BPSearchForm {
	constructor() {
		this.controls  = document.querySelectorAll( '.wp-block-bp-search-form' );
		this.increment = 0;
	}

	setForHtml() {
		this.controls.forEach( ( element ) => {
			const hasLabel = element.querySelector( '.bp-search-label' );

			if ( !! hasLabel ) {
				this.increment +=1;
				const uniqId = 'bp-search-terms-' + this.increment;

				element.querySelector( '[name="search-terms"]' ).setAttribute( 'id', uniqId );
				element.querySelector( '.bp-search-label' ).setAttribute( 'for', uniqId );
			}
		} );
	}

	setRadioListeners() {
		this.controls.forEach( ( element ) => {
			const searchTermsInput = element.querySelector( '[name="search-terms"]' );

			element.querySelectorAll( '[name="search-which"]' ).forEach( ( radio ) => {
				radio.addEventListener( 'click', ( event ) => {
					if ( true === event.target.checked ) {
						searchTermsInput.setAttribute( 'placeholder', event.target.dataset.placeholder );
					}
				} );
			} );
		} );
	}

	start() {
		this.setForHtml();
		this.setRadioListeners();
	}
}

domReady( () => {
	if ( ! document.querySelector( 'body' ).classList.contains( 'wp-admin' ) ) {
		const bpSearchForm = new BPSearchForm();

		bpSearchForm.start();
	}
} );
