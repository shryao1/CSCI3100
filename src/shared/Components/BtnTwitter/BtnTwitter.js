import { useContext } from 'react'
import { useParams } from 'react-router-dom' // Import useParams
import { AppContext } from '../../../Context/AppContext'
import { MenuActiveContext } from '../../../Context/menuActive'
import { enableScroll } from '../../../Hooks/useScroll'
import { RetweetContext } from '../../../Context/RetweetContext'
import { getAllPost, newComment, newPost } from '../../../Services/api'
import './BtnTwitter.scss'

const BtnTwitter = ({
	label = 'BtnLabel',
	textPost,
	setTextPost,
	media_posted,
	isComment,
	toUser,
	idPost
}) => {

	const { userID } = useParams()
	const appContext = useContext(AppContext)
	const retweetContext = useContext(RetweetContext)
	const menuContext = useContext(MenuActiveContext)

	const ClosePopUp = () => {
		menuContext?.setPopUp(false)
		enableScroll()
		retweetContext?.setText('')
		retweetContext?.setThereIsText(false)
		retweetContext?.setAttachment(null)
		retweetContext?.setThereIsAttachment(false)
	}

	const handleSubmitNewPost = async (e) => {
		e.preventDefault()
		if(media_posted||!(textPost==='')){
			try {
				const response = await fetch('http://localhost:3001/post',{
					method: 'POST',
					headers:{
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userID: userID,
				 		text_posted: textPost,
						media_post: media_posted
					}),
				})
				if (!response.ok){
					throw new Error('Network response was not ok')
				}
				appContext?.setPosts(await getAllPost())
				if (menuContext?.popUp) {
					ClosePopUp()
				} else {
					setTextPost('')
				}
			} catch (error) {
				console.error(error)
			}
			window.location.reload()
		}
		else{
			alert('Media and Text Can Not Be Both Empty!')
		}
	}

	const handleSubmitNewComment = async (e) => {
		e.preventDefault()
		try {
			const Comment = {
				'userComment': appContext?.user?.username,
				'comment': textPost,
				'media': null
			}
			await newComment(toUser, idPost, Comment)
			appContext?.setPosts(await getAllPost())
			setTextPost('')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		/*<div className="container__btnTwitter" onClick={isComment ? handleSubmitNewComment : handleSubmitNewPost}>*/
		<div className="container__btnTwitter" onClick={handleSubmitNewPost}>
			<div>
				<span>{label}</span>
			</div>
		</div>
	)
}

export default BtnTwitter
