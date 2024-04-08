import { useState, useEffect } from 'react'
import NavExplore from '../../Components/NavPages/NavExplore/NavExplore'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import './Explore.scss'

const Explore = () => {
	const [postData, setPostData] = useState(null)
	useEffect(() => {
        	fetch('http://localhost:3001/listpost')
            	.then((response) => {
                	if (!response.ok) {
                    	  throw new Error('Network response was not ok')
                	}
                	return response.json()
            	})
            	.then((data) => {
                	setPostData(data)
                	//console.log('here is test',data)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
      	}, [])
	return (
		<div className="explore__container">
			<NavExplore />
			<div className="explore__tweetsList">
				{postData?.map((post) => {
					return <TweetPost key={post.postID} post={post} />
				})}
			</div>
		</div>
	)
}


export default Explore