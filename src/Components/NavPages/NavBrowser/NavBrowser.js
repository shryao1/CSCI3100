import { useContext } from 'react'

import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import NewTweet from '../../../shared/Components/NewTweet/NewTweet'

import { AppContext } from '../../../Context/AppContext'

import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined'

import './NavBrowser.scss'

const NavBrowser = () => {
	const appContext = useContext(AppContext)

	return (
		<div className="container__navBrowser">
			<section className="header__navBrowser">
				<div className="headerNavBrowser__Photo">
					
					<div>
						<h2 className="browserTitle">Browser</h2> 
					</div>
				</div>
			</section>
			
            
		</div>
	)
}

export default NavBrowser
