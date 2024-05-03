/**
 * BtnDislike.js
 *
 * Description: This file contains the BtnDislike component, which represents a button to dislike a post. It allows users to dislike posts and updates the UI accordingly.
 * 
 * Dependencies: This component depends on React's useContext, useEffect, useState, and useParams hooks from 'react'. It also imports useIDislikeThis hook from '../../../Hooks/useIDislikeThis' and functions getAllPost and newDislike from '../../../Services/api'.
 * 
 * Example Usage: 
 *   - Import and use this component in your application to provide users with the ability to dislike posts.
 *   - Pass props like 'dislikes', 'id', and 'showDetail' to customize the behavior and appearance of the button.
 */

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
	const { toggleRefresh } = useContext(AppContext)
	
	const handleSubmitNewDislike = async (e) => {
		e.preventDefault()
		try {
			const Dislike = { userID: userID }
			await newDislike(id, Dislike)
			toggleRefresh()
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
