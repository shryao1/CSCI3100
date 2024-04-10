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
		introduction,
		following,
		followers,
		userID,
	},
	self_post,
	judge,
	isFollowing,
	handleButtonClick
}) => {
	const uint8ArrayToBase64 = (uint8Array) => {
		let binary = ''
		uint8Array.forEach((byte) => {
			binary += String.fromCharCode(byte)
		})
		return btoa(binary)
	}
	const navigate = useNavigate()
	// console.log(background_image)
	return (
		<div className="container__navProfile">
			<section className="header__navProfile">
				{/* <div className="goBack">
					<i>
						<ArrowBackOutlinedIcon />
					</i>
				</div> */}
				<div>
					<h2 style={{ marginBottom: '1px' }}>{username}</h2> {/* Add margin-bottom here */}
					<span>{self_post.length} Posts</span>
				</div>
			</section>
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					< img src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(background_image.data))}`} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={avatar.data} size='133' />
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
				
				{judge && (
					<div className='btn__editProfile-container'>
						<div className='btn_editProfile-content'>
							<span onClick={() => navigate(`/profileedit/${userID}`)}>Edit Profile</span>

						</div>
					</div>
				)}

				{!judge && (
    				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        			<div className='btn__editProfile-container'>
            		<Button variant="contained"
                		style={{ backgroundColor: isFollowing ? yellow[800] : purple[500], color: 'white'}}
                		onClick={handleButtonClick}>
                		{isFollowing ? 'Unfollow' : 'Follow'}
            		</Button>
        			</div>
    				</div>
				)}
				<div className="main__dataProfile">
					<div className='main__dataProfile-User'>
						<h2>{username}</h2>
						<span>@{userID}</span>
					</div>
					<div className='main__dataProfile-description'>
						<div>
							Introduction: {introduction}
						</div>
					</div>
					<div className='main__followBtns'>
						<div>
							<span className='followBtn__number'>{following.length}</span>
							<span className='followBtn__text'  onClick={() => {
								localStorage.setItem('following', 0)
								navigate(`/followList/${localStorage.getItem('userTwitterClone')}/${localStorage.getItem('visitUserID')}`)
							}
							}
							>Following</span>
						</div>

						<div>
							<span className='followBtn__number'>{followers.length}</span>
							<span className='followBtn__text' onClick={() => {
								localStorage.setItem('following', 1)
								navigate(`/followList/${localStorage.getItem('userTwitterClone')}/${localStorage.getItem('visitUserID')}`)
							}
							}>Followers</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default NavProfile