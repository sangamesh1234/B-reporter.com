import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./RegisterPage.css"
import RegisterLoader from './RegisterPageLoader/RegisterPageLoader'
import CONFIG from '../Config/Config';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		val === null && (valid = false);
	});

	return valid;
};

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading:false,
			name: null,
			gender: null,
			number: null,
			age: null,
			password: null,
			email: null,
			formErrors: {
				name: '',
				gender: '',
				number: '',
				password: '',
				age: '',
				email: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			this.setState({loading:true}, ()=>{
			axios
				.post(CONFIG.server+'/users/register', this.state)
				.then((res) => {
					var rep = `${this.state.name}`;
					var st = rep + ' registered successfully';
					if (res.data.status === st) {
						// alert('User registered successfully');
		// 				console.log(res);
		// 				console.log(`
        //     --SUBMITTING--
        //     name: ${this.state.name}
        //     gender: ${this.state.gender}
        //     number: ${this.state.number}
        //     password: ${this.state.password}
        //     age:${this.state.age}
        //     email:${this.state.email}
		//    `);       
						this.props.history.push('/login');
						this.setState({loading:false})
					} else {
						alert("error: 'User/Phone_Number already exists!'");
						this.props.history.push('/register');

					}
				})
				.catch((err) => {
					alert("error: 'User/Phone_Number already exists!'");
					console.log(err);
				});
		})} else {
			console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
		}
	};


	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case 'name':
				formErrors.name = value.length < 3 ? 'minimum 3 characaters required' : '';
				break;
			case 'gender':
				formErrors.gender = value.length < 3 ? 'minimum 3 characaters required' : '';
				break;
			case 'number':
				formErrors.number = value.length < 10 ? 'minimum 10 characaters required' : '';
				break;
			case 'password':
				formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
				break;
			case 'age':
				formErrors.age = value.length > 3 ? 'maximum 3 characaters required' : '';
				break;
			case 'email':
				formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors,loading } = this.state;

		return<>{loading?<RegisterLoader/>:
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Create Account</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="name">
							<label htmlFor="name">Name</label>
							<input
								className={formErrors.name.length > 0 ? 'error' : null}
								placeholder="name"
								type="text"
								name="name"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.name.length > 0 && <span className="errorMessage">{formErrors.name}</span>}
						</div>
						<div className="gender">
							<label htmlFor="gender">Gender</label>
							<input
								className={formErrors.gender.length > 0 ? 'error' : null}
								placeholder="gender"
								type="text"
								name="gender"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.gender.length > 0 && <span className="errorMessage">{formErrors.gender}</span>}
						</div>
						<div className="number">
							<label htmlFor="number">Number</label>
							<input
								className={formErrors.number.length > 0 ? 'error' : null}
								placeholder="number"
								type="text"
								name="number"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.number.length > 0 && <span className="errorMessage">{formErrors.number}</span>}
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								className={formErrors.password.length > 0 ? 'error' : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.password.length > 0 && (
								<span className="errorMessage">{formErrors.password}</span>
							)}
						</div>
						<div className="age">
							<label htmlFor="age">Age</label>
							<input
								className={formErrors.age.length > 0 ? 'error' : null}
								placeholder="age"
								type="text"
								name="age"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.age.length > 0 && <span className="errorMessage">{formErrors.age}</span>}
						</div>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								className={formErrors.email.length > 0 ? 'error' : null}
								placeholder="Email"
								type="email"
								name="email"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
						</div>

						<div className="createAccount">
							<button type="submit">Create Account</button>
							<Link to={'/login'}>
								<small>Already Have an Account?</small>
							</Link>
							<Link to={'/'}>
								<small>Cancel</small>
							</Link>
						</div>
					</form>
				</div>
			 </div>
	}
	</>
	}
}

export default RegisterPage;
