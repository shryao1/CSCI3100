import { useContext, useEffect } from 'react'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import { useParams } from 'react-router-dom'
import './Browser.scss'

const Browser = () => {
	const appContext = useContext(AppContext)
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path
	console.log(userID)


	return (
		<div className="home__container">
			<NavBrowser />
			<div className="home__tweetsList">
				
			</div>
		</div>
	)
}


export default Browser