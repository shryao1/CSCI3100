/**
 * Menuvisitor.js
 * Description: This file defines the Menu component, which displays a navigation menu for visitor mode.
 * Dependencies:
 * - React: Library for building user interfaces.
 * - react-router-dom: React library for routing in web applications.
 * - MenuItem: Custom component for rendering menu items.
 * - ListOptionsvisitor: Function for getting a list of menu options for visitors.
 * - MenuActiveContext: Context for managing menu state.
 * - useScroll: Custom hook for disabling scrolling.
 * 
 * Example Usage:
 * import Menu from './Menu';
 * <Menu />
 * 
 * Note: Ensure that the necessary context providers are wrapped around the component to provide required context values.
 */


import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import MenuItem from './MenuItem/MenuItem'

import { getListOptionsMenuvisitor } from './ListOptionsvisitor'

import { MenuActiveContext } from '../../../Context/menuActive'
import { disableScroll } from '../../../Hooks/useScroll'


import CreateIcon from '@mui/icons-material/Create'
import CUChatIcon from './img/CUChatIcon.png'
import { useNavigate } from 'react-router-dom'


import './Menu.scss'

const Menu = () => {
	const { userID } = useParams()
	const menuContext = useContext(MenuActiveContext)
	const ListOptionsMenu = getListOptionsMenuvisitor(userID)
	const navigate = useNavigate()

	const OpenPopUp = () => {
		menuContext?.setPopUp(true)
		disableScroll()
	}

	return (
		<div className="menu__container">
			<nav className="container__nav">
				<label className="container__twittericon">< img src = {CUChatIcon} alt = "Custom Twitter Icon" style={{ width: '80px', height: '80px' }}/>
					<span className="cuchat" onClick={() => navigate('/')}>CUChat</span>
				</label>
				<ul>
					{ListOptionsMenu?.map((option, index) => {
						return (
							<label className={option.label} key={index} onClick={() => navigate('/')}>
								<MenuItem option={option} onClick={() => navigate('/')}/>
							</label>
						)
					})}
				</ul>
			</nav>
			<div className="container__btnTweet">
				<label type="button" className="btnTweet__tweet" onClick={() => navigate('/')}>Post</label>
				<label type="button" className="btnTweet__icon" onClick={() => navigate('/')}><CreateIcon onClick={() => navigate('/')}/></label>
			</div>
			{/* <div className="container__profile">
				<PhotoUser url={userPhoto} size="40" />
				<div className="pofile_name-moreicon">
					<div className="profile__name">
						<label>Winnie</label>
						<div><label className="profile__name-username">@winnie3100</label></div>
					</div>
					<div className="profile__moreicon"><MoreHorizOutlinedIcon /></div>
				</div>
			</div> */}
		</div>
	)
}

export default Menu
