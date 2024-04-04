import { useContext } from 'react'

import { AppContext } from '../../../Context/AppContext'

import useIDislikeThis from '../../../Hooks/useIDislikeThis'
import { getAllPost, newDislike } from '../../../Services/api'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'


import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

import './BtnDislike.scss'

const BtnDislike = ({ dislikes, id, showDetail }) => {

	const appContext = useContext(AppContext)

	const handleSubmitNewDislike = async (e) => {
		e.preventDefault()
		try {
			const Dislike = {
				'userDisliked': appContext?.user?.username
			}
			await newDislike(id, Dislike)
			appContext?.setPosts(await getAllPost())
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="BtnDislike__container">
			<div className="option dislike" onClick={handleSubmitNewDislike}>
				{useIDislikeThis(dislikes) ?
					<i className="active">
						<ThumbDownAltIcon />
					</i>
					:
					<i>
						<ThumbDownOffAltIcon />
					</i>
				}
				{showDetail && <span>{dislikes?.length}</span>}
			</div>
		</div>
	)
}

export default BtnDislike
