/**
 * NavHome.js
 *
 * Description: This JavaScript file defines the NavHome component, which represents the navigation bar for the home section.
 * Dependencies:
 * - React: Library for building user interfaces in JavaScript.
 * - PhotoUser: Component for displaying user photos.
 * - NewTweet: Component for composing new tweets.
 * - AppContext: Context for accessing global application state.
 * - StarRateOutlinedIcon: Material-UI icon for displaying a star outline.
 * - NavHome.scss: SCSS file containing styling for the NavHome component.
 * 
 * Example Usage:
 * import NavHome from './NavHome';
 * 
 * Note: Ensure that this component is imported and used appropriately within your React application.
 */

import { useContext } from 'react'

import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import NewTweet from '../../../shared/Components/NewTweet/NewTweet'

import { AppContext } from '../../../Context/AppContext'

import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined'

import './NavHome.scss'

const NavHome = () => {
	const appContext = useContext(AppContext)

	return (
		<div className="container__navHome">
			<section className="header__navHome">
				<div className="headerNavHome__Photo">
					<div className="headerNavHome__Photo-user">
						{appContext?.user &&
							<PhotoUser url={appContext?.user.user_photo} size='32' />
						}
					</div>
					<div>
						<h2 className="homeTitle">Home</h2> 
					</div>
				</div>
				<div className="stars">
					<i>
						<StarRateOutlinedIcon />
					</i>
				</div>
			</section>
			<NewTweet placeholder="What's happening?" />
		</div>
	)
}

export default NavHome
