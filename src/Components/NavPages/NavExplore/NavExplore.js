import { useContext } from 'react'

import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import NewTweet from '../../../shared/Components/NewTweet/NewTweet'

import { AppContext } from '../../../Context/AppContext'

import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined'

import './NavExplore.scss'

const NavExplore = () => {
	const appContext = useContext(AppContext)

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
