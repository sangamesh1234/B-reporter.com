import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
// import '../LoginPage/LoginPage.css';
// import LoginLoader from '../LoginPage/LoginLoader/LoginLoader'
import CONFIG from '../../Config/Config';
import '../css/SignIn.css';
import { Container, Row, Col } from 'reactstrap';
// import jwt_decode from 'jwt-decode';
// const token = localStorage.usertoken;

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
            isActive : this.props.isActive,
			number: '',
			password: '',
            email : '',
			loggedIn: null,
			formErrors: {
				number: '',
				password: '',
                email: '',
				loading:false,
			},
		};
		// this.storeInLocalMem = this.storeInLocalMem.bind(this);
	}
	// async storeInLocalMem(utok){
	// 	await localStorage.setItem('usertoken',utok);
	// }
	handleSubmit = (e) => {
		e.preventDefault();
		if (formValid(this.state)) {
			this.setState({loading:true}, ()=>{
			axios.post(CONFIG.server + '/users/login', this.state)
				.then((res) => {
					this.setState({loading:false});
					if (res.data.status === 'user logged in') {
                        this.props.isActiveModifies(true);
						this.setState({ isActive: true, status: 'Logout' });
                        // console.log(this.state.isActive);
                        // console.log("on this>>",this.props.isActive);
						localStorage.setItem('usertoken', res.data.accesstoken);
						// this.storeInLocalMem(res.data.accesstoken);
						//
						// const decoded = jwt_decode(token);
						// console.log("decoded ::: ", decoded);
						//
                        this.props.handleClick("/signin_home");
					} else {
						alert("error: 'User does not exist with this email or password!'");
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
				formErrors.number = value.length < 10 ? 'minimum 10 characaters required' : '';
				break;
			case 'password':
				formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
				break;
            case 'email':
                formErrors.email = emailRegex.test(value)? '':'please enter valid email address';
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors,loading } = this.state;
		return (
            <div>
		    <div className="sign-in">
			<span className='b-reporter'> B-reporter</span>
					<span className='Buttons'>
					<a href='£'>Home</a> <a href='£'>Corona</a>
                    <a href='£'>Research</a> <a href='£'>Health</a>  <a href='£'>Histroy</a>
					</span>
                <Container sm={{size:12, offset:0}} xs={{size:12, offset:0}} md={{size:12, offset:'auto'}} lg={{size:12, offset:0}} xl={{size:6, offset:0}}>
                <Row className='Row'>
                    <Col className='writeup'>{/*<span>Report Corona, Beyond Cases</span>*/}
						<Row className="row">
							<Col className='Missionstatement-container'>
								
								<div className="Missionstatement_container">
								<span>statement</span>
								</div>
							</Col>
							<Col className='Motivation-container'>
								<div className="Motivation_container">
								<span>Motivation</span>
								</div>
							</Col>	
						</Row>
					</Col>
                <Col className='signin-container'>

                    <div className="sign-in_container">
                        <h1>Sign In to your Account</h1>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <center>
                                {/* <input onChange = {(e) => setEmail(e.target.value)} type='email' placeholder='Email Address' /> */}
                                <input
                                    className={emailRegex.test(formErrors.email)? 'error' : null}
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    noValidate
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </center> 
                            <center>
                            <input
                                className={formErrors.password.length > 0 ? 'error' : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            </center>

                            {/* <Link to={'/forgotPassword'}>
                                    <small style={{ fontWeight: 'bolder' }}>Forgot Password ?</small>
                                </Link>
                            {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                            )} */}
                            <center>
                                <button type='submit' className='sign-in_button'>SIGN IN</button>
                            </center>

                            <center>
                                <h6>Forgotten Password?</h6>
                            </center>
                            <center>
                                <hr/>
                            </center>
                            <center>
                                <Link to="/signup">
                                    <div className="create-account">
                                    Do not have Account? SIGN UP
                                    </div>
                                </Link>
                            </center>
                        </form>
                    </div>
                </Col>
                </Row>
                </Container>
			</div>
        </div>
		);
	}
}

export default SignIn;
