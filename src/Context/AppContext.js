import React, { createContext, useEffect, useState } from 'react'
import { getAllPost, myGetUser } from '../Services/api'

export const AppContext = createContext({})

const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [posts, setPosts] = useState([])
	const [visitUserID, setVisitUserID] = useState(localStorage.getItem('visitUserID') || null)
	

	// Function to manually refresh the context data
	const refreshData = async () => {
		try {
			const userData = await myGetUser(visitUserID)
			const postsData = await getAllPost()
			if (userData) setUser(userData)
			if (postsData) setPosts(postsData)
		} catch (error) {
			console.error('Error refreshing data:', error)
		}
	}

	useEffect(() => {
		let isMounted = true
		const fetch = async () => {
			if (!isMounted) return
			if (!localStorage.getItem('visitUserID') && !window.location.href.endsWith('/')) {
				//window.location.href = '/'
				return
			} else {
				if (localStorage.getItem('visitUserID')) {
					setUser(await myGetUser(localStorage.getItem('visitUserID')))
					// setUser(await myGetUser(userID))
					setPosts(await getAllPost())
				}
			}
		}
		fetch()

		const intervalId = setInterval(fetch, 100000)
		return () => {
			isMounted = false
			clearInterval(intervalId)
		}
	}, [])

	return (
		<AppContext.Provider value={initialState}>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
