/**
 * Home.js
 *
 * Description: This file contains the Home component, which displays a list of tweets from the user's home feed.
 * 
 * @returns {JSX.Element} JSX for Home component.
 * 
 * Example Usage:
 * <Home />
 */


import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavHome from '../../Components/NavPages/NavHome/NavHome'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'

import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'

import './Home.scss'

const Home = () => {
	const appContext = useContext(AppContext)
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path


	useEffect(() => {
		const fetching = async () => {
			appContext?.setPosts(await getAllPost())
		}
		fetching()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="home__container">
			<NavHome />
			<div className="home__tweetsList">
				{appContext?.posts?.map((post, id) => {
					return <TweetPost key={id} post={post} />
				})}
			</div>
		</div>
	)
}

export default Home
