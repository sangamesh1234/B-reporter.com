import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PasswordReset.css';
import CONFIG from '../Config/Config';
//const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
localStorage.setItem('phonenumber', '');
const numbers = localStorage.number;

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

class PasswordReset extends Component {
	constructor(props) {
		super(props);
		this.state = {
			new_password: '',
			confirm_password: '',
			formErrors: {
				new_password: '',
				confirm_password: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			if (this.state.new_password === this.state.confirm_password) {
				let content = {
					number: numbers,
					newPass: this.state.new_password,
				};
				axios
					.put(CONFIG.server + '/users/resetPassword', content)
					.then((res) => {
						console.log(res.data);
						if (res.data.status === ' password updated successfully') {
							alert('Password Reset Successfull..Please login again');
							localStorage.setItem('number', '');
							this.props.history.push('/login');
							//window.location.replace('https://backend-279606.appspot.com/users/login');
						} else {
							alert("error: 'User is not registered yet!!'");
							this.props.history.push('/forgetPassword');
						}
					})
					.catch((err) => {
						alert("error: 'User is not registered yet!!'");
						console.log(err);
					});
			} else {
				alert("error: 'Password/Confirm Password doesnot match!!'");
			}
		} else {
			console.error('PASSWORD MISMATCHED !! TRY AGAIN');
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case 'new_password':
				formErrors.new_password = value.length < 8 ? 'minimum 8 characaters required' : '';
				break;
			case 'confirm_password':
				formErrors.confirm_password =
					value.localeCompare(this.state.new_password) !== 0 ? 'Password did not match' : '';
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
					<h1>Reset Password</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="password">
							<label htmlFor="password">New Password</label>
							<input
								className={formErrors.new_password.length > 0 ? 'error' : null}
								placeholder="New Password"
								type="password"
								name="new_password"
								noValidate
								value={this.state.new_password}
								onChange={this.handleChange}
							/>
							{formErrors.new_password.length > 0 && (
								<span className="errorMessage">{formErrors.new_password}</span>
							)}
						</div>
						<div className="password">
							<label htmlFor="password">Confirm Password</label>
							<input
								className={formErrors.confirm_password.length > 0 ? 'error' : null}
								placeholder="Confirm Password"
								type="password"
								name="confirm_password"
								noValidate
								value={this.state.confirm_password}
								onChange={this.handleChange}
							/>
							{formErrors.confirm_password.length > 0 && (
								<span className="errorMessage">{formErrors.confirm_password}</span>
							)}
						</div>
						<div className="createAccount">
							<button type="submit">Set Password</button>
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

export default PasswordReset;
