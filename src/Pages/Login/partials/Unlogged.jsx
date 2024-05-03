/**
 * Unlogged.js
 *
 * Description: This file contains the Unlogged component, which displays the login form for unauthenticated users.
 * 
 * @param {Function} setLogin - The function to set the login status.
 * @param {Function} navigate - The function to navigate to another page.
 * @returns {JSX.Element} The rendered component.
 * 
 * Example Usage:
 * <Unlogged setLogin={setLogin} navigate={navigate} />
 */
 
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
					if(data.userID=='0'){
						//redirect for admin
						navigate('/admin')

					}
					else{
						//redirect for normal user
						navigate(`/home/${data.userID}`)
					}
			
				} else {
					// Handle login failure
					console.log(data.message) 
				}
			} catch (error) {
				console.error('Failed to log in:', error)
				alert('Wrong UserID or Password!') 
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
