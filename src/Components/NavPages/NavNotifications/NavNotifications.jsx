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