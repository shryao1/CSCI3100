<<<<<<< Updated upstream
import { useState, useEffect } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> Stashed changes
import NavExplore from '../../Components/NavPages/NavExplore/NavExplore'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import './Explore.scss'

const Explore = () => {
	const [postData, setPostData] = useState(null)
<<<<<<< Updated upstream
	useEffect(() => {
        	fetch('http://localhost:3001/listpost')
            	.then((response) => {
                	if (!response.ok) {
                    	  throw new Error('Network response was not ok')
=======


	useEffect(() => {
        	fetch('http://localhost:3001/listpost')
        	.then((response) => {
                	if (!response.ok) {
                      	throw new Error('Network response was not ok')
>>>>>>> Stashed changes
                	}
                	return response.json()
            	})
            	.then((data) => {
                	setPostData(data)
<<<<<<< Updated upstream
                	console.log('here is test',data)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
      	}, [])
=======
                	//console.log(data)
            	})
            	.catch((error) => {
                	console.error('Error fetching user data:', error)
            	})
      	}, [])
	


>>>>>>> Stashed changes
	return (
		<div className="explore__container">
			<NavExplore />
			<div className="explore__tweetsList">
<<<<<<< Updated upstream
				{postData?.map((post) => {
					return <TweetPost key={post.postID} post={post} />
=======
				{postData?.map((post, id) => {
					return <TweetPost key={id} post={post} />
>>>>>>> Stashed changes
				})}
			</div>
		</div>
	)
}


export default Explore