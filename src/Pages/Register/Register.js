/**
 * Message.js
 *
 * Description: This file contains the Message component, which displays a list of messages for a specific user.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * Example Usage:
 * <Message />
 */


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Register.scss'

const Register = () => {
	const navigate = useNavigate()

	const [user_name, setUser_name] = useState('')
	const [user_password, setUser_password] = useState('')

	const validation = () => {
		return user_name !== '' && user_password !== ''
	}

	const handleSignUp = async () => {
		if (validation()) {
			try {
				const response = await fetch('http://localhost:3001/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_name,
						user_password,
					}),
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				alert(`Register Successfully, Your User ID is ${data.userId}`)
				navigate('/home')
			} catch (error) {
				console.error('There has been a problem with your fetch operation:', error)
			}
		}
	}

	return (
		<div className="register__container">
			<div className="register__content">
				<div className="content__register">
					<input
						type="text"
						value={user_name}
						onChange={(e) => setUser_name(e.target.value)}
						className="registerInput__name"
						placeholder="    Username"
						required
					/>
				</div>
				<div className="content__register">
					<input
						type="password"
						value={user_password}
						onChange={(e) => setUser_password(e.target.value)}
						className="registerInput__password"
						placeholder="    Password"
						required
					/>
				</div>
				<div className="content__nextButton">
					<input
						type="button"
						value="Sign Up"
						onClick={handleSignUp}
						className="nextButton"
					/>
				</div>
			</div>
		</div>
	)
}

export default Register
