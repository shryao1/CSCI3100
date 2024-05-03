/**
 * TextBlue.jsx
 *
 * Description: This file contains the TextBlue component, which displays a blue text label.
 */

import './TextBlue.scss'

const TextBlue = ({ label = 'label blue' }) => {
	return (
		<span className="textBlue__label">{label}</span>
	)
}

export default TextBlue
