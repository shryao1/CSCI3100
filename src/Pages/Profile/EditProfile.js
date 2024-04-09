import React, { useState, useEffect } from 'react'
import styles from './EditProfile.scss'
import { useNavigate, useParams } from 'react-router-dom'

const ProfileEdit = () => {
	const [userData, setUserData] = useState({})
	const navigate = useNavigate()
	const { userID } = useParams()



	const uint8ArrayToBase64 = (uint8Array) => {
		let binary = ''
		uint8Array.forEach((byte) => {
			binary += String.fromCharCode(byte)
		})
		return btoa(binary)
	}
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto', // Auto margins for horizontal centering
		alignItems: 'center',
		minHeight: '100vh', // Make sure it takes at least the full height of the viewport
	}
	useEffect(() => {
		const fetchUserData = async () => {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userID: userID })
			}
			
			try {
				const response = await fetch('http://localhost:3001/getuser', requestOptions)
				if (!response.ok) {
					throw new Error('Failed to fetch user data')
				}
				const data = await response.json()
				setUserData(data)
			} catch (error) {
				console.error('Error fetching user data:', error)
				// Handle error (show message to user, etc.)
			}
		}
		
		fetchUserData()
	}, [userID])

	const handleChange = (e) => {
		const { name, value } = e.target
		setUserData(prevState => ({
			...prevState,
			[name]: value
		}))
		console.log(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(userData)
	}

	const handleExit = () => {
		console.log('Exiting profile edit...')
		navigate(`/profile/${userData.userID}/${userData.userID}`)
	}

	return (
		<div className={styles.profileEdit}>
			<div className={styles.profileEdit__header}>
				<h2>Edit My Profile</h2>
			</div>
			<div style={containerStyle} className={styles.profileEdit__body}>
				<div className={styles.profileEdit__imageUpload}>{userData.avatar ? (
					<img src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(userData.avatar.data))}`} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />):(<div>No avatar available</div>)}
				</div>
				<strong>User ID:</strong> {userData.userID}

				<form className={styles.profileEdit__form} onSubmit={(e) =>handleChange(e)}>
					<div className={styles.inputContainer}>
						<label htmlFor="password">Password:</label>
						<input type="text" id="password" name="password" value={userData.password} placeholder={userData.password} onChange={(e) =>handleChange(e)} />
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="username">User Name:</label>
						<input type="text" id="username" name="username" value={userData.username} onChange={(e) =>handleChange(e)} />
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="introduction">Introduction:</label>
						<input type="text" id="introduction" name="introduction" value={userData.introduction} onChange={(e) =>handleChange(e)} />
					</div>
					<div className={styles.profileEdit__imageUpload}>{userData.background_image ? (
						<img src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(userData.background_image.data))}`} alt="User Background" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />):(<div>No background available</div>)}
					</div>
					<div className={styles.profileEdit__footer}>
						<button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>Save</button>
						<button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleExit}>Exit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProfileEdit
