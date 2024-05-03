/**
 * ListOptions.js
 *
 * Description: This JavaScript file defines the ListOptions array, which contains options for a list item, such as deleting a post.
 * Dependencies:
 * - deletePost: Function for deleting a post from the API.
 * - DeleteForeverOutlinedIcon: Material-UI icon for delete forever outline.
 * 
 * Example Usage:
 * import { ListOptions } from './ListOptions';
 * 
 * Note: Ensure that this array is imported and used appropriately within your application.
 */

import { deletePost } from '../../../Services/api'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

const deleteTweet = async (username, id) => {
	await deletePost(username, id)
}

export const ListOptions = [
	{ icon: <DeleteForeverOutlinedIcon />, url: 'asd', action: deleteTweet, label: 'Delete' },
]