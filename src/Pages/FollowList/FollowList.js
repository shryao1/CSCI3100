import './FollowList.scss'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import React from 'react'
import { useLocation } from 'react-router-dom'

const followers = ['Follower 1', 'Follower 2', 'Follower 3'] // Example followers

const FollowList = () => {
	const location = useLocation()
	const { userID } = useParams() // fetch the passed-in userID parameters from the search path
	const judger = localStorage.getItem('following')
	console.log(judger)
	// Assuming followers are passed as props or fetched from an API
  	return (
		<div>
			<h1>{ judger == 1 ? 'Followers' : 'Following'}</h1>
			<ul>
        	{followers.map((follower, index) => (
					<li key={index}>{follower}</li>
        	))}
			</ul>
		</div>
	)
}

export default FollowList