import { Link } from 'react-router-dom'

import TwitterIcon from '@mui/icons-material/Twitter'

import './Default.scss'

import CUChatIcon from './img/CUChatIcon.png'

const Default = () => {
	return (
		<div className="default__containerPage">
			<div className="default__complete">
				<div className="default__menuInitial">
					<div className="content">
						<div className="icon">
							<img src = {CUChatIcon} alt = "Custom Twitter Icon" style={{ width: '80px', height: '80px' }}/>
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
								<span>Sign up with Email</span>
							</Link>
							<div className="message__cookies">
								By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including the <span>Use of Cookies policy</span>.
							</div>
						</div>
						
					</div>
				</div>
				<div className="default__imageInitial">
					<div>
						<img src="https://croucher-public.s3.ap-southeast-1.amazonaws.com/variants/yb/images/files/747/original/Michael%20Lyu%20Rung%20Tsong.jpg/fcdcc20eeffd52dc907244b89ce897d28c3432b852ff7fd0ddcf62abeded2e5d" alt="bg tweeter initial Page" />
						<div></div>
					</div>
					<div className="logo">
						<img src = {CUChatIcon} alt = "Custom Twitter Icon" style={{ width: '400px', height: '400px' }}/>
					</div>
				</div>
			</div>
			<div className="navigation">
				<nav className="navBottom">
					<span>About</span>
					<span>Help center</span>
					<span>Terms of Service</span>
					<span>Privacy policies</span>
					<span>Cookies policy</span>
					<span>Accessibility</span>
					<span>Ad information</span>
					<span>Blog</span>
					<span>State</span>
					<span>Jobs</span>
					<span>Brand resources</span>
					<span>Advertising</span>
					<span>Marketing</span>
					<span>Twitter for business</span>
					<span>Developers</span>
					<span>Guide</span>
					<span>Setting</span>
					<span>CloneTwitter &copy;{new Date().getFullYear()}</span>
				</nav>
			</div>
		</div>
	)
}

export default Default