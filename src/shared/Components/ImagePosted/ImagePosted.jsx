/**
 * ImagePosted.js
 *
 * Description: This file contains the ImagePosted component, which represents an image posted in a tweet or post. It displays the image with a specified URL.
 * 
 * Example Usage: 
 *   - Import and use this component in your application to display images posted in tweets or posts.
 *   - Pass the 'url' prop with the URL of the image to be displayed.
 */

import './ImagePosted.scss'

const ImagePosted = ({ url }) => {
	return (
		<div className="ImagePosted__container">
			<img src={url} alt="Default img" width="500"/>
		</div>
	)
}

export default ImagePosted
