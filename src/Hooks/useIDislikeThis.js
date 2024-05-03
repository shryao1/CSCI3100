/**
 * useIDislikeThis.js
 *
 * Description: This custom hook checks if the current user has disliked a specific post.
 * 
 * @param {string} id - The ID of the post to check for dislikes.
 * @param {string} userID - The ID of the user whose dislikes are checked.
 * @returns {boolean} A boolean value indicating whether the user has disliked the post.
 * 
 * Example Usage:
 * const isDisliked = useIDislikeThis(postId, userId);
 */

import { AppContext } from '../Context/AppContext'
import { GetUser } from '../Services/api'
import { useContext,useEffect,useState } from 'react'


const useIDislikeThis = (id, userID) => {
	const [ userDislikes, setUserDislike] = useState(false)
	const user = GetUser(userID)
	useEffect(() => {
		user.then(
			data=>
				setUserDislike(data.dislikePost.includes(id.toString()))
		)
	})
	//console.log(userDislikes)
	return userDislikes
}



export default useIDislikeThis
