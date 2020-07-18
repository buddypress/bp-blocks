let buttonClicked;

const getActivityBlockEditorMessage = ( event ) => {
	const message = JSON.parse( event.data );
	buttonClicked.innerHTML = message.feedback;
	buttonClicked.setAttribute( 'href', message.link );
	buttonClicked.classList.remove( 'thickbox' );

	if ( 'function' === typeof window.tb_remove ) {
		window.tb_remove();
	}
}
window.addEventListener( 'message', getActivityBlockEditorMessage, false );

document.querySelectorAll( '.bp-block-activity-share a.thickbox' ).forEach( ( a ) => {
	a.addEventListener( 'click', () => {
		buttonClicked = a;
	} );
} );
