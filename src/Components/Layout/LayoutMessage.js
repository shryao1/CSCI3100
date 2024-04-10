import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../Menus/Menu/Menu'
import MenuDown from '../Menus/MenuDown/MenuDown'
import InsideMessage from '../InsideMessage/InsideMessage'
import Michael from './michaelAvatar.png' // Assuming Michael is a default avatar
import { MessageProvider } from '../../Context/contextMessage'
import './LayoutMessage.scss'

const LayoutMessage = ({ children }) => {
	const { userID, chatWithID } = useParams()

	const [userChats, setUserChats] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			if (!isMounted) return
			try {
				// Fetch messages
				const messagesResponse = await fetch(`http://localhost:3001/message/${userID}/${chatWithID}`)
				if (!messagesResponse.ok) throw new Error('Failed to fetch messages')
				const messagesData = await messagesResponse.json()
			
				const userInfoResponse = await fetch(`http://localhost:3001/fetchuserinfo/${userID}/${chatWithID}`)
				if (!userInfoResponse.ok) throw new Error('Failed to fetch user info')
				const userInfoData = await userInfoResponse.json()
				console.log(userInfoData)
				// Process messages for the chatWithID
				const friendMessages = messagesData.filter(msg => msg.sender === chatWithID || msg.receiver === chatWithID)
					.map(msg => ({
						...msg,
						username: msg.sender === userID ? '@You' : '@User', // Since we don't fetch friend data, using a placeholder
						text: msg.text,
						sendTime: new Date(msg.timestamp).toLocaleTimeString(),
						messageClass: msg.sender === userID ? 'userMessage' : 'friendMessage',
					}))

				// Create a single user chat object
				const chat = {
					userID: chatWithID,
					username: userInfoData.user.username, // Placeholder for username since we are not fetching friends
					user_photo: userInfoData.user.avatar, // Assuming a default for simplicity
					chat: {
						bio: 'Please be polite! Happy chatting ^ ^', // Placeholder
						following: userInfoData.user.following.length,
						followers: userInfoData.user.followers.length,
						messages: friendMessages,
					},
				}
	
				if (isMounted) setUserChats([chat]) // Since structure should not change, wrap the single chat object in an array
			
			} catch (error) {
				console.error('Error fetching data:', error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
		// Set up polling with setInterval
		const intervalId = setInterval(fetchData, 2000)

		// Clear interval on component unmount
		return () => {
			isMounted = false // Indicate component is unmounted
			clearInterval(intervalId)
		}
		
	}, [userID, chatWithID]) // Added chatWithID as a dependency

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>
	

	return (
		<div className="LayoutMessage__container">
			<div className="containerMessage__content">
				<div className="container__menu">
					<Menu />
				</div>
				<div className="content__main">
					<MessageProvider value={{ userMessage: userChats }}>
						<section className="Content__page">
							{children}
						</section>
						<div className="content__insideMessage">
							<InsideMessage />
						</div>
					</MessageProvider>
				</div>
				<div className="container__MenuDown">
					<MenuDown />
				</div>
			</div>
		</div>
	)
}

export default LayoutMessage