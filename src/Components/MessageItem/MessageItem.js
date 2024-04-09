import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhotoUser from '../../shared/Components/PhotoUser/PhotoUser'
import './MessageItem.scss'
import MichealAvatar from './michaelAvatar.png'

const MessageItem = () => {
	const { userID } = useParams()
	const [friendsMessages, setFriendsMessages] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		let isMounted = true
		const fetchFriendsAndMessages = async () => {
			if (!isMounted) return
			try {
				const friendsResponse = await fetch(`http://localhost:3001/friends/${userID}`)
				if (!friendsResponse.ok) throw new Error('Failed to fetch friends')
				const friendsData = await friendsResponse.json()

				const messagesPromises = friendsData.map(async (friend) => {
					const messagesResponse = await fetch(`http://localhost:3001/message/${userID}/${friend.userID}`)
					if (!messagesResponse.ok) throw new Error('Failed to fetch messages')
					const messagesData = await messagesResponse.json()

					// Assuming messagesData is an array of messages, find the newest
					const newestMessage = messagesData.reduce((latest, current) => 
						new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current, messagesData[0])
						
					//console.log(newestMessage)
					return {
						friendId: friend.userID,
						message: {
							//id: newestMessage.receiver,
							post: {
								user_photo: MichealAvatar, // This is a simplification
								name: '@' + friend.userID,
								username: friend.username,
								time: new Date(newestMessage.timestamp).toLocaleTimeString(),
								text: newestMessage.text
							}
						}
					}
				})
				//console.log(messagesPromises)

				// Wait for all the message fetches to complete
				const friendsMessages = await Promise.all(messagesPromises)
				if (isMounted) setFriendsMessages(friendsMessages)
			} catch (error) {
				console.error('Error fetching friends or messages:', error)
				// Handle error state as needed
			}
		}

		fetchFriendsAndMessages()
		// Set up polling with setInterval
		const intervalId = setInterval(fetchFriendsAndMessages, 2000)

		// Clear interval on component unmount
		return () => {
			isMounted = false // Indicate component is unmounted
			clearInterval(intervalId)
		}
	}, [userID]) // Refetch when userID changes

	const handleClick = (messageId, friendId) => {
		navigate(`/message/${userID}/${friendId}`)
	}

	// Render loading state or messages
	if (!friendsMessages.length) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{friendsMessages.map(({ friendId, message }) => (
				<div key={friendId} className="Message__container" onClick={() => handleClick(message.id, friendId)}>
					<div className="Message__container-photo">
						<PhotoUser url={message.post.user_photo}/>
					</div>
					<div className="Message__container-content">
						<div className="content__head">
							<div className="content__head-data">
								<div>
									<span className="head__data-name">{message.post.name}</span>
									<span className="head__data-username">{message.post.username}</span>
								</div>
								<span className="head__data-time">{message.post.time}</span>
							</div>
						</div>
						<div className="content__text">
							{message.post.text}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default MessageItem