import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UnLogged from './partials/Unlogged'
import './Login.scss'
import CloseIcon from '@mui/icons-material/Close'

const Login = () => {
	const [login, setLogin] = useState(false)
	const navigate = useNavigate()

	// Redirects to home if already logged in
	if (login) {
		navigate('/home')
	}

	return (
		<div className="login_container">
			<div className="login">
				<div className="login_up_container">
					<div className="login_exit" onClick={() => navigate('/')}>
						<CloseIcon />
					</div>
				</div>
				{!login && <UnLogged setLogin={setLogin} navigate={navigate} />}
			</div>
		</div>
	)
}

export default Login
