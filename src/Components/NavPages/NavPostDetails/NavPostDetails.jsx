/**
 * NavPostDetails.js
 *
 * Description: This JavaScript file defines the NavPostDetails component, which represents the navigation bar for post details.
 * Dependencies:
 * - Link: Component from react-router-dom used for navigation.
 * - ArrowBackOutlinedIcon: Material-UI icon for navigating back.
 * - NavPostDetails.scss: SCSS file containing styling for the NavPostDetails component.
 * 
 * Example Usage:
 * import NavPostDetails from './NavPostDetails';
 * 
 * Note: Ensure that this component is imported and used appropriately within your React application.
 */

import { Link } from 'react-router-dom'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import './NavPostDetails.scss'

const NavPostDetails = () => {
	return (
		<section className="header__navTweet">
			<Link to={'/home'} className='link'>
				<div className="goBack">
					<i>
						<ArrowBackOutlinedIcon />
					</i>
				</div>
			</Link>
			<div>
				<h2>Post</h2>
			</div>
		</section>
	)
}

export default NavPostDetails
