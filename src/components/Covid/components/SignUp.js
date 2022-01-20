import React, {Component} from 'react'
import '../css/SignUp.css';
import {Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
// import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import CONFIG from '../../Config/Config';
import axios from 'axios';

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;
	// // validate form errors being empty
	// Object.values(formErrors).forEach((val) => {
	// 	val.length > 0 && (valid = false);
	// });

	// // validate the form was filled out
	// Object.values(rest).forEach((val) => {
	// 	val === null && (valid = false);
	// });
	return valid;
};

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            name: null,
            gender: null,
            number: null,
            password: null,
            age: null,
            email: null,
            country: null,
            state: null,
            district: null,
            pincode: null,
            emcName1: null,
            emcPhone1: null,
            emcName2: null,
            emcPhone2: null,
            formErrors:{
                name: '',
                gender: '',
                number: '',
                password: '',
                age: '',
                email: '',
                country: '',
                state: '',
                district: '',
                pincode: 0,
                emcName1: '',
                emcPhone1: '',
                emcName2: '',
                emcPhone2: '',
            }
        };
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(formValid(this.state)){
            this.setState({loading:true}, ()=>{
                axios.post(CONFIG.server+'/users/register', this.state).then((res)=>{
                    // console.log("========================================");
                    // console.log(res.data.status);
                    if(parseInt(res.data.status) == 201){
                        alert("registered successfully, routeing to sign in. Hope you remember your id/password");
                        this.props.handleClick("/signin");
                    }else{
                        alert("Unknown server error");
                    }
                }).catch((err)=>{
                    alert("server error 500, user registration failed");
					console.log(err);
                });
            });
        }else{
            alert("Invalid detials");
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        }
    }

    render(){
        const { formErrors } = this.state;
        return <div>
            <div className='sign-up'>
                <Container sm={{size:12, offset:0}} xs={{size:12, offset:0}} md={{size:12, offset:'auto'}} lg={{size:12, offset:0}} xl={{size:6, offset:0}}>
                    <Row >
                        <Col className='writeup'>
                            <span>Report Corona, Beyond Cases</span>
                        </Col>
                        <Col className='signup-container'>
                            <div className='sign-up_container'>
                                <h1>Create your Account</h1>
                                <form onSubmit={this.handleSubmit} noValidate>
                                        <center>
                                        {/* <FormGroup> */}
                                        <input
                                            className={formErrors.name.length > 0 ? 'error' : null}
                                            placeholder="name"
                                            type="text"
                                            name="name"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        {/* </FormGroup> */}
                                        </center>
                                        {formErrors.name.length > 0 && <span className="errorMessage">{formErrors.name}</span>}
                                        <center>
                                        <input
                                            className={formErrors.gender.length > 0 ? 'error' : null}
                                            placeholder="gender"
                                            type="text"
                                            name="gender"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.gender.length > 0 && <span className="errorMessage">{formErrors.gender}</span>}
                                        <center>
                                        <input
                                            className={formErrors.number.length > 0 ? 'error' : null}
                                            placeholder="number"
                                            type="text"
                                            name="number"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.number.length > 0 && <span className="errorMessage">{formErrors.number}</span>}
                                        <center>
                                        <input
                                            className={formErrors.password.length > 0 ? 'error' : null}
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>)}
                                        <center>
                                        <input
                                            className={formErrors.age.length > 0 ? 'error' : null}
                                            placeholder="age"
                                            type="text"
                                            name="age"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.age.length > 0 && <span className="errorMessage">{formErrors.age}</span>}
                                        <center>
                                        <input
                                            className={formErrors.email.length > 0 ? 'error' : null}
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
                                        <center>
                                        <input
                                            className={formErrors.country.length > 0 ? 'error' : null}
                                            placeholder="country"
                                            type="country"
                                            name="country"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.country.length > 0 && <span className="errorMessage">{formErrors.country}</span>}
                                        <center>
                                        <input
                                            className={formErrors.state.length > 0 ? 'error' : null}
                                            placeholder="state"
                                            type="state"
                                            name="state"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.state.length > 0 && <span className="errorMessage">{formErrors.state}</span>}
                                        <center>
                                        <input
                                            className={formErrors.district.length > 0 ? 'error' : null}
                                            placeholder="district"
                                            type="district"
                                            name="district"
                                            noValidate
                                            onChange={this.handleInputChange}
                                        />
                                        </center>
                                        {formErrors.district.length > 0 && <span className="errorMessage">{formErrors.district}</span>}
                                    <div className="createAccount">
                                        <center>
                                            <div>
                                            <button type="submit" className='submit-register'>Create Account</button>
                                            </div>
                                            <div className='have-account'>
                                            <Link to={'/signin'}>
                                                <small>Already Have an Account?</small>
                                            </Link>
                                            </div>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    }
}
export default SignUp;

{/*
import React, {useState, Component} from 'react'
import './SignUp.css';
import {auth} from './firebase.js';
import {Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';


function SignUp() {
    const history=useHistory('');
    const [first, setFirst]=useState('');
    const [last, setLast] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Register = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth.user) {
                    auth.user.updateProfile({
                        displayName: first + " " + last
                    }).then((s) => {
                        history.push("/sign-in")
                    })
                }
            })
            .catch((e) => {
                alert(e.message);
            })
    }

    return (
        <div className='sign-up'>
            <Container sm={{size:12, offset:0}} xs={{size:12, offset:0}} md={{size:12, offset:'auto'}} lg={{size:12, offset:0}} xl={{size:6, offset:0}}>
                <Row >
                        <Col className='writeup'><span>"Report Corona, Beyond Cases “ is an initiative by students of IIT Delhi
                        in line with the vision of our honorable prime minister  Sri Narendra Modi Ji to guard 
                        ourselves from fear and use lockdown as the last resort. 
                        Common people are puzzled by the numbers displayed in the screens. 
                        Everyone is just talking about the cases and numbers without analyzing it. 
                        Out of 1.16% deaths reported, it has contributions from comorbidities, experimental drugs and negligence. 
                        It has additional contribution from death related to  pneumonia, cardiac injury, clotting in the bloodstream, 
                        death without reliable clinical/ epidemiological history and all unidentified dead bodies, as per the guidelines. 
                        More than 85% people are getting cured at home with normal treatment. 
                        The symptoms shown by such people has been existing and will continue to exist and no amount of vaccination can cure that. 
                        In this humble attempt, we are trying to collect the ground report/experiences from the victims 
                        that will help eradicate fear from the rest of the society and bring normalcy.</span></Col>
                <Col className='signup-container'>
            <div className='sign-up_container'>
                <h1>Create your Account</h1>
                <form>
                <center>
                    <CustomInput type='name' onChange={(e) => setFirst(e.target.value)} placeholder='First Name'/>
                </center>
                <center>
                    <input type='name' onChange={(e) => setLast(e.target.value)} placeholder='Last Name'/>
                </center>
                <center>
                <FormGroup>
                    <CustomInput type="select" className="gender" name="customSelect">
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to tell</option>
                    </CustomInput>
                </FormGroup>
                </center>
                <center>
                    <input type='number' onChange={(e) => setAge(e.target.value)} placeholder='Age'/>
                </center>
                <center>
                    <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'/>
                </center>
                <center>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                </center>
                <center>
                    <button onClick={Register} type='submit' className='sign-up_button'>SIGN UP</button>
                </center>
                </form>

            </div>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default SignUp
*/}