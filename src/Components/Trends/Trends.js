import './Trends.scss'
import { useState } from 'react'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import SearchLogo from './search_logo.png'
import SearchIcon from './search_icon.png'
import sad from './sad.png'
import { Link } from 'react-router-dom'
import { set } from 'mongoose'
const Trends = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [showUsers, setShowUsers] = useState(false)
	const [showTweets, setShowTweets] = useState(false)
	const [postData, setPostData] = useState(null)
	const [userData, setUserData] = useState(null)
	const owner = localStorage.getItem('userTwitterClone')
	const fetchPostsByContent = async (query) => {
		setShowTweets(true)
		fetch('http://localhost:3001/listpost')
            	.then((response) => {
                	if (!response.ok) {
                    	  throw new Error('Network response was not ok')
                	}
                	return response.json()
            	})
            	.then((data) => {
				const lowerCaseQuery = query ? query.toLowerCase() : ''
				const filteredData = data.filter(post => {
					const includes = post && post.content && post.content.toLowerCase().includes(lowerCaseQuery)
					return includes
				})
				setPostData(filteredData)
				//console.log('here is test',filteredData)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
	}
	const fetchUsersByContent = async (query) => {
		setShowUsers(true)
		fetch('http://localhost:3001/listuserforsearch')
            	.then((response) => {
                	if (!response.ok) {
                    	  throw new Error('Network response was not ok')
                	}
                	return response.json()
            	})
            	.then((data) => {
				//console.log('data', data)
				const lowerCaseQuery = query ? query.toLowerCase() : ''
				//console.log('lowerCaseQuery', lowerCaseQuery)
				const filteredData = data.filter(user => {
					const matchesQuery = 
						(user && user.username && user.username.toLowerCase() ===lowerCaseQuery) || // Check username
						(user && user.userID && user.userID.toLowerCase() ===lowerCaseQuery) // Check userID
					//console.log('matchesQuery', matchesQuery)
					return matchesQuery
				})
				setUserData(filteredData)
				//console.log('here is test',filteredData)
            	})
            	.catch((error) => {
               		console.error('Error fetching user data:', error)
            	})
	}
	return (
		<div className='trends__container' style={{ justifyContent: 'start', marginTop: '10px' }}>
			<div className="container__search" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<input
						type="text"
						className="search-input"
						placeholder="Type Anything Here..."
						aria-label="Search trends"
						style={{
							backgroundImage: `url(${SearchIcon})`,
							backgroundSize: '21px 21px',
							backgroundPosition: '10px center',
							backgroundRepeat: 'no-repeat',
							paddingLeft: '45px' // Adjust as necessary
						}}
						value={searchQuery}
            			onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className='button-container'>
						<button className="search-button" onClick={() => fetchPostsByContent(searchQuery)}>SearchPosts
						</button>
						<button className="search-button" onClick={() => fetchUsersByContent(searchQuery)}>SearchUsers
						</button>
					</div>
				</div>
				<img src={SearchLogo} alt="Search Logo" className="search-logo" style={{width: 320, height: 320}}/>
				{showUsers && ( // Conditionally render the tweets list
					<div className="trends__tweetsList">
						{userData === null || userData.length === 0 ? (
            				<p>
            				</p>
          					) : (
							<ul>
								{userData && userData.map((user) => (
									<li key={user.userID}>
										<Link to={`/profile/${owner}/${user.userID}`} className="tweet__container-tweetData" >
											{user && (
    											<img
        										src={`data:image/jpeg;base64,${user.avatar}`}
        										alt="User.Avatar"
													style={{ width: '48px', height: '48px' }}
    									/>
											)}
											<span className="username">{user.username}</span>
										</Link>
									</li>
								))}
							</ul>
							
						)}
					</div>
				)}
				{showTweets && ( // Conditionally render the tweets list
					<div className="trends__tweetsList">
						{postData === null || postData.length === 0 ? (
            				<p>
              					Sorry, CUChat couldn't find the relevant post.
              					<img src={sad} alt="something wrong" className="search-logo" style={{ width: 320, height: 320 }} />
            				</p>
          					) : (
							postData.map((post) => (
								<TweetPost key={post.postID} post={post} />
							))
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Trends
