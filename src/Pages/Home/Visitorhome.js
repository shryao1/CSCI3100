/**
 * VisitorHome.js
 *
 * Description: This file contains the VisitorHome component, which displays the home page for visitors.
 * 
 * Example Usage:
 * <VisitorHome />
 */

import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavHome from '../../Components/NavPages/NavHome/NavHome'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'

import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'



import './Home.scss'

const VisitorHome = () => {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {

	}, [])

	return (
		<div className="home__container" onClick={() => navigate('/')}>
			<NavHome onClick={() => navigate('/')}/>
			<div className="home__tweetsList" onClick={() => navigate('/')}>
				{appContext?.posts?.map((post, id) => {
					return <TweetPost key={id} post={post}/>
				})}
			</div>
		</div>
	)
}

export default VisitorHome