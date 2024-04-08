import Button from '@mui/material/Button'
import PhotoUser from '../../../shared/Components/PhotoUser/PhotoUser'
import TextBlue from '../../../shared/Components/TextBlue/TextBlue'
import { purple, yellow } from '@mui/material/colors'
// import useGetJoinedDate from '../../../Hooks/useGetJoinedDate'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'

import './NavProfile.scss'


const NavProfile = ({
	user: {
		avatar,
		background_image,
		username,
		description,
		following,
		followers,
		userID,
		self_post,
	},
	
	isFollowing,
	handleButtonClick
}) => {
	const navigate = useNavigate()
	return (
		<div className="container__navProfile">
			<section className="header__navProfile">
				<div className="goBack">
					<i>
						<ArrowBackOutlinedIcon />
					</i>
				</div>
				<div>
					<h2 style={{ marginBottom: '1px' }}>{username}</h2> {/* Add margin-bottom here */}
					<span>{self_post.length} Tweets</span>
				</div>
			</section>
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					< img src={background_image} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={avatar} size='133' />
					</div>
				</div>
				
				{/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<div className='btn__followProfile-container'>
						<Button variant="contained"
                	style={{ backgroundColor: purple[500]}}
                	>
							{'Edit Profile'}
                	</Button>
					</div>
				</div> */}
				<div className='btn__editProfile-container'>
					<div className='btn_editProfile-content'>
						<span>Edit Profile</span>
					</div>
				</div>
				{/* <div className='btn__followProfile-container'>
  					<div className='btn_editProfile-content' onClick={handleButtonClick}>
    					<span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
 	 				</div>
				</div>
				 */}
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<div className='btn__editProfile-container'>
						<Button variant="contained"
                	style={{ backgroundColor: isFollowing ? yellow[800] : purple[500], color: 'white'}}
                	onClick={handleButtonClick}>
                 		{isFollowing ? 'Unfollow' : 'Follow'}
                	</Button>
    				</div>
				</div>
				<div className="main__dataProfile">
					<div className='main__dataProfile-User'>
						<h2>{username}</h2>
						<span>@{userID}</span>
					</div>
					<div className='main__dataProfile-description'>
						<div>
							{description}
						</div>
					</div>
					<div className='main__followBtns'>
						<div>
							<span className='followBtn__number'>{following.length}</span>
							<span className='followBtn__text'onClick={() => navigate('/followList')}>Following</span>
						</div>

						<div>
							<span className='followBtn__number'>{followers.length}</span>
							<span className='followBtn__text'onClick={() => navigate('/followList')}>Followers</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default NavProfile