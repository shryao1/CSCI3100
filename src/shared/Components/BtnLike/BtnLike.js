/**
 * BtnLike.js
 *
 * Description: This file contains the BtnLike component, which represents a button to like a post. It allows users to like posts and updates the UI accordingly.
 * 
 * Dependencies: This component depends on React's useContext and useParams hooks from 'react'. It also imports useILikeThis hook from '../../../Hooks/useILikeThis' and functions getAllPost and newLike from '../../../Services/api'.
 * 
 * Example Usage: 
 *   - Import and use this component in your application to provide users with the ability to like posts.
 *   - Pass props like 'likes', 'id', and 'showDetail' to customize the behavior and appearance of the button.
 */

import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'

import useILikeThis from '../../../Hooks/useILikeThis'
import { getAllPost, newLike } from '../../../Services/api'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

import './BtnLike.scss'

const BtnLike = ({ likes, id, showDetail }) => {

	const appContext = useContext(AppContext)
	const { userID } = useParams()
	const { toggleRefresh } = useContext(AppContext)

	const handleSubmitNewLike = async (e) => {
		e.preventDefault()
		try {
			const Like = { userID: userID }
			await newLike(id, Like)
			toggleRefresh()
			appContext?.setPosts(await getAllPost())
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="BtnLike__container">
			<div className="option like" onClick={handleSubmitNewLike}>
				{useILikeThis(id, userID) ?
					<i className="active">
						<ThumbUpAltIcon />
					</i>
					:
					<i>
						<ThumbUpOffAltIcon />
					</i>
				}
				{showDetail && <span>{likes}</span>}
			</div>
		</div>
	)
}

export default BtnLike

