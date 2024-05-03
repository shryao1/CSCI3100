/**
 * SettingsMenuGear.jsx
 *
 * Description: This file contains the SettingsMenuGear component, which displays a gear icon for settings menu.
 */


import './SettingsMenuGear.scss'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const SettingsMenuGear = () => {
	return (
		<div className="settingsMenuGear__container">
			<div>
				<SettingsOutlinedIcon />
			</div>
		</div>
	)
}

export default SettingsMenuGear