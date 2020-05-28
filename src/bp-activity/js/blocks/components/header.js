/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export default function Header() {
	return (
		<div
			className="activity-editor-header"
			role="region"
			aria-label={ __( 'Activity Editor top bar.', 'buddypress' ) }
			tabIndex="-1"
		>
			<h1 className="activity-editor-header__title">
				{ __( 'Activity Block Editor', 'buddypress' ) }
			</h1>
		</div>
	);
}
