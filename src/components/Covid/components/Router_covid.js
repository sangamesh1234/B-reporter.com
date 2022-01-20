import React, { useState } from 'react';
// import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
// import RegisterPage from '../RegisterPage/RegisterPage';
// import LoginPage from '../LoginPage/LoginPage';
// import OTPpage from '../OTPpage/OTPpage';
// import ForgotPassword from '../ForgotPassword/ForgotPassword';
// import PasswordReset from '../PasswordReset/PasswordReset';
// import HeaderMain from "./HeaderMain"
// import Profile from '../Profile/Profile'
// import DisplayReport from '../MyReports/DisplayReport'
// import ReportList from '../RenderReports/ReportList/ReportList'
// import AskQuestions from '../AskQuestions/AskQuestions'
// import CONFIG from '../Config/Config';
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
// import UserProfile from './UserProfile'
// import ShowReports from './ReportCoronaForm/ShowReports';
import Profile from './Profile';
import QHeader from './QHeader';
import OwnReports from './OwnReports';
import Logout from './Logout';


function Router_covid() {
    const [isActive, setisActive] = useState(false);
	const handleIsActiveChange = (val) => setisActive(val);

    const history = useHistory('');
	const [searched_query, setSearched_query] = useState(null);
	const [userToken, setUserToken] = useState(undefined);

	async function handleClick(path) {
		console.log("routing to " + path);
		if(path == "/signin_home"){
			await setUserToken(localStorage.usertoken);
			history.push('/home');
		}else{
			history.push(path);
		}
	}
	function handleLogout(){
		console.log("user logging out ");
		handleIsActiveChange(false);
		history.push('/signin');
	}
	async function handleSearchBarTextChange(value){
		console.log("incoming value from Qheader : ", value);
		if(value == ""){
			await setSearched_query(null);
		}else{
			await setSearched_query(value);
		}
		console.log("In RouterCovid value of searchBar changed to ",searched_query);
		history.push('/home');
	}
	// return( (condition)? <div>xyz</div> : <div>pqr</div>);
	return (
		<div className="site__view">
			{console.log("0000000000000000000000000000000000000000000000")}
			{console.log("In router state is >> ",{searched_query,history,isActive})}
			{/* <HeaderMain className="sticky-top" LoginStatus={this} /> */}
			{isActive &&
				<QHeader className="site__header" 	
						handleClick={handleClick} 
						setSearched_query={handleSearchBarTextChange}
						handleLogout={handleLogout}
				/>
			}
			<Switch className = "site__body">
				<Route exact path="/" component={() => 	<Home 	isActive = {isActive}
																handleClick={handleClick}
																searched_query={searched_query}
														/>}
				/>
				<Route exact path="/home" component={() => 	<Home 	isActive = {isActive}
																	handleClick={handleClick}
																	searched_query={searched_query}
															/>}
				/>
				<Route exact path="/ownReports"	component={() => 	<OwnReports isActive = {isActive}
																				handleClick={handleClick}
																	/>}
				/>
				<Route path="/signup" render={() => <SignUp handleClick={handleClick}
													/>}
				/>
				<Route path="/signin" render={() => <SignIn isActive={isActive}
															isActiveModifies={handleIsActiveChange}
															handleClick={handleClick}
													/>}
				/>
				<Route path="/Profile" render={() => <Profile />}
				/>
				{/* <Route path="/Profile" render={() => <SignIn isActive={isActive}
															isActiveModifies={handleIsActiveChange}
															handleClick={handleClick}
													/>}
				/> */}
				<Route path="/Logout" render={() => <Logout isActiveModifies={handleIsActiveChange}
															handleClick={handleClick}
													/>}
				/>
				{/* <Route path="/yourReport" render={() => <ShowReports LoginStatus={this} />} /> */}
			</Switch>
		</div>
	);
}
// class Router_covid extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state={
// 			data :[],
// 			// FilterResults:[],
// 			isActive: null,
// 			status: 'Login'
//         }
// 		this.handleIsActiveChange = this.handleIsActiveChange.bind(this);
// 	}

// 	handleIsActiveChange (param){
// 		this.setState({ isActive: param, status: 'logout' });
// 	};
// 	render() {
// 		return (
// 			<>
// 				<HeaderMain className="sticky-top" LoginStatus={this} />
// 				<Switch>
// 				    <Route exact path="/" component={() => <Home isActive = {this.state.isActive}  />} />
// 					<Route path="/signup" render={(props) => <SignUp {...props} LoginStatus={this} />} />
// 					<Route path="/signin" render={(props) => <SignIn {...props} LoginStatus={this.state} isActiveModifies={this.handleIsActiveChange} />} />
// 					{/* <Route
// 						path="/forgotPassword"
// 						render={(props) => <ForgotPassword {...props} LoginStatus={this} />}
// 					/> */}
// 					{/* <Route path="/profile" render={(props) => <UserProfile {...props} LoginStatus={this} />} /> */}
// 					<Route path="/yourReport" render={(props) => <ShowReports {...props} LoginStatus={this} />} />
// 					{/*<Route path="/otpPage" render={(props) => <OTPpage {...props} LoginStatus={this} />} />
// 					<Route path="/resetPassword" render={(props) => <PasswordReset {...props} LoginStatus={this} />} />
// 					<Route path="/askquestion" render={(props) => <AskQuestions {...props} LoginStatus={this} />} /> */}
// 				</Switch>
// 			</>
// 		);
// 	}
// }

export default Router_covid;