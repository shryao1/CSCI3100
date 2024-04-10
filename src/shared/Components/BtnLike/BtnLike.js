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

