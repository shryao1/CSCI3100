import Menu from '../Menus/Menu/Menu'
import MenuDown from '../Menus/MenuDown/MenuDown'
import InsideMessage from '../InsideMessage/InsideMessage'
import Michael from './michaelAvatar.png'

import { MessageProvider } from '../../Context/contextMessage'

import './LayoutMessage.scss'

const messages = [
	{
		'id': '1',
		'user_photo': Michael,
		'name': 'Mic',
		'username': '@Mic',
		'time': '10m',
		'text': 'Hello coupon',
		'chat': {
			'bio': 'I would like to offer you a coupon',
			'following': 100,
			'followers': 12,
			'messages': [
				{
					'username': '@Mic',
					'text': 'Hello coupon',
					'sendTime': '11:00AM',
				},
				{
					'username': '@Mic',
					'text': 'Good job Group E4',
					'sendTime': '11:02AM',
				}
			]
		}
	},

	{
		'id': '2',
		'user_photo': Michael,
		'name': 'hael',
		'username': '@hael',
		'time': '11m',
		'text': 'Hello World',
		'chat': {
			'bio': 'Hello Twitter',
			'following': 200,
			'followers': 1,
			'messages': [
				{
					'username': '@hael',
					'text': 'Hello World',
					'sendTime': '11:05AM',
				}
			]
		}
	}
]

const LayoutMessage = ({ children }) => {
	return (
		<div className="LayoutMessage__container">
			<div className="containerMessage__content">
				<div className="container__menu">
					<Menu />
				</div>
				<div className="content__main">
					<MessageProvider value={{ userMessage: messages }}>
						<section className="Content__page">
							{children}
						</section>
						<div className="content__insideMessage">
							<InsideMessage />
						</div>
					</MessageProvider>
				</div>
				<div className="container__MenuDown">
					<MenuDown/>
				</div>
			</div>
		</div>
	)
}

export default LayoutMessage
