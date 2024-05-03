/**
 * CreatePost.js
 *
 * Description: This file contains a component for creating a new post.
 * 
 * @param {object} e - The event object.
 * @returns {void}
 * 
 * Example Usage:
 * <CreatePost />
 */

import React from 'react'

class CreatePost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			tag: '',
			like: 0,
			dislike: 0,
			content: '',
			visible: 1
		}
	}

	handleChange = (element) => {
		this.setState({ [element.target.name]: element.target.value })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch('http://localhost:3001/createpost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userID: this.state.userID,
            	content: this.state.content, 
            	visible: this.state.visible,
				tag: this.state.tag,
				like: this.state.like,
				dislike: this.state.dislike,
			}),
		})
			.then(response => {
				if (response.ok) {
					window.alert('Post created')
					this.props.navigate('/Admin/postDatabase')
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
				<h2>Create a New Post
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
					Post Content:
					<input
						type="text"
						name="content"
						value={this.state.content}
						onChange={this.handleChange}
						required
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					Visibility:
					<input
						type="text"
						name="visible"
						value={this.state.visible}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					Tag:
					<input
						type="text"
						name="tag"
						value={this.state.tag}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					Like:
					<input
						type="text"
						name="like"
						value={this.state.like}
						onChange={this.handleChange}
						className="form-input"
						style={styles.formInput}
					/>
				</label>
				<label className="form-label">
					Dislike:
					<input
						type="text"
						name="dislike"
						value={this.state.dislike}
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
				<button type="submit" className="form-button">Create Post</button>
			</form>
			

		)
	}
}

export default CreatePost