/**
 * useGetcurrentusername.js
 *
 * Description: This custom hook provides functionality to retrieve the current username based on the user ID.
 * Dependencies:
 * - GetUserA: API function to fetch user data based on user ID.
 * - AppContext: Context for the current application state.
 * 
 * @param {string} userID - The ID of the user for whom the username is to be retrieved.
 * @returns {string} The current username associated with the provided user ID.
 * 
 * Example Usage:
 * const username = useGetcurrentusername(userID);
 */

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
