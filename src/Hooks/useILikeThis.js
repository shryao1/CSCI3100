/**
 * useILikeThis.js
 *
 * Description: This custom hook checks if the current user has liked a specific post.
 * 
 * @param {string} id - The ID of the post to check for likes.
 * @param {string} userID - The ID of the user whose likes are checked.
 * @returns {boolean} A boolean value indicating whether the user has liked the post.
 * 
 * Example Usage:
 * const isLiked = useILikeThis(postId, userId);
 */

import { GetUserA } from '../Services/api'
import { useContext,useEffect,useState } from 'react'
import { AppContext } from '../Context/AppContext'

const useILikeThis = (id, userID) => {
	const [ userLikes, setUserLike ] = useState(false)
	const user = GetUserA(userID)
	//console.log(user)
	useEffect(() => {
		user.then(
			data=>
				setUserLike(data.likePost.includes(id.toString()))
		)
	})
	//console.log(userLikes)
	return userLikes
}

export default useILikeThis
