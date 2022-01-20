import React, { Component} from 'react';
import { IconContext } from 'react-icons';
import { FaPhoneAlt } from 'react-icons/fa';
import Sidebar from "../SideBar/Sidebar"
// import DataFilter from '../DataFilter/DataFilter';
// import ReactAudioPlayer from 'react-audio-player';
import './Profile.css';
import jwt_decode from 'jwt-decode';
// import $ from 'jquery'
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			number: '',
			email: '',
		};
	}

	componentDidMount() {
		const token = localStorage.usertoken;
		const decoded = token !== ''?jwt_decode(token):alert("Login First");
		this.setState({
			name: decoded.name,
			number: decoded.number,
			email: decoded.email,
		});
	}

	render() {
		return (<>
					<div><Sidebar FilterData={this.props.LoginStatus}/></div>
		<div className="profileplace">
		<img src={require("./user.png")} alt="profile-sample4" className="profile" />

		</div>
			<figure className="snip1336">
  <figcaption>
		<h2>{this.state.name}<span>{this.state.email}</span></h2>
    <p> 
	<IconContext.Provider  value={{className:"PhoneIcon"}}>
		<FaPhoneAlt /> 
	
	</IconContext.Provider> - {this.state.number}
	</p>
     {/* eslint-disable-next-line */}
    <a href="#" className="follow">Edit</a>
  </figcaption>
</figure>

		</>);
	}
}

export default Profile;
