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
	const [isFollowing, setIsFollowing] = useState()
	const [self_post, setself_post] = useState()
	const [viewFavorite, setViewFavorite] = useState(false)
	const { userID, visituserID } = useParams() // Combined these two lines for cleaner code
	let judgement = (userID === visituserID)

	const checkFollowing = async () => {
		// Get userID and visitUserID from wherever they are stored
		if (userID && visituserID) {
			try {
				const response = await fetch(`http://localhost:3001/checkFollow/${userID}/${visituserID}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userID, visituserID })
				})
	
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
	
				const data = await response.json()
	
				// Handle the response data if necessary
				// console.log(data)
	
				// Check if visitUserID is following or not based on the response
				if (data.isFollowing === 1) {
					setIsFollowing(true)
				} else {
					setIsFollowing(false)
				}
	
			} catch (error) {
				console.error('Error checking follow:', error)
			}
		} else {
			console.warn('Invalid user ID')
		}
	}
	
	checkFollowing()

	useEffect(() => {
		setVisitUserID(visituserID)

		const fetchPostsNumber = async () => {

			if (visituserID) {
				localStorage.setItem('visitUserID', visituserID)
				try {
					const response = await fetch(`http://localhost:3001/profileSelfPost/${visituserID}`)
					if (!response.ok) throw new Error('Network response was not ok')
					const data = await response.json()
					setself_post(data)
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			} else {
				console.warn('Invalid user ID')
			}
		}
		fetchPostsNumber()
		
		const fetchPosts = async () => {

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

		const fetchfavoritepost = async () => {

			if (visituserID) {
				localStorage.setItem('visitUserID', visituserID)
				try {
					const response = await fetch(`http://localhost:3001/profileFavourites/${visituserID}`)
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

		if (viewFavorite) fetchfavoritepost()
		else fetchPosts()
		
	  }, [visituserID, viewFavorite])


	  const handleFollowUser = async () => {
		// Get userID and visitUserID from wherever they are stored
		
		if (userID && visituserID) {
			try {
				const response = await fetch(`http://localhost:3001/newFollower/${userID}/${visituserID}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userID, visituserID })
				})
	
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
	
				const data = await response.json()
	
				// Handle the response data if necessary
				console.log(data)
	
			} catch (error) {
				console.error('Error following/unfollowing user:', error)
			}
		} else {
			console.warn('Invalid user ID')
		}
	}

	const handleButtonClick = () => {
		handleFollowUser()
		checkFollowing()
		window.location.reload()
		// setIsFollowing(prevState => !prevState)
	  }

	const handlePostButtonClick = () => {
		setViewFavorite(false)
	  }
	
	const handleFavoriteButtonClick = () => {
		setViewFavorite(true)
	  }

	return (
		<div className="profile__container">
			{user &&
				<>
					<NavProfile 
					
						user={user} 
						self_post = {self_post}
						userID={user.userID}
						judge={judgement}
						isFollowing={isFollowing}
						handleButtonClick={handleButtonClick}
					/>
					<MenuTweetsProfile 
						handlePostButtonClick={handlePostButtonClick}
						handleFavoriteButtonClick={handleFavoriteButtonClick}
					/>
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
