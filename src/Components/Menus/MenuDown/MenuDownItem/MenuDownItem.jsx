/**
 * MenuDownItem.js
 * Description: This file defines the MenuItem component, which represents a single item in the dropdown menu.
 * Dependencies:
 * - React: Library for building user interfaces.
 * - react-router-dom: React library for routing in web applications.
 * - MenuActiveContext: Context for managing active menu tab.
 * 
 * Example Usage:
 * import MenuItem from './MenuDownItem';
 * <MenuItem option={{ icon, icon2, url, label }} />
 * 
 */

import {useContext} from 'react'
import { Link } from 'react-router-dom'
import './MenuDownItem.scss'
import {MenuActiveContext} from '../../../../Context/menuActive'

const MenuItem = ({
	option: { 
		icon,
		icon2,
		url,
		label
	}
}) => {
	const contextMenuActive=useContext(MenuActiveContext)
	const isActive=label===contextMenuActive?.activeTab
	const handleActive=()=>contextMenuActive?.setTab(label)
	return (
		<div className="MenuDownItem__exteriorContent">
			<div className={`${isActive ? 'active' :''}`} onClick={handleActive}>
				<Link to={url}>
					<div className="menuDownItem__content">
						{isActive ? 
							<label>{icon2}</label>
							:
							<label>{icon}</label>
						}
					</div>
				</Link>
			</div>
		</div>
	)
}

export default MenuItem
