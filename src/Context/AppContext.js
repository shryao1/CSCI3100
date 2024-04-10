import React, { createContext, useEffect, useState } from 'react'
import { getAllPost, myGetUser } from '../Services/api'

export const AppContext = createContext({})

const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [posts, setPosts] = useState([])
	const [visitUserID, setVisitUserID] = useState(localStorage.getItem('visitUserID') || null)
	// Inside AppContext.js or wherever your AppContext is defined
	const [refreshTrigger, setRefreshTrigger] = useState(false)

	// Toggle function
	const toggleRefresh = () => {
		setRefreshTrigger(prev => !prev)
	}
	console.log(refreshTrigger)



	// Function to manually refresh the context data
	const refreshData = async () => {
		try {
			const userData = await myGetUser(visitUserID)
			const postsData = await getAllPost()
			if (userData) setUser(userData)
			if (postsData) setPosts(postsData)
			// console.log('hhh')
		} catch (error) {
			console.error('Error refreshing data:', error)
		}
	}

	useEffect(() => {
		const fetchUserData = async () => {
			if (!visitUserID) return
			try {
				const userData = await myGetUser(visitUserID)
				if (userData) setUser(userData)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, [visitUserID]) // Dependency array includes visitUserID to fetch data on its change

	const initialState = {
		user, 
		setUser,
		posts, 
		toggleRefresh,
		refreshTrigger,
		setPosts,
		refreshData, // Now components can call refreshData to update the context
		setVisitUserID // Allow consumers to update visitUserID directly, triggering a refresh
	}

	return (
		<AppContext.Provider value={initialState}>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
