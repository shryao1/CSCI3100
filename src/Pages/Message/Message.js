import NavMessage from '../../Components/NavPages/NavMessage/NavMessage'
import MessageItem from '../../Components/MessageItem/MessageItem'
import { useContext } from 'react'
import MessageContext from '../../Context/contextMessage'
import { useParams } from 'react-router-dom'
import './Message.scss'

const Message = () => {
	const { userID, chatwithID } = useParams() // fetch the passed-in userID parameters from the search path
	console.log(userID)
	console.log(chatwithID)

	const { userMessage } = useContext(MessageContext)
	return (
		<section className="message__container">
			<NavMessage />
			<div className="message__messageList">
				{userMessage?.map((post, id) => {
					return <MessageItem key={id} post={post} />
				})}
			</div>
		</section>
	)
}

export default Message
