/**
 * Default.js
 *
 * Description: This file contains the default landing page component.
 * 
 * @returns {void}
 * 
 * Example Usage:
 * <Default />
 */

import { Link } from 'react-router-dom'

import './Default.scss'

import CUChatIcon from './img/CUChatIcon.png'
import CUChatIconGIF from './img/CUChatIcon.gif'
import Michael from './img/Michael_photo.jpeg'

const Default = () => {
	return (
		<div className="default__containerPage">
			<div className="default__complete">
				<div className="default__menuInitial">
					<div className="content">
						<div className="icon">
							<img src = {CUChatIconGIF} alt = "Custom Twitter Icon" style={{ width: '80px', height: '80px' }}/>
						</div>
						<div className="text">
							<span className="big">
								Michael is Watching You Now !!!
							</span>
							<p className="little">
								I Love CUChat, Join it today.
							</p>
						</div>
						<div className="logIn">
							<div className="message__title">
								Do you already have an account?
							</div>
							<Link to={'/login'} className="login__option">
								Log in
							</Link>
						</div>
						<div className="signUpOptions">
							
							<div className="sectionOr">
								<div></div>
								<div>
									<span>or</span>
								</div>
								<div></div>
							</div>
							<Link to={'/register'} className="option phoneEmail">
								<span>Sign up</span>
							</Link>
						</div>
						<div className="signUpOptions">
							
							<div className="sectionOr">
								<div></div>
								<div>
									<span>or</span>
								</div>
								<div></div>
							</div>
							<Link to={'/visitor'} className="option phoneEmail">
								<span>Visitor Mode</span>
							</Link>
						</div>
						
					</div>
				</div>
				<div className="default__imageInitial">
					<div>
						<img src= {Michael} alt="bg tweeter initial Page" />
						<div></div>
					</div>
					<div className="logo">
						<img src = {CUChatIcon} alt = "Custom Twitter Icon" style={{ width: '400px', height: '400px' }}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Default