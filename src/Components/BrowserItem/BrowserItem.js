/*
 * BrowserItem.js
 * 
 * Description: This file contains the BrowserItem component, which renders a single item in a browser list.
 * 
 * Dependencies: 
 * - React (https://reactjs.org/)
 * - Material-UI (https://mui.com/)
 * - PhotoUser component (../../shared/Components/PhotoUser/PhotoUser)
 * 
 * Props:
 * - browser: Object containing browser information (id, user_photo, name, username, time, text_browser, icon_browser)
 * - owner: Boolean indicating if the user is the owner of the browser item
 * 
 * Usage:
 * import BrowserItem from './BrowserItem';
 * <BrowserItem browser={browserData} owner={true} />
 */
 
import PhotoUser from '../../shared/Components/PhotoUser/PhotoUser'
import PersonIcon from '@mui/icons-material/Person'

import './BrowserItem.scss'

const BrowserItem = ({
	browser: {
		id,
		user_photo,
		name,
		username,
		time,
		text_browser,
		icon_browser
	},
	owner
}) => {
	return (
		<div className="browser__container">
			<div className="browser__container-icon">
				<img src="https://icones.pro/wp-content/uploads/2021/04/icone-cloche-browser-jaune.png" style={{ width: '30px', height: '30px' }}/>
			</div>
			<div className="browser__container-content">
				<div className="browser__container-photo">
					<PhotoUser url={user_photo} size='32'/>
				</div>
				<div className="content__text">
					<span>{name}</span>{text_browser}
				</div>
			</div>
		</div>
	)
}

export default BrowserItem
