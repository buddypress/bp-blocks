let buttonClicked;

const getActivityBlockEditorMessage = ( event ) => {
	const feedback = event.data && event.data.message ? event.data : null;

	if ( feedback ) {
		buttonClicked.innerHTML = feedback.message;
		buttonClicked.setAttribute( 'href', feedback.link );
		buttonClicked.classList.remove( 'thickbox' );
	}

	if ( 'function' === typeof window.tb_remove ) {
		window.tb_remove();
	}
};
window.addEventListener( 'message', getActivityBlockEditorMessage, false );

document.querySelectorAll( '.bp-block-activity-share a.thickbox' ).forEach( ( a ) => {
	a.addEventListener( 'click', () => {
		buttonClicked = a;
	} );
} );
