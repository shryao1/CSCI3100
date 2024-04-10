import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import './Browser.scss'

const Browser = () => {
	const { userID } = useParams()
	const [postData, setPostData] = useState(null)
	useEffect(() => {
        	fetch(`http://localhost:3001/browser/${userID}`)
            	.then((response) => {
                	if (!response.ok) {
                    	  throw new Error('Network response was not ok')
                	}
                	return response.json()
            	})
            	.then((data) => {
                	setPostData(data)
                	console.log('here is test',data)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
      	}, [userID])
	return (
		<div className="browser__container">
			<NavBrowser />
			<div className="browser__tweetsList">
				{postData?.map((post) => {
					return <TweetPost key={post.postID} post={post} />
				})}
			</div>
		</div>
	)
}


export default Browser