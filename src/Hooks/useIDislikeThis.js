
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
	//	console.log(userDislikes)
	return userDislikes
}



export default useIDislikeThis
