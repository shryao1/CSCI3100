/**
 * BtnRetweet.js
 *
 * Description: This file contains the BtnRetweet component, which represents a button to retweet a post. It allows users to retweet posts and opens a popup window to compose a new tweet with the retweeted content.
 * 
 * Dependencies: This component depends on React's useContext and useParams hooks from 'react'. It also imports various context providers from '../../../Context', including MenuActiveContext and RetweetContext. Additionally, it imports the disableScroll function from '../../../Hooks/useScroll' and functions getAllPost and newLike from '../../../Services/api'.
 * 
 * Example Usage: 
 *   - Import and use this component in your application to provide users with the ability to retweet posts.
 *   - Pass props like 'content', 'attachment', and 'username' to customize the retweet behavior.
 */

import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'
import { disableScroll } from '../../../Hooks/useScroll'
import { MenuActiveContext } from '../../../Context/menuActive'
import { RetweetContext } from '../../../Context/RetweetContext'
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined'
import useILikeThis from '../../../Hooks/useILikeThis'
import { getAllPost, newLike } from '../../../Services/api'
import NewTweet from '../NewTweet/NewTweet'

const BtnRetweet = ({content, attachment, username}) => {
	const menuContext = useContext(MenuActiveContext)
	const retweetContext = useContext(RetweetContext)
	const appContext = useContext(AppContext)
	const { userID } = useParams()
	const handleRetweet = async (e) => {
		e.preventDefault()
		// Implement your retweet logic here
		// For example, make an API call to retweet a post
		console.log('Retweeting post for user:', userID)
		menuContext?.setPopUp(false)
	}

	const OpenPopUp = () => {
		menuContext?.setPopUp(true)
		retweetContext?.setText(`@${username} ${content}`)
		retweetContext?.setThereIsText(true)
		retweetContext?.setAttachment(attachment)
		retweetContext?.setThereIsAttachment(!(attachment===null))
	}



	return (
		<div className="BtnRetweet__container">
			<div className="option retweet" onClick={OpenPopUp}>
				<i><IosShareOutlinedIcon/></i>
			</div>
		</div>

	)
}

export default BtnRetweet
