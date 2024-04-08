import { useContext,useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'

import useIDislikeThis from '../../../Hooks/useIDislikeThis'
import { getAllPost, newDislike } from '../../../Services/api'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'


import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

import './BtnDislike.scss'
import { CropOriginalSharp } from '@mui/icons-material'


const BtnDislike = ({ dislikes, id, showDetail }) => {
	const appContext = useContext(AppContext)
	const { userID } = useParams()
	
	const handleSubmitNewDislike = async (e) => {
		e.preventDefault()
		try {
			const Dislike = { userID: userID }
			await newDislike(id, Dislike)
			appContext?.setPosts(await getAllPost())
			// You might need to call something here to refresh userDislikes if it does not automatically update
		} catch (error) {
			console.error(error)
		}

	}

	return (
		<div className="BtnDislike__container">
			<div className="option dislike" onClick={handleSubmitNewDislike}>
				{ useIDislikeThis(id, userID) ?
					<i className="active">
						<MonetizationOnIcon />
					</i>
					:
					<i>
						<MonetizationOnIcon />
					</i>
				}
				{showDetail && <span>{dislikes}</span>}
			</div>
		</div>
	)

}

export default BtnDislike
