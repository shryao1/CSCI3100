/*
 * LayoutLogin.js
 * 
 * Description: This file contains the LayoutLogin component, which provides the overall structure for the login layout.
 * 
 * Dependencies: None
 */


import './LayoutLogin.scss'

const LayoutLogin = ({ children }) => {
	return (
		<div className="LayoutLogin__Container">
			<div className="ContainerLogin__Content">	
				<div className="Content__Page">
					<section className="Content__page">
						{children}
					</section>
				</div>
			</div>
		</div>
	)
}

export default LayoutLogin