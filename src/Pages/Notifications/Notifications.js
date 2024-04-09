import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavNotifications from '../../Components/NavPages/NavNotifications/NavNotifications'
import NotificationItem from '../../Components/NotificationItem/NotificationItem'
import './Notifications.scss'

const Notifications = () => {
	const { userID } = useParams() // Use the passed-in userID parameter from the search path
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await fetch(`http://localhost:3001/notifications/${userID}`)
				if (!response.ok) throw new Error('Failed to fetch notifications')
				let data = await response.json()
				// Fetch usernames for each notification
				const notificationsWithUsernames = await Promise.all(data.map(async (notification) => {
					const userResponse = await fetch(`http://localhost:3001/user/username/${notification.sender}`)
					if (!userResponse.ok) {
						throw new Error('Failed to fetch username')
					}
					const userData = await userResponse.json()
					return {
						...notification,
						username: userData.username, // Assuming the backend endpoint returns { username: '...' }
					}
				}))
				console.log(notificationsWithUsernames)
				setNotifications(notificationsWithUsernames)
			} catch (error) {
				console.error('Error fetching notifications:', error)
			}
		}

		fetchNotifications()
	}, [userID])

	return (
		<div className="notifications__container">
			<NavNotifications />
			<div className="notificationItem__notificationsList">
				{notifications.map((notification, index) => {
					return (
						<NotificationItem
							key={index}
							notification={{
								...notification,
								text_notification: notification.content,
								name: '@' + notification.sender + '  ' + notification.username + '  ', // Assuming sender is the name, adjust if it's an ID
								// username: notification.username, // Prefix with '@', adjust according to your data
								// You may need to adjust icon_notification based on your logic or add it in your fetch
							}}
							owner={userID === notification.receiver}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Notifications