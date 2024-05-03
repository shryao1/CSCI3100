/**
 * MenuActiveProvider.js
 *
 * Description: This file defines the MenuActiveProvider component, which provides context for the active tab and pop-up state within the application's menu.
 * 
 * Example Usage:
 * import MenuActiveContext, { MenuActiveProvider } from './MenuActiveProvider';
 */

import React, { createContext, useState, useEffect } from 'react'

export const MenuActiveContext = createContext({})

const MenuActiveProvider = ({ children }) => {

	const [activeTab, setTab] = useState(null)
	const [popUp, setPopUp] = useState(null)
	const initialTab = {
		activeTab, setTab,
		popUp, setPopUp
	}
	useEffect(() => {
		setTab('Home')
		setPopUp(false)
	}, [])

	return (
		<MenuActiveContext.Provider value={initialTab}>
			{children}
		</MenuActiveContext.Provider>
	)
}

export default MenuActiveProvider
