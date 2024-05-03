/**
 * NavMessage.js
 *
 * Description: This file contains the NavMessage component, which displays the navigation bar and search functionality for messages.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * Example Usage:
 * <NavMessage />
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