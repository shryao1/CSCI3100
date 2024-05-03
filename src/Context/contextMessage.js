/**
 * MessageContext.js
 *
 * Description: This file defines the MessageContext, which provides context for user messages within the application.
 * 
 * Example Usage:
 * import MessageContext, { MessageProvider } from './MessageContext';
 */

import React from 'react'

const MessageContext= React.createContext({
	userMessage: null
})

export const MessageProvider=MessageContext.Provider
export default MessageContext