/*
 * MenuItem.jsx
 * 
 * Description: This file contains the MenuItem component, which represents an individual item in a menu.
 * 
 * Dependencies:
 * - react-router-dom (https://reactrouter.com/)
 * - menuActive context (../../../../Context/menuActive)
 */


import {useContext} from 'react'
import { Link } from 'react-router-dom'
import './MenuItem.scss'
import {MenuActiveContext} from '../../../../Context/menuActive'

const MenuItem = ({
	option: { 
		icon,
		icon2,
		url,
		label,
		className,
		id
	}
}) => {
	const contextMenuActive=useContext(MenuActiveContext)
	const isActive=label===contextMenuActive?.activeTab
	const handleActive=()=>contextMenuActive?.setTab(label)
	const itemClasses = `menuItem__content ${isActive ? 'active' : ''} ${label === 'Explore' ? 'explore' : ''} ${className}`
	return (
		<div className="MenuItem__exteriorContent">
			<div className={`${isActive ? 'active' :''} ${className}`} onClick={handleActive} id={id}>
				<Link to={url}>
					<div className="menuItem__content">
						{isActive ? 
							<label>{icon2}</label>
							:
							<label>{icon}</label>
						}
						<span className="menuItem__label">{label}</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default MenuItem
