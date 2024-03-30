import { verificationAccount } from '../../../Services/api'


const Unlogged = ({
	dataInput,
	setDataInput,
	setLogin,
	setResponse
}) => {

	const handleChangeInput = (e) => {
		setDataInput(e.target.value)
	}
	const verificationExistsAccount = async () => {
		if (dataInput !== '') {
			let response = await verificationAccount({
				username: `@${dataInput}`,
				email: dataInput,
				phone: dataInput
			})
			if (response !== false) {
				setLogin(true)
				setResponse(response)
			}
		}
	}

	return (
		<div className="login_body_container">
			<div className="login_title">
				<span className="login_span_title">Log in to CUChat</span>
			</div>
			<div className="login_divider">
				<div className="divider"></div>
			</div>
			<div className="login_enter_mail">
				<label className={`login_info ${dataInput !== '' ? 'show' : 'hide'}`}>
					<span className="login_span_info">Email or Username</span>
				</label>
				<input type="text"
					className="enter_login_info"
					value={dataInput}
					onChange={(e) => handleChangeInput(e)}
					placeholder="       Email or Username"
					required
				/>

			</div>
			<div className="login_enter_password">
				<label className={`login_info ${dataInput !== '' ? 'show' : 'hide'}`}>
					<span className="login_span_info">Password</span>
				</label>
				<input type="text"
					className="enter_login_info"
					value={dataInput}
					onChange={(e) => handleChangeInput(e)}
					placeholder="       Password"
					required
				/>

			</div>
			<div className="login_button_login">
				<label type="button" className="login_button" onClick={() => verificationExistsAccount()}>
					<span className="login_span">Login</span>
				</label>
			</div>
			<div className="login_signup">
				<span className="login_message">You do not have an account?</span>
				<span className="login_link">Sign up</span>
			</div>
		</div>
	)
}

export default Unlogged