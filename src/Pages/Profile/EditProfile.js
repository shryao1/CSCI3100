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
				console.log(data)
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
	}

	const handleUpdate = (user) => {
		const ID = user.userID
		fetch('http://localhost:3001/updateprofile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userID: user.userID,
				username: user.username, 
				password: user.password, 
				//background_image: user.background_image,
				//avatar: user.avatar,
				introduction: user.introduction,

			}),
		})
			.then(response => {
				if (response.ok) {
					window.alert('Profile update')
					return response.json()
				}
				throw new Error('Network response was not ok.')
			})
			.catch((error) => {
				console.error('Error:', error)
		  	})
	}
  



	const uploadAvatar = (base64String, userID) => {
		// const fileInput = document.getElementById('fileInput1')
		// if (fileInput.files.length > 0) {
		// 	const file = fileInput.files[0]
		// 	console.log('File selected by the user:', file.name)
		// 	const formData = new FormData()
		// 	formData.append('avatar', file)

		// To display the image:
		//const reader = new FileReader()
		//reader.readAsDataURL(file) // Converts the file to a data URL and reads it
		fetch('http://localhost:3001/upload-avatar', {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({ avatar: base64String, userID: userID })
		}).then(response => {
			if (!response.ok) throw new Error('Upload failed')
			return response.json()
		})
			.then(result => {
				alert('Success')
				navigate(`/profile/${userData.userID}/${userData.userID}`)})
			.catch(error => console.error('Error:', error))
	}
	const uploadBG = (base64String, userID) => {
		// const fileInput = document.getElementById('fileInput1')
		// if (fileInput.files.length > 0) {
		// 	const file = fileInput.files[0]
		// 	console.log('File selected by the user:', file.name)
		// 	const formData = new FormData()
		// 	formData.append('avatar', file)

		// To display the image:
		//const reader = new FileReader()
		//reader.readAsDataURL(file) // Converts the file to a data URL and reads it
		fetch('http://localhost:3001/upload-background', {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({ background_image: base64String, userID: userID })
		}).then(response => {
			if (!response.ok) throw new Error('Upload failed')
			return response.json()
		})
			.then(result => {
				alert('Success')
				navigate(`/profile/${userData.userID}/${userData.userID}`)})
			.catch(error => console.error('Error:', error))
	}

  
	// const handleFileUpload = () => {
	// 	const fileInput = document.getElementById('fileInput1')
	// 	if (fileInput.files.length > 0) {
	// 		const file = fileInput.files[0]
	// 		const reader = new FileReader()
	// 		reader.onload = function(e) {
	// 			const arrayBuffer = e.target.result
	// 			//let readyavatar = uint8ArrayToBase64(arrayBuffer)
	// 			console.log(arrayBuffer)
	// 			setUserData(prevState => ({...prevState,[userData.avatar.data]: arrayBuffer}))
	// 			console.log(userData.avatar.data)
	// 		}
	// 		reader.readAsArrayBuffer(file)
	// 	}
	// }
	const convertToBase64 = (userID) => {
		const fileInput = document.getElementById('avatarInput')
		if (fileInput.files.length > 0) {
			const file = fileInput.files[0]
			const reader = new FileReader()
			reader.onloadend = function() {
				const base64String = reader.result.replace('data:', '')
					.replace(/^.+,/, '')// Optional: Removes the data type prefix
				uploadAvatar(base64String, userID)
				//navigate(`/profile/${userData.userID}/${userData.userID}`)
			}
			reader.readAsDataURL(file)
		}
	}

	const convertToBase64BG = (userID) => {
		const fileInput = document.getElementById('bgInput')
		if (fileInput.files.length > 0) {
			const file = fileInput.files[0]
			const reader = new FileReader()
			reader.onloadend = function() {
				const base64String = reader.result.replace('data:', '')
					.replace(/^.+,/, '')// Optional: Removes the data type prefix
				uploadBG(base64String, userID)
				//navigate(`/profile/${userData.userID}/${userData.userID}`)
			}
			reader.readAsDataURL(file)
		}
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
				<input type="file" id="avatarInput" accept="image/*" onChange={()=>convertToBase64(userID)}></input>
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
						<img src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(userData.background_image.data))}`} alt="User Background" style={{ display: 'block', margin: 'auto', width: '300px', height: '300px'}} />):(<div>No background available</div>)}
					</div>
					<div className={styles.profileEdit__footer}>
						<span>Background:</span>
						<input type="file" id="bgInput" accept="image/*" onChange={()=>convertToBase64BG(userID)}></input>
						{/* <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => handleFileUpload()} >Change Avatar</button> */}
						<button type="submit" className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => handleUpdate(userData)} >Save</button>
						<button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleExit}>Exit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProfileEdit
