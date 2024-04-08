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
                	const shuffledData = shuffleArray(data)
                	setPostData(shuffledData)
                	//console.log('here is test',data)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
      	}, [])
	const shuffleArray = (array) => {
        	const shuffledArray = [...array]
        	for (let i = shuffledArray.length - 1; i > 0; i--) {
            	const j = Math.floor(Math.random() * (i + 1))
            	;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        	}
        	return shuffledArray
    	}
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