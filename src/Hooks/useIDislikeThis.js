import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const useIDislikeThis = (dislikes) => {
	const appContext = useContext(AppContext)
	if (dislikes) {
		return dislikes.find(dislike => dislike.username === appContext?.user?.username)
	}
}

export default useIDislikeThis