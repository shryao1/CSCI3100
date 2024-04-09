import axios from 'axios'
const PRODUCTION_URL = 'http://localhost:3001'
const LOCAL_URL = 'http://localhost:3001'

export const getAllPost = async () => {
	try {
		const response = await fetch('http://localhost:3001/getallpost')
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const getUser = async (userID) => {
	try {
		const response = await fetch(`${PRODUCTION_URL}/user/${userID}`)
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// export const getUserPosts = async (userID) => {
// 	try {
// 		const response = await fetch(`${PRODUCTION_URL}/user/posts/${userID}`)
// 		const data = await response.json()
// 		return data
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

export const myGetUser = async (userID) => {
	try {
		const response = await fetch(`${LOCAL_URL}/profile/${userID}`)
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const myGetUserPosts = async (userID) => {
	try {
		const data = await fetch(`${LOCAL_URL}/post/${userID}`)
		console.log(data)
		return data
	} catch (error) {
		console.error(error)
	}
}


export const newPost = async (newPost) => {
	try{
		const response = await fetch('http://localhost:3001/post', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(newPost),
		  }
		)
		if (!response.ok) {
			// If the response is not okay, throw an error with the status
			throw new Error('HTTP error! status: ${response.status}')
		  }
	  
		  const data = await response.json()
		  return data // This will be the resolved value of the returned promise
	} catch (error) { console.error('Error posting new post:', error)
		  throw error // Re-throw the error so it can be caught by the caller
	}
}

export const deletePost = async (username, id) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const req = axios.delete(`${LOCAL_URL}/post/delete/${username}/${id}`, config)
	return req
		.then((res) => res.data)
		.catch(error => { console.error(error) })
}

export const newComment = async (username, id, newComment) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const req = axios.put(`${LOCAL_URL}/post/comment/${username}/${id}`, newComment, config)
	return req
		.then((res) => res.data)
		.catch(error => { console.error(error) })
}

export const newLike = async (id, newLike) => {
	console.log(id)
	console.log(newLike)
	try{
		const response = await fetch(`http://localhost:3001/newlike/${id}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(newLike)
		  }
		)
		if (!response.ok) {
			// If the response is not okay, throw an error with the status
			throw new Error('HTTP error!')
		  }
		  const data = await response.json()
		  return data 
	} catch (error) { console.error('Error posting new post:', error)
		  throw error // Re-throw the error so it can be caught by the caller
	}
}

export const newDislike = async (id, newDislike) => {
	try{
		const response = await fetch(`http://localhost:3001/newdislike/${id}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDislike)
		  }
		)
		if (!response.ok) {
			// If the response is not okay, throw an error with the status
			throw new Error('HTTP error!')
		  }
		  const data = await response.json()
		  return data 
	} catch (error) { console.error('Error posting new post:', error)
		  throw error // Re-throw the error so it can be caught by the caller
	}
}

export const GetUser = async (userID) =>{
	try{
		const response = await fetch('http://localhost:3001/getuser', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({userID:userID})
		  }
		)
		if (!response.ok) {
			// If the response is not okay, throw an error with the status
			throw new Error('HTTP error!')
		  }
		  const data = await response.json()
		  return data 
	} catch (error) { console.error('Error posting new post:', error)
		  throw error // Re-throw the error so it can be caught by the caller
	}
}


export const GetUserA = async (userID) =>{
	try{
		const response = await fetch('http://localhost:3001/getusera', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({userID:userID})
		  }
		)
		if (!response.ok) {
			// If the response is not okay, throw an error with the status
			throw new Error('HTTP error!')
		  }
		  const data = await response.json()
		  return data 
	} catch (error) { console.error('Error posting new post:', error)
		  throw error // Re-throw the error so it can be caught by the caller
	}
}



export const signUpUser = async (register) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const req = axios.post(`${LOCAL_URL}/login/register`, register, config)
	return req
		.then((res) => res.data)
		.catch((err) => { console.error(err) })
}

export const verificationAccount = async (userIdentification) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const req = axios.post(`${LOCAL_URL}/login/verify`, userIdentification, config)
	return req
		.then((res) => res.data)
		.catch((err) => { console.error(err) })
}

export const logInUser = async (logInUser) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const req = axios.post(`${LOCAL_URL}/login/`, logInUser, config)
	return req
		.then((res) => res.data)
		.catch((err) => { console.error(err) })
}
