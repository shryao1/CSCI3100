/**
 * PageWrapper.js
 *
 * Description: This file contains the PageWrapper component, which wraps different layouts based on the type of page being rendered.
 * 
 * Dependencies: This component imports React's useContext hook and various layout components from '../../Components/Layout' directory. It also imports NewTweet and PopUp components from '../../shared/Components'.
 * 
 * Example Usage: 
 *  - Import PageWrapper in the component where different layouts need to be rendered based on the page type.
 *  - Pass appropriate props (isPage, isMessagePage, isLoginPage, isDefaultPage, isVisitorPage) to determine the layout to be rendered.
 */

import { useContext } from 'react'

import { MenuActiveContext } from '../../Context/menuActive'

import Layout from '../../Components/Layout/Layout'
import LayoutLogin from '../../Components/Layout/LayoutLogin'
import LayoutMessage from '../../Components/Layout/LayoutMessage'
import LayoutDefault from '../../Components/Layout/LayoutDefault'
import Layoutvisitor from '../../Components/Layout/Layoutvisitor'

import NewTweet from '../../shared/Components/NewTweet/NewTweet'
import PopUp from '../../shared/Components/PopUp/Popup'

const PageWrapper = ({
	component: Component,
	isPage,
	isMessagePage,
	isLoginPage,
	isDefaultPage,
	isVisitorPage
}) => {
	const menuContext = useContext(MenuActiveContext)

	return (
		<>
			{menuContext?.popUp &&
				<PopUp>
					<NewTweet />
				</PopUp>
			}
			{isPage &&
				<Layout>
					{Component}
				</Layout>
			}
			{isMessagePage &&
				<LayoutMessage>
					{Component}
				</LayoutMessage>
			}
			{isLoginPage &&
				<LayoutLogin>
					{Component}
				</LayoutLogin>
			}
			{isDefaultPage &&
				<LayoutDefault>
					{Component}
				</LayoutDefault>
			}
			{isVisitorPage &&
				<Layoutvisitor>
					{Component}
				</Layoutvisitor>
			}
		</>
	)

}

export default PageWrapper
