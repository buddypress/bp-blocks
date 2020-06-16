/**
 * WordPress dependencies
 */
const { useSelect, useDispatch } = wp.data;
const { SnackbarList, NoticeList } = wp.components;

/**
 * External dependencies
 */
const { filter } = lodash;

export default function Notices() {
	const notices = useSelect( ( select ) => {
		return select( 'core/notices' ).getNotices();
	}, [] );
	const { removeNotice } = useDispatch( 'core/notices' );
	const dismissibleNotices = filter( notices, {
		isDismissible: true,
		type: 'default',
	} );
	const snackbarNotices = filter( notices, {
		type: 'snackbar',
	} );

	return (
		<>
			<NoticeList
				notices={ dismissibleNotices }
				className="activity-editor-dismissible-notices"
				onRemove={ removeNotice }
			/>

			<SnackbarList
				notices={ snackbarNotices }
				className="activity-editor-snackbar-notices"
				onRemove={ removeNotice }
			/>
		</>
	);
}
