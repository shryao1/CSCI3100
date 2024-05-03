/**
 * MenuTweetsProfile.js
 *
 * Description: This file defines the MenuTweetsProfile component, which represents the menu for managing tweets on a user's profile.
 * Dependencies:
 * - React: Library for building user interfaces.
 * - ItemMenuTweetsProfile: Component for rendering individual menu items in the profile menu.
 * - ListOptionsMenu: Array of options for the profile menu.
 * 
 * Example Usage:
 * import MenuTweetsProfile from './MenuTweetsProfile';
 * 
 * Note: This component expects two functions, `handlePostButtonClick` and `handleFavoriteButtonClick`, to be passed as props to handle button click events.
 */

import ItemMenuTweetsProfile from './ItemMenuTweetsProfile/ItemMenuTweetsProfile'
import { ListOptionsMenu } from './ListOptions'
import React from 'react'
import './MenuTweetsProfile.scss'

// const MenuTweetsProfile = ({ handlePostButtonClick, handleFavoriteButtonClick }) => {
// 	return (
// 		<div>
// 			<button onClick={handlePostButtonClick}>Show All Posts</button>
// 			<button onClick={handleFavoriteButtonClick}>Show Favorite Posts</button>
// 	  </div>
// 	)
// }

const MenuTweetsProfile = ({ handlePostButtonClick, handleFavoriteButtonClick }) => {
	return (
	  <div style={{ display: 'flex', justifyContent: 'center' }}>
			<button onClick={handlePostButtonClick}>Show My Posts</button>
			<button onClick={handleFavoriteButtonClick}>Show Favourite Posts</button>
	  </div>
	)
}
  
export default MenuTweetsProfile