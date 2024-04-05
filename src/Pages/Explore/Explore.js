import { useContext, useEffect } from 'react'
import NavExplore from '../../Components/NavPages/NavExplore/NavExplore'
import { AppContext } from '../../Context/AppContext'
import { getAllPost } from '../../Services/api'
import { useParams } from 'react-router-dom'
import './Explore.scss'

const Explore = () => {
	const appContext = useContext(AppContext)
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path
	console.log(userID)


	return (
		<div className="home__container">
			<NavExplore />
			<div className="home__tweetsList">
				
			</div>
		</div>
	)
}


export default Explore