import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import './OTPpage.css';
import axios from 'axios';
import CONFIG from '../Config/Config';
//const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const phonenumber = localStorage.phonenumber;

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

class OTPpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: null,
			formErrors: {
				code: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			const ph = phonenumber.substring(1);
			axios
				.get(CONFIG.server + '/users/verify', {
					params: {
						phonenumber: ph,
						code: this.state.code,
					},
				})
				.then((res) => {
					console.log(res);
					// console.log(res.data.status);
					if (res.data.message === 'Verified!!') {
						alert('User successfully verified!!');
						localStorage.setItem('number', res.data.number);
						this.props.history.push('/resetPassword');
					} else {
						alert("error: 'INVALID OTP ..PLEASE TRY AGAIN!!!'");
					}
				})
				.catch((err) => {
					alert("error: 'INVALID OTP ..PLEASE TRY AGAIN!!!'");
					console.log(err);
				});

			//window.location.replace('http://localhost:3000/resetPassword')
		} else {
			console.error('INVALID OTP ..PLEASE TRY AGAIN!!!');
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case 'code':
				formErrors.code =
					value.length !== 6
						? 'OTP must have 6 digits only!'
						:'';
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
					<h1 style={{ fontWeight: 'bolder' }}>Validate OTP</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="number">
							<label htmlFor="number">Enter the OTP Sent to Registered Mobile No.</label>
							<input
								className={formErrors.code.length > 0 ? 'error' : null}
								placeholder="OTP"
								type="text"
								name="code"
								noValidate
								value={this.state.code}
								onChange={this.handleChange}
							/>
							{formErrors.code.length > 0 && <span className="errorMessage">{formErrors.code}</span>}
						</div>
						<div className="createAccount">
							<button type="submit">Submit OTP</button>
							<Link to={'/forgotPassword'}>
								<small style={{ fontWeight: 'bolder' }}>Resend OTP</small>
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

export default OTPpage;
