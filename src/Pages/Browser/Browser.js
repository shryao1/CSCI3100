import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import './Browser.scss'
import sad from './sad.png'
import { set } from 'mongoose'

const Browser = () => {
	const { userID } = useParams()
	const [postData, setPostData] = useState(null)
	const [showNotFound, setShowNotFound] = useState(false)
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
				setShowNotFound(true)
                	//console.log('here is test',data)
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
				{showNotFound === false && 
				<>
					<br></br>
					<h2>Sorry, your followings have not send posts now.</h2>
					<img src={sad} alt="something wrong" className="search-logo" style={{ width: 320, height: 320 }} />
				</>
				}
			</div>
		</div>
	)
}


export default Browser