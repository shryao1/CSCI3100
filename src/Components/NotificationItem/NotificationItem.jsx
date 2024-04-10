import PhotoUser from '../../shared/Components/PhotoUser/PhotoUser'
import PersonIcon from '@mui/icons-material/Person'

import './NotificationItem.scss'

const uint8ArrayToBase64 = (uint8Array) => {
	let binary = ''
	uint8Array.forEach((byte) => {
		binary += String.fromCharCode(byte)
	})
	return btoa(binary)
}
const NotificationItem = ({
	notification: {
		id,
		user_photo,
		name,
		username,
		time,
		text_notification,
		icon_notification
	},
	owner
	
}) => {
	const photoSrc = uint8ArrayToBase64(new Uint8Array(user_photo.data))

	return (
		<div className="notification__container">
			<div className="notification__container-icon">
				<img src="https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-jaune.png" style={{ width: '30px', height: '30px' }}/>
			</div>
			<div className="notification__container-content">
				<div className="notification__container-photo">
					<img
        			src={`data:image/jpeg;base64,${photoSrc}`}
        			alt="User.Avatar"
						style={{ width: '48px', height: '48px' }}
    				/>
				</div>
				<div className="content__text">
					<span>{name}</span>{text_notification}
				</div>
			</div>
		</div>
	)
}

export default NotificationItem
