import { useState } from 'react'

const Unlogged = ({ setLogin, navigate }) => {
	const [userID, setUserID] = useState('')
	const [password, setPassword] = useState('')

	const verificationExistsAccount = async () => {
		if (password !== '' && userID !== '') {
			try {
				const response = await fetch('http://localhost:3001/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					
					body: JSON.stringify({
						userID,
						password,
					}),
				})

				const data = await response.json()

				if (response.ok) {
					localStorage.setItem('userTwitterClone', data.userID)
					navigate('/home')
				} else {
					// Handle login failure (you might want to set a state to show the error message)
					console.log(data.message) // Assuming the backend sends back a message field on error
				}
			} catch (error) {
				console.error('Failed to log in:', error)
				// Handle login failure (you might want to set a state to show the error message)
			}
		}
	}

	return (
		<div className="login_body_container">
			<div className="login_title">
				<span className="login_span_title">Log in to CUChat</span>
			</div>
			<div className="login_divider">
				<div className="divider"></div>
			</div>

			{/* Your form elements and input handlers */}
			<div className="login_enter_userid">
				<label className={`login_info ${userID !== '' ? 'show' : 'hide'}`}>
					<span className="login_span_info">User ID</span>
				</label>
				<input type="text"
					className="enter_login_info"
					value={userID}
					onChange={(e) => setUserID(e.target.value)}
					placeholder="    UserID"
					required
				/>
			</div>
			<div className="login_enter_password">
				<label className={`login_info ${password !== '' ? 'show' : 'hide'}`}>
					<span className="login_span_info">Password</span>
				</label>
				<input type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="    Password"
					required
				/>
			</div>
			<div className="login_button_login">
				<label type="button" className="login_button" onClick={() => verificationExistsAccount()}>
					<span className="login_span">Login</span>
				</label>
			</div>
		</div>
	)
}

export default Unlogged
