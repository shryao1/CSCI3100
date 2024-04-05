import NavNotifications from '../../Components/NavPages/NavNotifications/NavNotifications'
import NotificationItem from '../../Components/NotificationItem/NotificationItem'
import { useParams } from 'react-router-dom'

import './Notifications.scss'

const user = {
	'user_photo': 'https://sse.sysu.edu.cn/sites/sse.prod.dpcms4.sysu.edu.cn/files/styles/image_style_2/public/lyu.jpg?itok=2d4pP5Gw',
	'image_background': 'https://www.xtrafondos.com/wallpapers/vertical/noche-en-las-montanas-con-planetas-de-fondo-7980.jpg',
	'name': 'User Name Logged',
	'username': '@username',
	'description': 'user description biography',
	'joined_date': 'May 2019',
	'count_tweets': 33,
	'following': 49,
	'followers': 8,
	'notifications': [
		{
			'id': '1',
			'user_photo': 'https://sse.sysu.edu.cn/sites/sse.prod.dpcms4.sysu.edu.cn/files/styles/image_style_2/public/lyu.jpg?itok=2d4pP5Gw',
			'name': 'Working Michael',
			'username': '@wkmc',
			'time': '10m',
			'text_notification': ' Liked your Post @3100',
			'icon_notification': 'https://icones.pro/wp-content/uploads/2021/04/icone-noire-jaune.png'
		},
		{
			'id': '2',
			'user_photo': 'https://static.aminer.cn/upload/avatar/2014/1150/392/53f48d40dabfaea7cd1d1cba.jpeg',
			'name': 'Irwin King',
			'username': '@IrK',
			'time': '10m',
			'text_notification': ' becomes your New Follower!',
			'icon_notification': undefined
		},
		{
			'id': '3',
			'user_photo': 'https://proj.cse.cuhk.edu.hk/csci3100/assets/img/yxwan.jpg',
			'name': 'TA Yuxuan',
			'username': '@Yuxuan',
			'time': '10m',
			'text_notification': ' Commented your Post @1234',
			'icon_notification': undefined
		}
	]
}

const Notifications = () => {
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path

	return (
		<div className="notifications__container">
			<NavNotifications />
			<div className="notificationItem__notificationsList">
				{user?.notifications?.map((notification, id) => {
					return <NotificationItem key={id} notification={notification} owner={user.username === notification.username} />
				})}
			</div>
		</div>
	)
}

export default Notifications