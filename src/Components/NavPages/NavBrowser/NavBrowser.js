/**
 * NavBrowser.js
 *
 * Description: This JavaScript file defines the NavBrowser component, which represents the navigation bar for the browser section.
 * Dependencies:
 * - React: Library for building user interfaces in JavaScript.
 * - PhotoUser: Component for displaying user photos.
 * - NewTweet: Component for composing new tweets.
 * - AppContext: Context for accessing global application state.
 * - StarRateOutlinedIcon: Material-UI icon for displaying a star outline.
 * - NavBrowser.scss: SCSS file containing styling for the NavBrowser component.
 * 
 * Example Usage:
 * import NavBrowser from './NavBrowser';
 * 
 * Note: Ensure that this component is imported and used appropriately within your React application.
 */

import { useContext } from 'react'

import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import NewTweet from '../../../shared/Components/NewTweet/NewTweet'

import { AppContext } from '../../../Context/AppContext'

import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined'

import './NavBrowser.scss'

const NavBrowser = () => {
	const appContext = useContext(AppContext)

	return (
		<div className="container__navBrowser">
			<section className="header__navBrowser">
				<div className="headerNavBrowser__Photo">
					
					<div>
						<h2 className="browserTitle">Browser</h2> 
					</div>
				</div>
			</section>
			
            
		</div>
	)
}

export default NavBrowser
