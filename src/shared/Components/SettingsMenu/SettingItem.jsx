/**
 * MenuItem.jsx
 *
 * Description: This file contains the MenuItem component, which represents an item in a menu.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the menu item.
 * @param {string} props.username - The username associated with the menu item.
 * @param {Object} props.option - The options for the menu item.
 * @param {React.ReactNode} props.option.icon - The icon for the menu item.
 * @param {string} props.option.url - The URL for the menu item.
 * @param {Function} props.option.action - The action to be performed when the menu item is clicked.
 * @param {string} props.option.label - The label for the menu item.
 * @param {Function} props.handleShowMenu - The function to handle showing the menu.
 * 
 * @returns {JSX.Element} The rendered menu item component.
 * 
 * Example Usage:
 * <MenuItem id="1" username="exampleUser" option={{ icon: <Icon />, url: "example.com", action: () => {}, label: "Example Label" }} handleShowMenu={() => {}} />
 */
 
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