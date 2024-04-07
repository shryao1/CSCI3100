import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ListOptions } from './ListOptions'

import ImagePosted from '../../../shared/Components/ImagePosted/ImagePosted'
import SettingsMenu from '../../../shared/Components/SettingsMenu/SettingsMenu'
import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'

import useGetPostTime from '../../../Hooks/useGetPostTime'

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
	}
}) => {

	const [showMenu, setShowMenu] = useState(false)

	const handleShowMenuTweet = (target) => {
		if (target) {
			setShowMenu(true)
		} else {
			setShowMenu(false)
		}
	}

	return (
		<div className="tweet__linkContainer">
			<div className="tweet__ID">{'Post #'}{postID}</div>
			<Link to={`/${userID}/status/${userID}`} className="tweet__linkContent link">
				<div className="tweet__container-tweetData" >
					<div className="tweet__container-photo">
						{/* <PhotoUser url={avatar} /> */}
					</div>
					<div className="tweet__container-content">
						<div className="content__nav">
							<div className="content__nav-data">
								{/* <span className="nav__data-name">{nameUser}</span> */}
								<span className="nav__data-username">{username}</span>
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