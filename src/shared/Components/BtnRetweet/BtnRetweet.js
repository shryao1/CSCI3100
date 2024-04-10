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
