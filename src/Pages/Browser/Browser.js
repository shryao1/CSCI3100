import { useContext, useEffect } from 'react'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import TweetPost1 from '../../Components/Tweet/TweetPost/TweetPost1'
import TweetPost2 from '../../Components/Tweet/TweetPost/TweetPost2'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import sampleImage from '../../shared/image.png'
import sampleImage2 from '../../shared/image2.jpg'
import './Browser.scss'

const hardtweetdata1 = {
	id: '1',
	_id: '1',
	user_photo: sampleImage,
	nameUser: 'Michael Lyu',
	username: 'CUHKMichael',
	text_posted: 'Hi! This is Michael Lyu!',
	media_posted: sampleImage2
}

const hardtweetdata2 = {
	id: '1',
	_id: '1',
	user_photo: sampleImage,
	nameUser: 'Michael Lyu',
	username: 'CUHKMichael',
	text_posted: 'Hi! Welcome to CSCI3100!',
	media_posted: sampleImage2
}

const Browser = () => {
	const appContext = useContext(AppContext)


	return (
		<div className="home__container">
			<NavBrowser />
			<div className="home__tweetsList">
				<TweetPost2 key={'1'} post={hardtweetdata2} />
				<TweetPost1 key={'1'} post={hardtweetdata1} />
			</div>
		</div>
	)
}


export default Browser