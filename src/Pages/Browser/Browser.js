import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import { AppContext } from '../../Context/AppContext'
import './Browser.scss'

const Browser = () => {
	const { setVisitUserID } = useContext(AppContext)
	const [postData, setPostData] = useState(null)
	const userID = useParams().userID // Combined these two lines for cleaner code
	useEffect(() => {
		setVisitUserID(userID)
		
		//console.log('Fetching posts for user:', userID)

		if (userID) {
			localStorage.setItem('visitUserID', userID)
			try {
				console.log('Fetching posts for user:', userID)
				const response =  fetch(`http://localhost:3001/browser/${userID}`)
				//console.log('Fetching posts for user:', userID)
				if (!response.ok) throw new Error('Network response was not ok')
				const data = response.json()
				setPostData(data)
				console.log(data)
			} catch (error) {					
				console.error('Error fetching user data:', error)
			}
		} else {
			console.warn('Invalid user ID')
		}
		
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