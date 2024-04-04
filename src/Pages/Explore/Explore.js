import { useContext, useEffect } from 'react'
import NavExplore from '../../Components/NavPages/NavExplore/NavExplore'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import './Explore.scss'

const Explore = () => {
	const appContext = useContext(AppContext)


	return (
		<div className="home__container">
			<NavExplore />
			<div className="home__tweetsList">
				
			</div>
		</div>
	)
}


export default Explore