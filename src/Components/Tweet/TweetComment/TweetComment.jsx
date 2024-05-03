/**
 * TweetComment.js
 *
 * Description: This JavaScript file defines the TweetComment component, which represents a single tweet with options for commenting, retweeting, liking, and sharing.
 * Dependencies:
 * - useContext: React hook for accessing context in functional components.
 * - AppContext: Context object for the entire application.
 * - useIsMyTweet: Custom hook for checking if the tweet belongs to the current user.
 * - TweetDataComment: Component for rendering tweet data and comments.
 * - ChatBubbleOutlineOutlinedIcon: Material-UI icon for chat bubble outline.
 * - AutorenewOutlinedIcon: Material-UI icon for autorenew outline.
 * - FavoriteBorderOutlinedIcon: Material-UI icon for favorite border outline.
 * - IosShareOutlinedIcon: Material-UI icon for iOS share outline.
 * - BarChartOutlinedIcon: Material-UI icon for bar chart outline.
 * 
 * Example Usage:
 * import TweetComment from './TweetComment';
 * 
 * Note: Ensure that this component is imported and used appropriately within your React application.
 */

import { useContext } from 'react'

import { AppContext } from '../../../Context/AppContext'

import useIsMyTweet from '../../../Hooks/useIsMyTweet'

import TweetDataComment from '../TweetData/TweetDataComment'

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'

import '../Tweet.scss'

const TweetComment = ({
	post: {
		username
	},
	post
}) => {
	const appContext = useContext(AppContext)

	return (
		<div className="Tweet__container">
			<TweetDataComment post={post} />
			<div className="content__options">
				<div className="content__option-right">
					<div className="option comments">
						<i>
							<ChatBubbleOutlineOutlinedIcon />
						</i>
						<span>0</span>
					</div>
					<div className="option retweet">
						<i>
							<AutorenewOutlinedIcon />
						</i>
						<span>0</span>
					</div>
					<div className="option like">
						<i>
							<FavoriteBorderOutlinedIcon />
						</i>
						<span>0</span>
					</div>
					<div className="option share">
						<i>
							<IosShareOutlinedIcon />
						</i>
					</div>
					{useIsMyTweet(username, appContext?.user?.username) &&
						<div className="option statistics">
							<i>
								<BarChartOutlinedIcon />
							</i>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default TweetComment
