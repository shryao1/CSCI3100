import './Trends.scss'
import { useState } from 'react'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import SearchLogo from './search_logo.png'
import SearchIcon from './search_icon.png'
import sad from './sad.png'
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose'
const Trends = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [showUsers, setShowUsers] = useState(false)
	const [showTweets, setShowTweets] = useState(false)
	const [postData, setPostData] = useState(null)
	const [userData, setUserData] = useState(null)
	const navigate = useNavigate()
	
	
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
						<button className="search-button" onClick={() => navigate('/')}>SearchPosts
						</button>
						<button className="search-button" onClick={() => navigate('/')}>SearchUsers
						</button>
					</div>
				</div>
				<img src={SearchLogo} alt="Search Logo" className="search-logo" style={{width: 320, height: 320}}/>
				{showUsers && ( // Conditionally render the tweets list
					<div className="trends__tweetsList" onClick={() => navigate('/')}>
						{userData === null || userData.length === 0 ? (
            				<p>
            				</p>
          					) : (
							<ul>
								{userData && userData.map((user) => (
									<li key={user.userID}>
										<div className="tweet__container-tweetData" >
											{user && (
    											<img
        										src={`data:image/jpeg;base64,${user.avatar}`}
        										alt="User.Avatar"
													style={{ width: '48px', height: '48px' }}
    									/>
											)}
											<span className="username">{user.username}</span>
										</div>
									</li>
								))}
							</ul>
							
						)}
					</div>
				)}
				{showTweets && ( // Conditionally render the tweets list
					<div className="trends__tweetsList" onClick={() => navigate('/')}>
						{postData === null || postData.length === 0 ? (
            				<p>
              					Sorry, CUChat couldn't find the relevant post.
              					<img src={sad} alt="something wrong" className="search-logo" style={{ width: 320, height: 320 }} />
            				</p>
          					) : (
							postData.map((post) => (
								<TweetPost key={post.postID} post={post} onClick={() => navigate('/')}/>
							))
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Trends
