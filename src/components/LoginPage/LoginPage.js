import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import LoginLoader from './LoginLoader/LoginLoader'
import CONFIG from '../Config/Config';
//const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;
	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		if (val === '') {
			valid = false;
		}
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		if (val !== null) {
			valid = true;
		}
	});
	console.log(valid);
	return valid;
};

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: '',
			password: '',
			loggedIn: null,
			formErrors: {
				number: '',
				password: '',
				loading:false,
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			this.setState({loading:true}, ()=>{
			axios
				.post(CONFIG.server + '/users/login', this.state)
				.then((res) => {
					this.setState({loading:false});
					if (res.data.status === 'user logged in') {
						this.props.LoginStatus.setState({ isActive: true, status: 'Logout' });
						localStorage.setItem('usertoken', res.data.accesstoken);
						window.location.replace('http://localhost:3000')
						// console.log(res.data.accesstoken);
					} else {
						alert("error: 'User does not exist with this number or password!'");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		})}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case 'number':
				formErrors.number = value.length < 10 ? 'minimum 01 characaters required' : '';
				break;
			case 'password':
				formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors,loading } = this.state;
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="number">
							<label htmlFor="number">Number</label>
							<input
								className={formErrors.number.length > 0 ? 'error' : null}
								placeholder="Phone Number"
								type="text"
								name="number"
								noValidate
								value={this.state.number}
								onChange={this.handleChange}
							/>
							{formErrors.number.length > 0 && <span className="errorMessage">{formErrors.number}</span>}
						</div>
						{loading?<LoginLoader/>:null}
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								className={formErrors.password.length > 0 ? 'error' : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<Link to={'/forgotPassword'}>
								<small style={{ fontWeight: 'bolder' }}>Forgot Password ?</small>
							</Link>
							{formErrors.password.length > 0 && (
								<span className="errorMessage">{formErrors.password}</span>
							)}
						</div>
						<div className="createAccount">
							<button type="submit">Login</button>
							<Link to={'/register'}>
								<small style={{ fontWeight: 'bolder' }}>Create an Account</small>
							</Link>
							<Link to={'/'}>
								<small style={{ fontWeight: 'bolder' }}>Cancel</small>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoginPage;
