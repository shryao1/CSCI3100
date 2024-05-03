/**
 * NavMessage.js
 *
 * Description: This JavaScript file defines the NavMessage component, which represents the navigation bar for the messages section.
 * Dependencies:
 * - SettingsIcon: Material-UI icon for settings.
 * - MailOutlineIcon: Material-UI icon for mail outline.
 * - SearchIcon: Material-UI icon for search.
 * - NavMessage.scss: SCSS file containing styling for the NavMessage component.
 * 
 * Example Usage:
 * import NavMessage from './NavMessage';
 * 
 */

import './NavMessage.scss'

import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import SearchIcon from '@mui/icons-material/Search'

const NavMessage = () => {
	return (
		<div className="containerMessage">
			<section className="containerMessage_header">
				<div>
					<h2 className="message_header">Messages</h2>
				</div>
				<div className="containerMessage_icons">
					<div className="icon">
						<i>
							<SettingsIcon />
						</i>
					</div>
					<div className="icon">
						<i>
							<MailOutlineIcon />
						</i>
					</div>
				</div>
			</section>
			<section className="containerMessage_search">
				<div>
					<label><SearchIcon /></label>
					<input type="text" placeholder="Search for people and groups"></input>
				</div>
			</section>
		</div>
	)
}

export default NavMessage