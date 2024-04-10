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
