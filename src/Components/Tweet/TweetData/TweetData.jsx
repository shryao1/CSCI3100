import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ListOptions } from './ListOptions'

import SettingsMenu from '../../../shared/Components/SettingsMenu/SettingsMenu'
const TweetData = ({
	post: {
		username,
		postID,
		content,
		attachment, 
		userID, 
		like, 
		dislike, 
		visible, 
		post_time,
		avatar,
	},
	owner = localStorage.getItem('userTwitterClone')
}) => {
	const [userInfo, setUserInfo] = useState(null)
	
	// console.log('WZXWZXWZX', localStorage.getItem('userTwitterClone'))
	// console.log(localStorage.getItem('userTwitterClone'))
	//console.log('!!!!!!!',{owner})
	//console.log('???????',{userID})
	const navigate = useNavigate()
	const [showMenu, setShowMenu] = useState(false)
	useEffect(() => {
		fetch(`http://localhost:3001/userinfo/${postID}`) // Notice the use of backticks (`) here
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => {
				setUserInfo(data)
				console.log('here is test',data)
			})
			.catch((error) => {
				console.error('Error fetching user data:', error)
			})
	}, [postID])
	//const usernameElement = userInfo ? <span className="nav__data-username">{userInfo.username}</span> : null
	//console.log('usernameElement', userInfo.avatar.data.data)
	const handleShowMenuTweet = (target) => {
		if (target) {
			setShowMenu(true)
		} else {
			setShowMenu(false)
		}
	}
	//console.log('useravatar', userInfo.avatar)
	const name = userInfo ? userInfo.username : null
	const uint8ArrayToBase64 = (uint8Array) => {
		let binary = ''
		uint8Array.forEach((byte) => {
			binary += String.fromCharCode(byte)
		})
		return btoa(binary)
	}
	
	return (
		<div className="tweet__linkContainer" > 
			<div className="tweet__ID">{'Post #'}{postID}</div>
			<Link to={`/profile/${owner}/${userID}`} className="tweet__linkContent link">
				<div className="tweet__container-tweetData" >
					{userInfo && (
    						<img
        					src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(userInfo.avatar.data))}`}
        					alt="User.Avatar"
							style={{ width: '48px', height: '48px' }}
    						/>
					)}
					<div className="tweet__container-photo" >
						
					</div>
					<div className="tweet__container-content">
						<div className="content__nav">
							<div className="content__nav-data">
								{<span className="nav__data-name">{name}</span> }
								{}
							</div>
						</div>
						{/* <div className="content__text">
							{content}
						</div> */}
					</div>
				</div>
			</Link>
			<div className="content__nav-settings">
				<SettingsMenu
					username={username}
					// id={`${id ? id : _id}`}
					listOptions={ListOptions}
					showMenu={showMenu}
					handleShowMenu={handleShowMenuTweet}
				/>
			</div>
		</div>
	)
}

export default TweetData