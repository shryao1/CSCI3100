import './FollowList.scss'
import { useParams } from 'react-router-dom'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// const followers = ['Follower 1', 'Follower 2', 'Follower 3'] // Example followers

const FollowList = () => {
	const [followers, setFollowers] = useState(null)
	const { visituserID } = useParams()
	const { userID } = useParams()
	console.log('UserID:', visituserID) // Log the value of viewUser
	// const viewUser = localStorage.getItem('viewUser')
	const judger = localStorage.getItem('following')
	
	useEffect(() => {
		const fetchfollowers = async () => {
			console.log('Inside useEffect. UserID:', visituserID) // Log the value of viewUser
			if (visituserID) {
				fetch(`http://localhost:3001/getfollowers/${visituserID}`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok')
						}
						return response.json()
					})
					.then((data) => {
						setFollowers(data)
					})
					.catch((error) => {
						console.error('Error fetching user data:', error)
					})
			} else {
				console.warn('用户ID不可用')
			}
		}

		const fetchfollowings = async () => {
			console.log('Inside useEffect. UserID:', visituserID) // Log the value of viewUser
			if (visituserID) {
				fetch(`http://localhost:3001/getfollowings/${visituserID}`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok')
						}
						return response.json()
					})
					.then((data) => {
						setFollowers(data)
					})
					.catch((error) => {
						console.error('Error fetching user data:', error)
					})
			} else {
				console.warn('用户ID不可用')
			}
		}
		if (judger == 1)
			fetchfollowers()
		else fetchfollowings()

	}, [visituserID]) // Empty dependency array to run only on component mount

	const hahaha = followers
	console.log(hahaha)
	// Assuming followers are passed as props or fetched from an API
	return (

		<div>
			<h1>{judger === 1 ? 'Followers' : 'Following'}</h1>
			<ul>
				{followers && followers.map((follower) => (
					<li key={follower.username}>
						<div>
							{/* Assuming there's an avatar field in follower object */}
							{follower.avatar && <img src={follower.avatar} alt={null} />}
							<span>{follower.username}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

	
export default FollowList
