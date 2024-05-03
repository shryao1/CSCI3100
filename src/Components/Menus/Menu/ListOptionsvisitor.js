/**
 * listOptionsMenuvisitor.js
 * Description: This file contains a function getListOptionsMenuvisitor(userID) that generates a list of options for the visitor's menu, including icons and URLs.
 * Dependencies:
 * - React: Library for building user interfaces.
 * - react-router-dom: React library for routing in web applications.
 * - Material-UI icons: Icons library for React components.
 * 
 * Example Usage:
 * import { getListOptionsMenuvisitor } from './listOptionsMenuvisitor';
 * const visitorMenu = getListOptionsMenuvisitor(userID);
 * console.log(visitorMenu);
 * 
 * Note: Ensure that the icons and routes are appropriately configured and handled within the application.
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import EmailIcon from '@mui/icons-material/Email'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ArticleIcon from '@mui/icons-material/Article'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import PersonIcon from '@mui/icons-material/Person'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'

export const getListOptionsMenuvisitor = (userID) => {
  
	const ListOptionsMenuvisitor = [
		{ icon: <HomeOutlinedIcon fontSize='large'/>, icon2: <HomeIcon fontSize='large'/>, url: '/', label: 'Home'},
		{ icon: <TagOutlinedIcon fontSize='large'/>, icon2: <TagOutlinedIcon fontSize='large'/>, url: '/', label: 'Explore', id: 'exploreItem', className: 'exploreItem' },
		{ icon: <TagOutlinedIcon fontSize='large'/>, icon2: <TagOutlinedIcon fontSize='large'/>, url: '/', label: 'Browser', id: 'browserItem', className: 'browserItem' },
		{ icon: <NotificationsOutlinedIcon fontSize='large'/>, icon2: <NotificationsIcon fontSize='large'/>, url: '/', label: 'Notifications'},
		{ icon: <EmailOutlinedIcon fontSize='large'/>, icon2: <EmailIcon fontSize='large'/>, url: '/', label: 'Messages'}, // Note that :chatwithID needs to be handled dynamically as well
		{ icon: <PermIdentityOutlinedIcon fontSize='large'/>, icon2: <PersonIcon fontSize='large'/>, url: '/', label: 'Profile'},
	]
  
	return ListOptionsMenuvisitor
}

