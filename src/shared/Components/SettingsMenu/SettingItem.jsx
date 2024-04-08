
import { useContext } from 'react'

import { AppContext } from '../../../Context/AppContext'

import './SettingItem.scss'

const MenuItem = ({
	id,
	username,
	option: {
		icon,
		url,
		action,
		label
	},
	handleShowMenu
}) => {
	const appContext = useContext(AppContext)

	const refreshPost = async () => {
		appContext?.setPosts(await appContext?.posts.filter(post => post.id !== id))
	}

	const activeAction = (action) => {
		action(username, id)
		if (action.name === 'deleteTweet') {
			refreshPost()
		}
		handleShowMenu(false)
	}
	/*const handleDelete = (pid) => {
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
    	}*/
	return (
		<li className="itemMenuTweet__container" onClick={() => activeAction(action)}>
			<div className="itemMenuTweet__Option" >
				<label className={`${label === 'Delete' ? 'delete' : ''}`}>{icon}</label>
				<span className={`${label === 'Delete' ? 'delete' : ''}`}>{label}</span>
			</div>
		</li>
	)
}

export default MenuItem