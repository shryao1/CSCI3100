/**
 * PopUp.js
 *
 * Description: This file contains the PopUp component, which displays a pop-up window with given children components.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children components to be displayed within the pop-up window.
 * 
 * @returns {JSX.Element} The rendered pop-up component.
 * 
 * Example Usage:
 * import PopUp from './PopUp';
 * <PopUp>...</PopUp>
 */
 
import { useContext } from 'react'
import { RetweetContext } from '../../../Context/RetweetContext'
import { MenuActiveContext } from '../../../Context/menuActive'
import { enableScroll } from '../../../Hooks/useScroll'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import './PopUp.scss'

const PopUp = ({ children }) => {
	const menuContext = useContext(MenuActiveContext)
	const retweetContext = useContext(RetweetContext)
	const ClosePopUp = () => {
		menuContext?.setPopUp(false)
		enableScroll()
		retweetContext?.setText('')
		retweetContext?.setThereIsText(false)
		retweetContext?.setAttachment(null)
		retweetContext?.setThereIsAttachment(false)
	}

	return (
		<div className="PopUp__container">
			<div className="PopUp__content">
				<div className="icon" onClick={() => ClosePopUp()}>
					<i>
						<CloseOutlinedIcon />
					</i>
				</div>
				<div className="children__PopUp">
					{children}
				</div>
			</div>
		</div>
	)
}

export default PopUp
