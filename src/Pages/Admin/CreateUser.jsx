/**
 * CreateUser.js
 *
 * Description: This file contains a component for creating a new user.
 * 
 * @param {object} e - The event object.
 * @returns {void}
 * 
 * Example Usage:
 * <CreateUser />
 */

import React from 'react'

class CreateUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			username: '',
			password: '',
			introduction: ''
		}
	}

	handleChange = (element) => {
		this.setState({ [element.target.name]: element.target.value })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch('http://localhost:3001/createuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userID: this.state.userID,
            	username: this.state.username, 
            	password: this.state.username, 
            	introduction: this.state.introduction,
			}),
		})
			.then(response => {
				if (response.ok) {
					window.alert('User created')
					this.props.navigate('/Admin/userDatabase')
					return response.json()
				}
				throw new Error('Network response was not ok.')
			})
			.catch((error) => {
				console.error('Error:', error)
		  	})
	}
	  

	render() {
		const styles = {
			formContainer: {
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: '20px',
				padding: '20px',
				border: '1px solid #ccc',
				borderRadius: '5px',
			},
			formInput: {
				padding: '8px',
				width: 'calc(100% - 16px)',
				margin: '5px 0',
				borderRadius: '4px',
				border: '1px solid #ccc',
			}
	
		}
		return (
			<form onSubmit={this.handleSubmit} className="form-container" style={styles.formContainer}>
				<h2>Create a New User
				</h2>
				<label className="form-label">
					UserID:
					<input
						type="text"
						name="userID"
						value={this.state.userID}
						onChange={this.handleChange}
						required
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					User Name:
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						required
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					Password:
					<input
						type="text"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						required
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				{/* <label className="form-label">
					followers:
					<input
						type="text"
						name="followers"
						value={this.state.followers}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					following:
					<input
						type="text"
						name="following"
						value={this.state.following}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					likePost:
					<input
						type="text"
						name="likePost"
						value={this.state.likePost}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					dislikePost:
					<input
						type="text"
						name="dislikePost"
						value={this.state.dislikePost}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					favorite:
					<input
						type="text"
						name="favorite"
						value={this.state.favorite}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					avatar:
					<input
						type="text"
						name="avatar"
						value={this.state.avatar}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label> */}
				<label className="form-label">
					introduction:
					<input
						type="text"
						name="introduction"
						value={this.state.introduction}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				{/* <label className="form-label">
					background_image:
					<input
						type="text"
						name="background_image"
						value={this.state.background_image}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					newNotification:
					<input
						type="text"
						name="newNotification"
						value={this.state.newNotification}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					self_post:
					<input
						type="text"
						name="self_post"
						value={this.state.self_post}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label> */}
				<button type="submit" className="form-button">Create User</button>
			</form>
			

		)
	}
}

export default CreateUser