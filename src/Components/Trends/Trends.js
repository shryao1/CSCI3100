import './Trends.scss'
import { useState, useEffect } from 'react'
import TweetPost from '../../Components/Tweet/TweetPost/TweetPost'
import SearchLogo from './search_logo.png'
import SearchIcon from './search_icon.png'
import sad from './sad.png'
import { set } from 'mongoose'
const Trends = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [showTweets, setShowTweets] = useState(false)
	const [postData, setPostData] = useState(null)
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
				//console.log('data', data)
				//console.log('query', query)
				const lowerCaseQuery = query ? query.toLowerCase() : ''
				//console.log('lowerCaseQuery', lowerCaseQuery)
				const filteredData = data.filter(post => {
					//console.log('post:', post)
					//console.log('post.text:', post.content)
					//console.log('lowerCaseQuery:', lowerCaseQuery)
					const includes = post && post.content && post.content.toLowerCase().includes(lowerCaseQuery)
					//console.log('includes:', includes)
					return includes
				})
				setPostData(filteredData)
				console.log('here is test',filteredData)
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
					<button className="search-button" onClick={() => fetchPostsByContent(searchQuery)}>Search
					</button>
				</div>
				<img src={SearchLogo} alt="Search Logo" className="search-logo" style={{width: 320, height: 320}}/>
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
