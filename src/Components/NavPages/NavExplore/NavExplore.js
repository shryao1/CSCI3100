<<<<<<< Updated upstream
=======
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../../Context/AppContext'
import ExplorePosts from '../../../Services/api'
import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import NewTweet from '../../../shared/Components/NewTweet/NewTweet'
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined'

>>>>>>> Stashed changes
import './NavExplore.scss'

const NavExplore = () => {
	return (
		<div className="container__navExplore">
			<section className="header__navExplore">
				<div className="headerNavExplore__Photo">
					<div>
						<h2 className="exploreTitle">Explore</h2> 
					</div>
				</div>
			</section>
		</div>
		
	)
}

export default NavExplore
