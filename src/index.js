/**
 * index.js
 *
 * Description: This file is the entry point of the React application. It renders the root component of the application.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './Routes/App'


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
