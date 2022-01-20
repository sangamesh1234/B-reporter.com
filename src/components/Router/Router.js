// Firebase related.
import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HeaderLogin from "../Covid/HeaderLogin"
import UserProfile from "../Covid/UserProfile"
import Bottom from "../Covid/Bottom"
import Home from "../Covid/Home"
import SignIn from "../Covid/SignIn"
import SignUp from "../Covid/SignUp"
import HeaderMain from "../Covid/components/HeaderMain"
//import FilterMain from "../Covid/FilterMain"
import { auth } from "../Covid/firebase.js"

{/*
//import React, { Component } from 'react';
import axios from 'axios';
//import { Route, Switch } from 'react-router-dom';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import OTPpage from '../OTPpage/OTPpage';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import PasswordReset from '../PasswordReset/PasswordReset';
//import Header from "../Header/Header"
import Profile from '../Profile/Profile'
import DisplayReport from '../MyReports/DisplayReport'
import ReportList from '../RenderReports/ReportList/ReportList'
import AskQuestions from '../AskQuestions/AskQuestions'
import CONFIG from '../Config/Config';
*/}


{/*
class SiteRouter extends Component {
	constructor(props){
		super(props);
		this.state={
			data :[],
			FilterResults:[],
			isActive: null, 
			status: 'Login' 
			}
	}
	componentDidMount(){
		axios
		.get(CONFIG.server + '/users/reports')
		.then(response => response.data.reverse())
		.then((data)=> {
			console.log(data);
				data.forEach((report)=>{
				 var reportDate = report.created.split('T');
				 reportDate[0] = reportDate[0].split('-');
				 var date = getMonth(reportDate[0][1]) + ' ' + reportDate[0][2] + ', ' + reportDate[0][0];
				 reportDate[1] = reportDate[1].split(':');
				 var time = reportDate[1][0] + ':' + reportDate[1][1];
				 function getMonth(value) {
					 switch (value) {
						 case "01" : return "January";
						 case "02" : return "Febuary";
						 case "03" : return "March";
						 case "04" : return "April";
						 case "05" : return "May";
						 case "06" : return "June";
						 case "07" : return "July";		
						 case "08" : return "August";
						 case "09" : return "September";
						 case "10" : return "October";
						 case "11" : return "November";
						 case "12": return "December";
						 default:return null;
					 }
				 }
				 console.log(date + ' ' + time);
				// var date = report.created.toLocaleDateString();
				// var time = report.created.toLocaleTimeString();
				 report.created=' -- Posted ' + date + ' at ' + time;
				})
				
			this.setState({data:data,FilterResults:data});
			
		})
		.catch((error)=>console.log(error));
			
	}
	
	render() {
		return (
			<>
				<Header className="sticky-top" LoginStatus={this} />
				<Switch>  
				    <Route exact path="/" component={() => <ReportList FilterResults={this.state.FilterResults} data={this.state.data} isActive = {this.state.isActive} />} />
					<Route path="/register" render={(props) => <RegisterPage {...props} LoginStatus={this} />} />
					<Route path="/login" render={(props) => <LoginPage {...props} LoginStatus={this} />} />
					<Route
						path="/forgotPassword"
						render={(props) => <ForgotPassword {...props} LoginStatus={this} />}
					/>
					<Route path="/profile" render={(props) => <Profile {...props} LoginStatus={this} />} />
					<Route path="/yourReport" render={(props) => <DisplayReport {...props} LoginStatus={this} />} />
					<Route path="/otpPage" render={(props) => <OTPpage {...props} LoginStatus={this} />} />
					<Route path="/resetPassword" render={(props) => <PasswordReset {...props} LoginStatus={this} />} />
					<Route path="/askquestion" render={(props) => <AskQuestions {...props} LoginStatus={this} />} />
				</Switch>
			</>
		);
	}
}
*/}

// firebase connected;
function SiteRouter() {
	const [user, setUser] = useState([]);
  
	auth.onAuthStateChanged((authUser) => {
	  if (authUser) {
		setUser(authUser)
	  } else {
		setUser(false);
	  }
	})
  
	return (
	  <div className="Web">
		<Router>
		  <Switch>

		  	<Route path="/Profile">
			  	<HeaderMain user={user}/>
				<UserProfile user={user}/>
			</Route>

			  <Route path="/sign-in">
				<HeaderLogin/>
				<SignIn/>
				<Bottom/>
			  </Route>
  
			  <Route path="/register">
				<HeaderLogin/>
				<SignUp/>
				<Bottom/>
			  </Route>
  
			  <Route path="/">
				<HeaderMain user = {user}/>
				<Home user={user}/>
				{/*<FilterMain/>*/}
			  </Route>

			  <Route path="/yourreport">
				<Home user={user}/>
			  </Route>

			  
		  </Switch>
		</Router>
	  </div>
	);
  }

export default SiteRouter;
