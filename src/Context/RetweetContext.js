
import React, { createContext, useState, useEffect } from 'react'

export const RetweetContext = createContext({})

const RetweetProvider = ({ children }) => {

	const [text, setText] = useState(null)
	const [attachment, setAttachment] = useState(null)
	const [thereistext, setThereIsText] = useState(false)
	const [thereisattachment, setThereIsAttachment] = useState(false)
	const initialstate = {
		text, setText,
		attachment, setAttachment,
		thereistext, setThereIsText,
		thereisattachment, setThereIsAttachment
	}
	useEffect(() => {
		setText('')
		setAttachment(null)
		setThereIsText(false)
		setThereIsAttachment(false)
	},[])

	const clearText = () => {
		setText({ text: null })
		setThereIsText({thereistext: false})
	}
	return (
		<RetweetContext.Provider value={initialstate}>
			{children}
		</RetweetContext.Provider>
	)
}

export default RetweetProvider
