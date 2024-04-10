import './TweetPost.scss'
import { AppContext } from '../../../Context/AppContext'
import React, { useState, useEffect } from 'react'

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import useIsMyTweet from '../../../Hooks/useIsMyTweet'

import BtnLike from '../../../shared/Components/BtnLike/BtnLike'
import BtnDislike from '../../../shared/Components/BtnDislike/BtnDislike'
import TweetData from '../TweetData/TweetData'

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined'
import '../Tweet.scss'

const TweetPost = ({
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
	},
	post,
}) => {
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const [showComments, setShowComments] = useState(false) // State to toggle comment visibility

	useEffect(() => {
		fetch(`http://localhost:3001/getcomments/${postID}`)
			.then(response => response.json())
			.then(data => setComments(data))
	}, [postID])

	const sendComment = () => {
		const commentData = { postID, content: comment, timestamp: new Date().toISOString() }
		const CommenterID = localStorage.getItem('userTwitterClone')
		fetch(`http://localhost:3001/sendcomment/${CommenterID}/${postID}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(commentData),
		})
			.then(response => response.json())
			.then(data => {
				setComments(prev => [...prev, data])
				setComment('')
			})
	}
	
	const uint8ArrayToBase64 = (uint8Array) => {
		let binary = ''
		uint8Array.forEach((byte) => {
			binary += String.fromCharCode(byte)
		})
		return btoa(binary)
	}

	return (
		<div className="Tweet__container" style={{ marginBottom: '10px' }}>
			<TweetData post={post} />
			<div className="tweet__content" style={{marginLeft : '50px'}}>{content}</div>
			<br></br>
			{attachment && (
				<div className="tweet__attachment">
					<img src={`data:image/jpg;base64,${uint8ArrayToBase64(new Uint8Array(attachment.data.data))}`} alt={attachment.filename} style={{maxWidth: '100%', // Ensure the image doesn't exceed the container's width
    					height: 'auto',   // Allow the height to adjust proportionally
    					width: '90%',    // Take up the full width of its container
    					marginLeft: '35px'}}/>
				</div>
			)}
			<div className="content__options">
				<div className="content__option-right">
					<div className="option comments" onClick={() => setShowComments(!showComments)} >
						<i>
							<ChatBubbleOutlineOutlinedIcon />
						</i>
					</div>
					<BtnLike likes={like} id={postID} showDetail />
					<BtnDislike dislikes={dislike} id={postID} showDetail />
					<div className="option share" onClick={() => setShowComments(!showComments)} >
						<i>
							<IosShareOutlinedIcon />
						</i>
					</div>
				</div>
			</div>
			{showComments && ( // This part will now toggle based on `showComments` state
				<div className="tweet__comments">
					<input
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Write a comment..."
						style={{
							position: 'relative', // or any other position you desire
							borderRadius: '15px', // or any other value for border-radius
							// Add any other styles you want here
						}}
					/>
					<button style={{borderRadius: '12px'}}
						onClick={sendComment}>Send</button>
					{comments.map((comment, index) => (
						<div key={index} className="tweet__comment">
							{comment.content}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default TweetPost
