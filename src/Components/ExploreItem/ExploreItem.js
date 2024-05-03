/*
 * ExploreItem.js
 * 
 * Description: This file contains the ExploreItem component, which renders a single item in an explore list.
 * 
 * Dependencies:
 * - PhotoUser component (../../shared/Components/PhotoUser/PhotoUser)
 * - Material-UI icons (PersonIcon from '@mui/icons-material/Person')
 * 
 * Props:
 * - explore: Object containing explore information (id, user_photo, name, username, time, text_explore, icon_explore)
 * - owner: Boolean indicating if the user is the owner of the explore item
 * 
 * Usage:
 * import ExploreItem from './ExploreItem';
 * <ExploreItem explore={exploreData} owner={true} />
 */

import PhotoUser from '../../shared/Components/PhotoUser/PhotoUser'
import PersonIcon from '@mui/icons-material/Person'

import './ExploreItem.scss'

const ExploreItem = ({
	explore: {
		id,
		user_photo,
		name,
		username,
		time,
		text_explore,
		icon_explore
	},
	owner
}) => {
	return (
		<div className="explore__container">
			<div className="explore__container-icon">
				<img src="https://icones.pro/wp-content/uploads/2021/04/icone-cloche-explore-jaune.png" style={{ width: '30px', height: '30px' }}/>
			</div>
			<div className="explore__container-content">
				<div className="explore__container-photo">
					<PhotoUser url={user_photo} size='32'/>
				</div>
				<div className="content__text">
					<span>{name}</span>{text_explore}
				</div>
			</div>
		</div>
	)
}

export default ExploreItem
