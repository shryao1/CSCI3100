import { GetUserA } from '../Services/api'
import { useContext,useEffect,useState } from 'react'
import { AppContext } from '../Context/AppContext'

const useGetcurrentusername = (userID) => {
	const [ currentusername, setUsername ] = useState('')
	const user = GetUserA(userID)
	useEffect(() => {
		user.then(
			data=>
				setUsername(data.username)
		)
	})
	return currentusername
}

export default useGetcurrentusername
