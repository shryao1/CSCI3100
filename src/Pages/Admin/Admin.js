import './Admin.scss'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import CreatePost from './CreatePost'
// import UpdatePost from './UpdatePost'
import CreateUser from './CreateUser'
// import UpdateUser from './UpdateUser'













const Admin = () => {
	const navigate = useNavigate()
	return(
		<>
		  <Routes>
				<Route index element={<MainContent />} />
				<Route path="userDatabase" element={<UserDatabase />} />
				<Route path="postDatabase" element={<PostDatabase />} />
				<Route path="createUser" element={<CreateUser navigate={navigate} />} />
				<Route path="createPost" element={<CreatePost navigate={navigate} />} />
				{/* <Route path="updateuser/:userID" element={<UpdateUser navigate={navigate}/>} /> */}
				{/* <Route path="updatepost/:postID" element={<UpdatePost navigate={navigate}/>} /> */}
				<Route path="*" element={<NoMatch />} />
	  	</Routes>
		</>
	)
	
}


const MainContent = () => {
	const navigate = useNavigate()

	return (
	  <main className="container">
			<h1>Hi, admin!</h1>
			<h2>Click Post Database and User Datebase to check and modify!</h2>
			<button className="create-btn" onClick={() => navigate('/Admin/userDatabase')}>View User</button>
			<button className="create-btn" onClick={() => navigate('/Admin/postDatabase')}>View Post</button>
			<button className="create-btn" onClick={() => navigate('/')}>Log Out</button>
	  </main>
	)
}

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




const UserDatabase = () => {
	const [userData, setUserData] = useState([])
	const navigate = useNavigate()

	const handleChange = (e, userID) => {
		const { name, value } = e.target
		setUserData(currentUserData =>
			currentUserData.map(user =>
				user.userID === userID ? { ...user, [name]: value } : user
			)
		)
		console.log(userData)
	}
	


	useEffect(() => {
	  fetch('http://localhost:3001/listuser')
			.then((response) => {
		  if (!response.ok) {
					throw new Error('Network response was not ok')
				}
		  return response.json()
			})
			.then((data) => {
		  setUserData(data)
			})
			.catch((error) => {
		  console.error('Error fetching user data:', error)
			})
	}, [])


	const handleDelete = (uid) => {
	  const confirmDelete = window.confirm('Are you sure you want to delete this user?')
	  if (confirmDelete) {
			fetch(`http://localhost:3001/deleteuser/${uid}`, {
		  		method: 'DELETE',
			})
		  	.then((response) => {
					if (!response.ok) throw new Error('Network response was not ok.')
					setUserData((prevData) =>
			  			prevData.filter((user) => user.userID !== uid)
					)
		  		})
		  	.catch((error) => {
					console.error('Error:', error)
		  		})
		}
	}
	
	const handleUpdate = (user) => {
		fetch('http://localhost:3001/updateuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userID: user.userID,
            	username: user.username, 
            	password: user.username, 
				followers: user.followers,
				following: user.following,
				likePost: user.likePost,
				dislikePost: user.dislikePost,
				favorite:user.favorite,
				introduction: user.introduction,

			}),
		})
			.then(response => {
				if (response.ok) {
					window.alert('User update')
					navigate('/Admin')
					return response.json()
				}
				throw new Error('Network response was not ok.')
			})
			.catch((error) => {
				console.error('Error:', error)
		  	})
	}

	return (
	  <main className="container">
			<h1>User Database</h1>
			<button className="create-btn" onClick={() => navigate('/Admin/createUser')}>
		  	Create New User
			</button>
			<button className="create-btn" onClick={() => navigate('/Admin')}>
		  	Go back
			</button>
			<div className="line"></div>
			{userData && (
		  		<ul>
					{userData.map((user) => (
						<li key={user.userID}> 
							<strong>User ID:</strong> {user.userID}
	  						<br />
							<label className="form-label">
								<strong>User Name:</strong>
								<input
									type="text"
									name="username"
									value={user.username}
									placeholder={user.username}
									onChange={(e) => handleChange(e, user.userID)}
									required
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Password:</strong>
								<input
									type="text"
									name="password"
									value={user.password}
									placeholder={user.password}
									onChange={(e) => handleChange(e, user.userID)}
									required
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Followers:</strong>
								<input
									type="text"
									name="followers"
									value={user.followers}
									placeholder={user.followers}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Following:</strong>
								<input
									type="text"
									name="following"
									value={user.following}
									placeholder={user.following}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Liked Posts:</strong>
								<input
									type="text"
									name="likepost"
									value={user.likePost}
									placeholder={user.likePost}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Couponed Posts:</strong>
								<input
									type="text"
									name="couponpost"
									value={user.dislikePost}
									placeholder={user.dislikePost}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Favorite Posts:</strong>
								<input
									type="text"
									name="favoritepost"
									value={user.favorite}
									placeholder={user.favorite}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<label className="form-label">
								<strong>Introduction:</strong>
								<input
									type="text"
									name="introduction"
									value={user.introduction}
									placeholder={user.introduction}
									onChange={(e) => handleChange(e, user.userID)}
									className="form-input"
									style={styles.formInput}
								/>
							</label>
							<strong>Self post:</strong> {user.self_post.join(',' )}
	  						<br />		
					
							<button onClick={() => handleUpdate(user)}>Update</button>
	  						<button onClick={() => handleDelete(user.userID)}>Delete</button>
						</li>
  					))}
		  		</ul>
			)}
	  </main>
	)
}

  



const PostDatabase = () => {
	const [postData, setPostData] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		fetch('http://localhost:3001/listpost')
			.then((response) => {
				if (!response.ok) {
					  throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => {
				setPostData(data)
				//console.log(data)
			})
			.catch((error) => {
				console.error('Error fetching user data:', error)
			})
	  }, [])
  
  
	const handleDelete = (pid) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this post?')
		if (confirmDelete) {
			  fetch(`http://localhost:3001/deletepost/${pid}`, {
				method: 'DELETE',
			  })
				.then((response) => {
					  if (!response.ok) throw new Error('Network response was not ok.')
					setPostData((prevData) =>
						prevData.filter((post) => post.postID !== pid)
					  )
				})
				.catch((error) => {
					  console.error('Error:', error)
				})
		  }
	}
  
	return (
	  <main className="container">
			<h1>Post Database</h1>
  
			<button className="create-btn" onClick={() => navigate('/Admin/createPost')}>
		  	Create New Post
			</button>
			<button className="create-btn" onClick={() => navigate('/Admin')}>
		  	Go back
			</button>
			<div className="line"></div>
			{postData && (
		  		<ul>
					{postData.map((post) => (
			  			<li key={post.postID}>
							<strong>Post ID:</strong> {post.postID}
							<br />
							<strong>Tag:</strong> {post.tag}
							<br />
							<strong>User ID:</strong> {post.userID}
							<br />
							<strong>Content:</strong> {post.content}
							<br />
							<strong>Like:</strong> {post.like}
							<br />
							<strong>Dislike:</strong> {post.dislike}
							<br />
							<strong>Visibility:</strong> {post.visible}
							<br />
							<button onClick={() => handleDelete(post.postID)}>Delete</button>
			  			</li>
					))}
		  		</ul>
			)}
	  </main>
	)
}
  



// const UpdatePostButton = ({ postID }) => {
// 	const navigate = useNavigate()
  
// 	const handleUpdate = () => {
// 	  navigate(`/Admin/updatepost/${postID}`)
// 	}
  
// 	return <button className="update-btn" onClick={handleUpdate}>Update</button>
// }
  
// const UpdateUserButton = ({ userID }) => {
// 	const navigate = useNavigate()
  
// 	const handleUpdate = () => {
// 	  navigate(`/Admin/updateuser/${userID}`)
// 	}
  
// 	return <button className="update-btn" onClick={handleUpdate}>Update</button>
// }








const NoMatch = () => {
	const location = useLocation()
	return (
	  <div>
			<h3>
		  		No Match for <code>{location.pathname}</code>
			</h3>
	  </div>
	)
}

export default Admin