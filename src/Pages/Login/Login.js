import { useState } from 'react'
import { logInUser } from '../../Services/api'

import UnLogged from './partials/Unlogged'
import Logged from './partials/Logged'

import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'

import './Login.scss'

const Login = () => {
	const [dataInput, setDataInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const [login, setLogin] = useState(false)
	const [response, setResponse] = useState('')
	const navigate = useNavigate()

	const handleChangePassword = (e) => {
		setPasswordInput(e.target.value)
	}

	/** Need refactor */
	const handleLogInUser = async () => {
		if (passwordInput !== '') {
			let user = await logInUser({
				username: `@${dataInput}`,
				email: '',
				phone: '',
				password: passwordInput
			})
			if (user) {
				localStorage.setItem('userTwitterClone', user.username)
				window.location.href = '/home'
			}
		}
	}

	return (
		<div className="login_container">
			<div className="login">
				<div className="login_up_container">
					<div className="login_exit">
						<i onClick={() => navigate('/')}>
							<CloseIcon />
						</i>
					</div>
				</div>
				{!login &&
					<UnLogged
						dataInput={dataInput}
						setDataInput={setDataInput}
						setLogin={setLogin}
						setResponse={setResponse}
					/>
				}
				{login &&
					<Logged
						passwordInput={passwordInput}
						handleChangePassword={handleChangePassword}
						response={response}
						handleLogInUser={handleLogInUser}
					/>
				}
			</div>
		</div>
	)
}
export default Login