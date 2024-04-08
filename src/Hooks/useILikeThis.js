import { GetUserA } from '../Services/api'
import { useContext,useEffect,useState } from 'react'
import { AppContext } from '../Context/AppContext'

const useILikeThis = (id, userID) => {
	const [ userLikes, setUserLike ] = useState(false)
	const user = GetUserA(userID)
	console.log(user)
	useEffect(() => {
		user.then(
			data=>
				setUserLike(data.likePost.includes(id.toString()))
		)
	})
	console.log(userLikes)
	return userLikes
}

export default useILikeThis
