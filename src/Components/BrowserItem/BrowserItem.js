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
