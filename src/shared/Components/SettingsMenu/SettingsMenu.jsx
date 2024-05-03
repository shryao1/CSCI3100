/**
 * handleShowMenu.jsx
 *
 * Description: This file contains the handleShowMenu function, which handles showing the settings menu.
 * 
 * @param {Object} props - The properties passed to the function.
 * @param {string} props.id - The ID of the menu item.
 * @param {string} props.username - The username associated with the menu item.
 * @param {Array} props.listOptions - The list of options for the menu.
 * @param {boolean} props.showMenu - Flag indicating whether the menu is currently being shown.
 * @param {Function} props.handleShowMenu - The function to handle showing the menu.
 * 
 * @returns {JSX.Element} The rendered settings menu component.
 * 
 * Example Usage:
 * <handleShowMenu id="1" username="exampleUser" listOptions={[{ icon: <Icon />, url: "example.com", action: () => {}, label: "Example Label" }]} showMenu={true} handleShowMenu={() => {}} />
 */

import SettingItem from './SettingItem'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import './SettingsMenu.scss'


const handleShowMenu = ({
	id,
	username,
	listOptions,
	showMenu,
	handleShowMenu
}) => {

	return (
		<div className="settingsMenu__container">
			<div className="settings" onClick={() => handleShowMenu(true)}>
				<i>
					<DeleteForeverOutlinedIcon />
				</i>
			</div>
		</div>
	)
}

export default handleShowMenu
