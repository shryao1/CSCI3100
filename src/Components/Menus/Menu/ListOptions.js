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

export const getListOptionsMenu = (userID) => {
  
	const ListOptionsMenu = [
		{ icon: <HomeOutlinedIcon fontSize='large'/>, icon2: <HomeIcon fontSize='large'/>, url: `/home/${userID}`, label: 'Home'},
		{ icon: <TagOutlinedIcon fontSize='large'/>, icon2: <TagOutlinedIcon fontSize='large'/>, url: `/explore/${userID}`, label: 'Explore', id: 'exploreItem', className: 'exploreItem' },
		{ icon: <TagOutlinedIcon fontSize='large'/>, icon2: <TagOutlinedIcon fontSize='large'/>, url: `/browser/${userID}`, label: 'Browser', id: 'browserItem', className: 'browserItem' },
		{ icon: <NotificationsOutlinedIcon fontSize='large'/>, icon2: <NotificationsIcon fontSize='large'/>, url: `/notifications/${userID}`, label: 'Notifications'},
		{ icon: <EmailOutlinedIcon fontSize='large'/>, icon2: <EmailIcon fontSize='large'/>, url: `/message/${userID}/1`, label: 'Messages'}, // Note that :chatwithID needs to be handled dynamically as well
		{ icon: <PermIdentityOutlinedIcon fontSize='large'/>, icon2: <PersonIcon fontSize='large'/>, url: `/profile/${userID}/${userID}`, label: 'Profile'},
	]
  
	return ListOptionsMenu
}

