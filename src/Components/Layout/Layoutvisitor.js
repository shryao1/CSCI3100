/*
 * Layoutvisitor.js
 * 
 * Description: This file contains the Layout component, which provides the overall structure for the application layout.
 * 
 * Dependencies:
 * - Menuvisitor component (../Menus/Menu/Menuvisitor)
 * - MenuDownvisitor component (../Menus/MenuDown/MenuDownvisitor)
 * - Trendsvisitor component (../Trends/Trendsvisitor)
 * - react-router-dom (https://reactrouter.com/)
 */


import Menuvisitor from '../Menus/Menu/Menuvisitor'
import MenuDownvisitor from '../Menus/MenuDown/MenuDownvisitor'
import Trendsvisitor from '../Trends/Trendsvisitor'
import { useNavigate } from 'react-router-dom'
import './Layout.scss'

const Layout = ({ children }) => {
	const navigate = useNavigate()
	return (
		<div className="Layout__container">
			<div className="container__content">
				<div className="container__menu">
					<Menuvisitor onClick={() => navigate('/')}/>
				</div>
				<div className="content__main">
					<section className="Content__page">
						{children}
					</section>
					<div className="container__trends">
						<Trendsvisitor onClick={() => navigate('/')}/>
					</div>
				</div>
				<div className="container__MenuDown">
					<MenuDownvisitor onClick={() => navigate('/')}/>
				</div>
			</div>
		</div>
	)
}

export default Layout
