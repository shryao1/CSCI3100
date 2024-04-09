import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MichealAvatar from './michaelAvatar.png'
import MichealBG from './MichaelWorking.png'
import { AppContext } from '../../Context/AppContext'

import NavProfile from '../../Components/NavPages/NavProfile/NavProfile'
import MenuTweetsProfile from '../../Components/Menus/MenuTweetsProfile/MenuTweetsProfile'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'

const Profile = () => {
	const { user, setUser, posts, setPosts, setVisitUserID } = useContext(AppContext)
	// const [posts, setPosts] = useState(null)
	const [isFollowing, setIsFollowing] = useState(false)
	const { userID, visituserID } = useParams() // Combined these two lines for cleaner code
	let judgement = (userID === visituserID)

	useEffect(() => {
		setVisitUserID(visituserID)
		const fetchPosts = async () => {
			console.log('Fetching posts for user:', visituserID)
			if (visituserID) {
				localStorage.setItem('visitUserID', visituserID)
				try {
					const response = await fetch(`http://localhost:3001/profilePosts/${visituserID}`)
					if (!response.ok) throw new Error('Network response was not ok')
					const data = await response.json()
					setPosts(data)
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			} else {
				console.warn('Invalid user ID')
			}
		}
		fetchPosts()
		
	}, [visituserID]) // Added visituserID as a dependency

	const handleButtonClick = () => {
		setIsFollowing(prevState => !prevState)
	}
	
	// console.log(appContext?.user)
	
	return (
		<div className="profile__container">
			{user &&
				<>
					<NavProfile 
						user={user} 
						userID={user.userID}
						judge={judgement}
						isFollowing={isFollowing}
						handleButtonClick={handleButtonClick}
					/>
					<MenuTweetsProfile />
					<div className="content__options" style={{ marginLeft: '10px' }}>
						<div className="home__tweetsList">
							{Array.isArray(posts) && posts.map((post) => (
								<TweetPost key={post.id} post={post} />
							))}
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default Profile
