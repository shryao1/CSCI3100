/**
 * NavNotificationsItem.jsx
 *
 * Description: This JavaScript file defines the NavNotificationsItem component, which represents an individual item in the notifications navigation.
 * Dependencies: None
 * 
 * Example Usage:
 * import NavNotificationsItem from './NavNotificationsItem';
 * 
 */

import './NavNotificationsItem.scss'

const NavNotificationsItem = ({
	option: {
		label
	}
}) => {
	return (
		<div className="container__navItem">
			<div>
				<span>{label}</span>
			</div>
		</div>
	)
}

export default NavNotificationsItem