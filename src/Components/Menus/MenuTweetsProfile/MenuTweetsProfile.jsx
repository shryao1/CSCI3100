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