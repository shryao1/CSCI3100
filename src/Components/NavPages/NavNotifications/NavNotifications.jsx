/**
 * NavNotifications.js
 *
 * Description: This JavaScript file defines the NavNotifications component, which represents the navigation bar for notifications.
 * Dependencies:
 * - SettingsMenuGear: Component for displaying a settings menu gear icon.
 * - PhotoUser: Component for displaying user photos.
 * - NavNotificationsListOption: Component for rendering options in the notifications list.
 * - NavNotifications.scss: SCSS file containing styling for the NavNotifications component.
 * 
 * Example Usage:
 * import NavNotifications from './NavNotifications';
 * 
 */

import SettingsMenuGear from '../../../shared/Components/SettingsMenuGear/SettingsMenuGear'
import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import { NavNotificationsMenuListOptions } from './NavNotificationsListOption'

import './NavNotifications.scss'

const NavNotifications = () => {
	return (
		<div className="container__NavNotification">
			<section className="header__NavNotification">
				<h2 className="notificationTitle">Notifications</h2>
				<div className="settings">
					<i>
						<SettingsMenuGear />
					</i>
				</div>
			</section>
		</div>
	)
}

export default NavNotifications