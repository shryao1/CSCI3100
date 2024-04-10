import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import MenuItem from './MenuItem/MenuItem'

import { getListOptionsMenu } from './ListOptions'

import { MenuActiveContext } from '../../../Context/menuActive'
import { disableScroll } from '../../../Hooks/useScroll'

import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'

import TwitterIcon from '@mui/icons-material/Twitter'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import CreateIcon from '@mui/icons-material/Create'
import CUChatIcon from './img/CUChatIcon.png'
import userPhoto from './img/Winnie.png'

import './Menu.scss'

const Menu = () => {
	const { userID } = useParams()
	const menuContext = useContext(MenuActiveContext)
	const ListOptionsMenu = getListOptionsMenu(userID)

	const OpenPopUp = () => {
		menuContext?.setPopUp(true)
		disableScroll()
	}

	return (
		<div className="menu__container">
			<nav className="container__nav">
				<label className="container__twittericon">< img src = {CUChatIcon} alt = "Custom Twitter Icon" style={{ width: '80px', height: '80px' }}/>
					<span className="cuchat">CUChat</span>
				</label>
				<ul>
					{ListOptionsMenu?.map((option, index) => {
						return (
							<label className={option.label} key={index}>
								<MenuItem option={option} />
							</label>
						)
					})}
				</ul>
			</nav>
			<div className="container__btnTweet">
				<label type="button" className="btnTweet__tweet" onClick={() => OpenPopUp()}>Tweet</label>
				<label type="button" className="btnTweet__icon" onClick={() => OpenPopUp()}><CreateIcon /></label>
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
