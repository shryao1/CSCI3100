import { useContext, useEffect } from 'react'
import NavBrowser from '../../Components/NavPages/NavBrowser/NavBrowser'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import './Browser.scss'

const Browser = () => {
	const appContext = useContext(AppContext)


	return (
		<div className="home__container">
			<NavBrowser />
			<div className="home__tweetsList">
				
			</div>
		</div>
	)
}


export default Browser