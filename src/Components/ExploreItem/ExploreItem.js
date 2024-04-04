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
