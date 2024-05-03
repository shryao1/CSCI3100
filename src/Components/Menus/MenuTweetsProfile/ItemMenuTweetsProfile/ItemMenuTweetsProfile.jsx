/**
 * ItemMenuTweetsProfile.js
 *
 * Description: This JavaScript file defines the ItemMenuTweetsProfile component, which represents an individual item in the menu for tweets profile.
 * Dependencies:
 * - ItemMenuTweetsProfile.scss: SCSS file containing styling for the ItemMenuTweetsProfile component.
 * 
 * Example Usage:
 * import ItemMenuTweetsProfile from './ItemMenuTweetsProfile';
 * 
 */

import './ItemMenuTweetsProfile.scss'

const ItemMenuTweetsProfile = ({
	option: {
		label
	}
}) => {
	return (
		<div className="itemMenuTweetsProfile__container">
			<span>
				{label}
			</span>
		</div>
	)
}

export default ItemMenuTweetsProfile
