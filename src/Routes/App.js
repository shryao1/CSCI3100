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

import AppProvider from '../Context/AppContext'
import MenuActiveProvider from '../Context/menuActive'

import './App.scss'

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<AppProvider>
					<MenuActiveProvider>
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
							<Route path="/followList" element={
								<PageWrapper component={
									<FollowList />
								} isPage />
							} />
							<Route path="/profile" element={
								<PageWrapper component={
									<Profile />
								} isPage />
							} />
							<Route path="/notifications" element={
								<PageWrapper component={
									<Notifications />
								} isPage />
							} />
							<Route path="/Message" element={
								<PageWrapper component={
									<Message />
								} isMessagePage />
							} />
							<Route path="/Explore" element={
								<PageWrapper component={
									<Explore />
								} isPage />
							} />
							<Route path="/Browser" element={
								<PageWrapper component={
									<Browser />
								} isPage />
							} />
							<Route path="/:user/status/:idPost" element={
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
					</MenuActiveProvider>
				</AppProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
