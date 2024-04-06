import './Admin.scss'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
// import CreatePostForm from "./CreatePostForm";
// import UpdatePostForm from "./UpdatePostForm";
// import CreateUserForm from "./CreateUserForm";
// import UpdateUserForm from "./UpdateUserForm";



// hard-code test data
const samplepost = [
	{ 
	  id: 1, 
	  userId: 1, 
	  title: 'Post 1', 
	  content: 'Content of Post 1', 
	  likes: 10, 
	  comments: [
			{ userId: 2, content: 'Comment 1 on Post 1' },
			{ userId: 3, content: 'Comment 2 on Post 1' }
	  	],
		availability: 0
	},
	{ 
	  id: 2, 
	  userId: 1, 
	  title: 'Post 2', 
	  content: 'Content of Post 2', 
	  likes: 5, 
	  comments: [
			{ userId: 2, content: 'Comment 1 on Post 2' },
			{ userId: 3, content: 'Comment 2 on Post 2' }
		],
		availability: -1
	},
	{ 
	  id: 3, 
	  userId: 2, 
	  title: 'Post 3', 
	  content: 'Content of Post 3', 
	  likes: 3, 
	  comments: [
			{ userId: 1, content: 'Comment 1 on Post 3' }
	  ],
	  availability: 1
	}
]
  









const Admin = () => (
	<>
	  <Routes>
			<Route index element={<MainContent />} />
			<Route path="userDatabase" element={<UserDatabase />} />
			<Route path="postDatabase" element={<PostDatabase />} />
			{/* <Route path="createPost" element={<CreatePostForm />} />
			<Route path="createUser" element={<CreateUserForm />} />
			<Route path="user/update/:userId" element={<UpdateUserForm />} />
			<Route path="post/update/:postId" element={<UpdatePostForm />} /> */}
			<Route path="*" element={<NoMatch />} />
	  </Routes>
	</>
)


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




const UserDatabase = () => {
	const [userData, setUserData] = useState([])
	const navigate = useNavigate()
  
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
		  console.log(data)
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
						<li key={user.userID}> {/* Make sure this is the correct identifier for your user */}
	  						<strong>User ID:</strong> {user.userID}
	  						<br />
	  						<strong>Password:</strong> {user.password}
	  						<br />
							<strong>User Name:</strong> {user.username}
	  						<br />
							<strong>Followers:</strong> {user.followers}
	  						<br />
							<strong>Following:</strong> {user.following}
	  						<br />
	  						<UpdateUserButton userId={user.id} /> {/* This should pass the correct user ID */}
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
		setPostData(samplepost)
	  	// fetch("http://localhost:3001/post")
		// .then((response) => response.json())
		// .then((data) => {
		//   setPostData(data);
		// })
		// .catch((error) => {
		//   console.error("Error fetching post data:", error);
		// });
	}, [])
  
	const handleDelete = (postId) => {
	  const confirmDelete = window.confirm('Are you sure you want to delete this post?')
	  if (confirmDelete) {
			fetch(`http://localhost:3001/post/${postId}`, {
		  	method: 'DELETE',
			})
		  .then((response) => {
					if (!response.ok) throw new Error('Network response was not ok.')
					// Remove the post from the state to update the UI
					setPostData((prevData) =>
			  		prevData.filter((post) => post.postId !== postId)
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
			  			<li key={post.postId}>
							<strong>Post ID:</strong> {post.id}
							<br />
							<strong>Post title:</strong> {post.title}
							<br />
							<strong>Content:</strong> {post.content}
							<br />
							<strong>Author ID:</strong> {post.userId}
							<br />
							<strong>Availability:</strong> {post.availability}
							<br />
							<UpdatePostButton postId={post.postId} />
							<button onClick={() => handleDelete(post.postId)}>Delete</button>
			  			</li>
					))}
		  		</ul>
			)}
	  </main>
	)
}
  





const UpdatePostButton = ({ postId }) => {
	const navigate = useNavigate()
  
	const handleUpdate = () => {
	  navigate(`/Admin/post/update/${postId}`)
	}
  
	return <button className="update-btn" onClick={handleUpdate}>Update</button>
}
  
const UpdateUserButton = ({ userId }) => {
	const navigate = useNavigate()
  
	const handleUpdate = () => {
	  navigate(`/Admin/user/update/${userId}`)
	}
  
	return <button className="update-btn" onClick={handleUpdate}>Update</button>
}








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