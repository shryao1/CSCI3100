import { useContext, useEffect } from 'react'
import NavExplore from '../../Components/NavPages/NavExplore/NavExplore'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import TweetPost1 from '../../Components/Tweet/TweetPost/TweetPost1'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import sampleImage from '../../shared/image.png'
import sampleImage2 from '../../shared/image3.jpg'
import './Explore.scss'

const hardtweetdata = {
	id: '1',
	_id: '1',
	user_photo: sampleImage,
	nameUser: 'Michael Lyu',
	username: 'CUHKMichael',
	text_posted: 'Hi! This is Michael Lyu!',
	media_posted: sampleImage2
}

const hardtweetdata1 = {
	id: '1',
	_id: '1',
	user_photo: sampleImage,
	nameUser: 'Michael Lyu',
	username: 'CUHKMichael',
	text_posted: 'Hi! Welcome to CSCI3100!',
	media_posted: sampleImage2
}

const Explore = () => {
	const appContext = useContext(AppContext)


	return (
		<div className="home__container">
			<NavExplore />
			<div className="home__tweetsList">
				<TweetPost key={'1'} post={hardtweetdata} />
				<TweetPost1 key={'1'} post={hardtweetdata1} />
			</div>
		</div>
	)
}


export default Explore