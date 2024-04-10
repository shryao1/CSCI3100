import { deletePost } from '../../../Services/api'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

const deleteTweet = async (username, id) => {
	await deletePost(username, id)
}

export const ListOptions = [
	{ icon: <DeleteForeverOutlinedIcon />, url: 'asd', action: deleteTweet, label: 'Delete' },
]