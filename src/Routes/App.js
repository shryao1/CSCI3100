/**
 * App.js
 *
 * Description: This file serves as the entry point for the application. It sets up the routing using React Router and wraps each route component with the PageWrapper component to apply layout styles and other context providers.
 * 
 * Dependencies: 
 *   - React Router: Imports BrowserRouter, Navigate, Route, and Routes components from 'react-router-dom'.
 *   - Components: Imports various page components from '../Pages' directory.
 *   - Context Providers: Imports context providers from '../Context' directory.
 * 
 * Example Usage: 
 *   - Import and use this file as the root component in your application to define routing and page layout.
 */

import {
	BrowserRouter,
	Navigate,
	Route,
	Routes
} from 'react-router-dom'

import PageWrapper from '../Pages/Wrapper/PageWrapper'
import Default from '../Pages/Default/Default'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Notifications from '../Pages/Notifications/Notifications'
import Message from '../Pages/Message/Message'
import Explore from '../Pages/Explore/Explore'
import Browser from '../Pages/Browser/Browser'
import Profile from '../Pages/Profile/Profile'
import PostDetails from '../Pages/PostDetails/PostDetails'
import Admin from '../Pages/Admin/Admin'
import FollowList from '../Pages/FollowList/FollowList'
import EditProfile from '../Pages/Profile/EditProfile'

import AppProvider from '../Context/AppContext'
import MenuActiveProvider from '../Context/menuActive'
import RetweetProvider from '../Context/RetweetContext'
import VisitorHome from '../Pages/Home/Visitorhome'
import './App.scss'

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<AppProvider>
					<MenuActiveProvider>
						<RetweetProvider>
							<Routes>
								<Route path="/" element={
									<PageWrapper component={
										<Default />
									} isDefaultPage />
								} />
								<Route path="/home/:userID" element={
									<PageWrapper component={
										<Home />
									} isPage />
								} />
								<Route path="/admin/*" element={
									// <PageWrapper component={
									// 	<Admin />
									// } isPage />
									<Admin/>
								} />
								<Route path="/visitor" element={
									<PageWrapper component={
										<VisitorHome />
									} isVisitorPage />
								} />
								<Route path="/followList/:userID/:visituserID" element={
									<PageWrapper component={
										<FollowList />
									} isPage />
								} />
								<Route path="/profile/:userID/:visituserID" element={
									<PageWrapper component={
										<Profile />
									} isPage />
								} />
								<Route path="/profileedit/:userID" element={
									<PageWrapper component={
										<EditProfile />
									} isPage />
								} />
								<Route path="/notifications/:userID" element={
									<PageWrapper component={
										<Notifications />
									} isPage />
								} />
								<Route path="/message/:userID/:chatWithID" element={
									<PageWrapper component={
										<Message />
									} isMessagePage />
								} />
								<Route path="/explore/:userID" element={
									<PageWrapper component={
										<Explore />
									} isPage />
								} />
								<Route path="/browser/:userID" element={
									<PageWrapper component={
										<Browser />
									} isPage />
								} />
								<Route path="/status/:userID/:postID" element={
									<PageWrapper component={
										<PostDetails />
									} isPage />
								} />
								<Route path="/login" element={
									<PageWrapper component={
										<Login />
									} isLoginPage />
								} />
								<Route path="/register" element={
									<PageWrapper component={
										<Register />
									} isLoginPage />
								} />
								<Route path="*" element={
									<Navigate to="/" />
								} />
							</Routes>
						</RetweetProvider>
					</MenuActiveProvider>
				</AppProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
