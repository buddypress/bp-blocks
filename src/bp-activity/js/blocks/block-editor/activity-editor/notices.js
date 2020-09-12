/**
 * WordPress dependencies.
 */
const {
	element: {
		Fragment,
	},
	data: {
		useSelect,
		useDispatch,
	},
	components: {
		SnackbarList,
		NoticeList,
	},
} = wp;

/**
 * External dependencies.
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
		<Fragment>
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
		</Fragment>
	);
}
