import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';
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
	return valid;
};

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: null,
			formErrors: {
				number: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (formValid(this.state)) {
			axios
				.get(CONFIG.server + '/users/forgetPassword', {
					params: {
						number: '91' + this.state.number,
						channel: 'sms',
					},
				})
				.then((res) => {
					console.log(res.data.status);
					if (res.data.status === 'pending') {
						alert('OTP Code sent!!');
						console.log(`--SUBMITTING--
						number: ${this.state.number}
						   `);
						const key = res.data.to;
						console.log(key);
						localStorage.setItem('phonenumber', res.data.to);
						this.props.history.push('/otpPage');
					} else {
						alert("error: 'PhoneNumber is wrong/can't be verified!!!'");
					}
				})
				.catch((err) => {
					alert("error: 'User/Phone_Number already exists!'");
					console.log(err);
				});
			//window.location.replace('http://localhost:3000/otpPage');
		} else {
			console.error('ENTERED MOBILE NUMBER IS NOT REGISTERED!!!..PLEASE REGISTER FIRST');
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case 'number':
				formErrors.number = value.length < 10 ? 'minimum 10 characaters required' : '';
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value });
	};

	render() {
		const { formErrors } = this.state;
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1 style={{ fontWeight: 'bolder' }}>Forgot Password</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="number">
							<label htmlFor="number">Enter the Registered Mobile Number</label>
							<input
								className={formErrors.number.length > 0 ? 'error' : null}
								placeholder="Mobile Number"
								type="text"
								name="number"
								noValidate
								value={this.state.number}
								onChange={this.handleChange}
							/>
							{formErrors.number.length > 0 && <span className="errorMessage">{formErrors.number}</span>}
						</div>
						<div className="createAccount">
							<button type="submit">Get OTP</button>
							<Link to={'/register'}>
								<small style={{ fontWeight: 'bolder' }}>Create an Account</small>
							</Link>
							<Link to={'/login'}>
								<small style={{ fontWeight: 'bolder' }}>Login</small>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
