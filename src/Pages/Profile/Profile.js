import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MichealAvatar from './michaelAvatar.png'
import MichealBG from './MichaelWorking.png'
import { AppContext } from '../../Context/AppContext'
import './Profile.scss'

import NavProfile from '../../Components/NavPages/NavProfile/NavProfile'
import MenuTweetsProfile from '../../Components/Menus/MenuTweetsProfile/MenuTweetsProfile'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'

import { getUserPosts } from '../../Services/api'
const profileData = {
	user_photo: MichealAvatar,
	image_bg: MichealBG,
	name: 'Michael',
	username: 'Michael',
	description: 'I would like to offer you a coupon if you follow me!',
	count_tweets: 1500,
	following: 500,
	followers: 1000
}
  
const sampleUserData = {
	username: 'Michael',
	name: 'Michael',
	bio: 'Software Developer | CUHK Professor',
	avatar: 'https://example.com/avatar.jpg',
	// Add more properties as needed
}
const samplePostsData = [
	{
	  id: 1,
	  user_photo: MichealAvatar,
	  username: 'Michael',
	  content: 'I want to offer 5 coupons to group E4!'
	},
	{
	  id: 2,
	  user_photo: MichealAvatar,
	  username: 'Michael',
	  content: 'Just testing out this new feature!'
	}
]
const Profile = () => {

	const appContext = useContext(AppContext)
	const [posts, setPosts] = useState(null)
	const [isFollowing, setIsFollowing] = useState(false)
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path
	console.log(userID)


	useEffect(() => {
		appContext.setUser(sampleUserData)
		setPosts(samplePostsData)
		console.log(posts)
		// const fetchPosts = async () => {
		// 	if (appContext?.user)
		// 		setPosts(await getUserPosts(appContext?.user.username))
	
		// }
		// fetchPosts()
	}, [appContext])

	const handleButtonClick = () => {
		setIsFollowing(prevState => !prevState)
	  }
	
	return (
		<div className="profile__container">
			{appContext?.user &&
				<>
					<NavProfile 
					//  user={appContext?.user} 
					 isFollowing={isFollowing}
					 handleButtonClick={handleButtonClick}
					 user={profileData}
  						// handleButtonClick={() => { /* Define your handleButtonClick function here */ }}
					/>
					<MenuTweetsProfile />
					<div className="content__options" style={{ marginLeft: '10px' }}>
						<div className="home__tweetsList">
							{posts?.map((post, id, content) => {
								return <TweetPost key={id} post={post} content={content} owner={post.username} />
							})}
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default Profile
