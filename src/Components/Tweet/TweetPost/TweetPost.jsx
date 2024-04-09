import './TweetPost.scss'
import { AppContext } from '../../../Context/AppContext'

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
			<div className="tweet__content" style = {{marginLeft : '50px'}}>{content}</div>
			<br></br>
			{attachment && (
				<div className="tweet__attachment">
					{/* Assuming attachment is an image */}
					<img src={`data:image/jpg;base64,${uint8ArrayToBase64(new Uint8Array(attachment.data.data))}`} alt={attachment.filename} style={{ 
    					maxWidth: '80%', // Ensure the image doesn't exceed the container's width
    					height: 'auto',   // Allow the height to adjust proportionally
    					width: '100%',    // Take up the full width of its container
    					marginLeft: '50px' // Optional, adjust as needed
  							}}/>
				</div>
			)}
			<div className="content__options">
				<div className="content__option-right">
					<div className="option comments" onClick={() => console.log('click comments')} >
						<i>
							<ChatBubbleOutlineOutlinedIcon />
						</i>
					</div>
					<BtnLike
						likes={like}
						id={postID}
						showDetail
					/>
					<BtnDislike
						dislikes={dislike}
						id={postID}
						showDetail
					/>
					<div className="option share" onClick={() => console.log('click share')} >
						<i>
							<IosShareOutlinedIcon />
						</i>
					</div>
					{/* {useIsMyTweet(username, appContext?.user?.username) &&
						<div className="option statistics" onClick={() => console.log('click statistics')} >
							<i>
								<BarChartOutlinedIcon />
							</i>
						</div>
					} */}
				</div>
			</div>
		</div>
	)
}

export default TweetPost
