import React, { Component } from 'react';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Nav, Navbar, UncontrolledDropdown, NavbarBrand, NavItem, NavbarToggler, Collapse, Button, 
	UncontrolledPopover, PopoverBody, 
	Form, FormGroup, Input, Label,
	Container, Row, Col,
	Dropdown, DropdownToggle, DropdownItem, DropdownMenu, NavbarText
} from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Header.css';

const token = localStorage.usertoken;

class Header extends Component {
	
	state = {
		route: null,
		IconClicked:false,
		isNavOpen: false,
		checked: true,
		Uncategorised: false,
		Political: false,
		Crime: false,
		Natural: false,
		Informative: false
	};
	
	componentDidMount() {
		if (token!=="") {
			this.props.LoginStatus.setState({ isActive: true, status: 'Logout' });
		}else{
			console.log("Token is invalid");
		}
	}

	HandleLogin = () => {
		const { isActive } = this.props.LoginStatus.state;
		console.log("Clicked");
		if (isActive === true) {
			//this.setState({ route: '/' });
			alert('User successfully LoggedOut!');
			this.props.LoginStatus.setState({ isActive: false, status:'Login'});
			localStorage.setItem('usertoken', '');
			window.location.replace("http://localhost:3000");
		} else if (isActive === null || isActive === false) {
			this.setState({ route: '/login'});
		}
	};

	render() {
		const { route, IconClicked, isNavOpen, checked, Uncategorised, Political, Natural, Informative, Crime } = this.state;
		const { status } = this.props.LoginStatus.state;
		if (route !== null) {
			return <Redirect to={route} />;
		}
		return (
			<>
			<div>
				<div className="sticky-top">
					<nav className = "header_navigation">
						<div/>
						<div className = 'logo'>
							<div className = "logo_image"><a href = '/'><img src={'assets/Images/Breporter_logo.jpeg'}/></a></div>
							<div className = 'logo_name'><a href = '/'>B-Reporter</a></div>
						</div>
						<div className="spacer" />
						<div className="header_items">
							<ul>
							<li>
								<button><a href="/">Home</a></button>
							</li>
							<li>
								<button><a href="/yourReport">Your Reports</a></button>
							</li>
							</ul>
						</div>
					</nav>
					<Nav className="ml-auto" navbar>
							<NavItem>
								<Button id="popover" type="button" className="user">
									<FaUserAlt /> 
								</Button>
								<UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
									<ul className="form">
										{status==="Logout"?
											<li onClick={()=>this.setState({IconClicked:!IconClicked})}>
												<Link className="profile" to={'/Profile'}>My Profile</Link>
											</li>:null}
										{status!=="Logout"?
											<li onClick={()=>this.setState({IconClicked:!IconClicked})}>
												<Link className="Register" to={'/register'}>Register</Link>
											</li>:null}
										<li onClick={()=>this.setState({IconClicked:!IconClicked})}><Link className="settings" to={'/Profile'}>Settings</Link></li>
										{/* eslint-disable-next-line */}
										<li className="logout" onClick={()=>this.HandleLogin()}>{status}</li>
									</ul>
								</UncontrolledPopover>
							</NavItem>
						</Nav>
					{/*<Navbar light expand="lg">
						<NavbarToggler onClick={() => this.setState({isNavOpen: !isNavOpen})} />
						<NavbarBrand className="mr-auto" href={'/'}>
							<img src={'assets/Images/b-reporter_logo.jpg'} className="logo" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar >
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" exact to={'/'}>Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to={'/askquestion'}>All Questions</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to={'/yourReport'}>Your Reports</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
						<Nav className="search-input-button" navbar>
							<NavItem>
								<Button className="search-button" id="search_bar" type="button">
									<BsSearch type="submit" onSubmit={()=>console.log("Submitted")}/>
								</Button>
							</NavItem>
							<NavItem>
								<Input className="Search-Input" type="text" placeholder="  Search Report..." name="search" />
							</NavItem>
						</Nav>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Button id="popover" type="button" className="user">
									<FaUserAlt /> 
								</Button>
								<UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
									<ul className="form">
										{status==="Logout"?
											<li onClick={()=>this.setState({IconClicked:!IconClicked})}>
												<Link className="profile" to={'/Profile'}>My Profile</Link>
											</li>:null}
										{status!=="Logout"?
											<li onClick={()=>this.setState({IconClicked:!IconClicked})}>
												<Link className="Register" to={'/register'}>Register</Link>
											</li>:null}
										<li onClick={()=>this.setState({IconClicked:!IconClicked})}><Link className="settings" to={'/Profile'}>Settings</Link></li>
										{/* eslint-disable-next-line */}
										{/*<li className="logout" onClick={()=>this.HandleLogin()}>{status}</li>
									</ul>
								</UncontrolledPopover>
							</NavItem>
						</Nav>
					</Navbar>*/}
				</div>
				<div className="filters">
					<span className="filter-bar">
						<Button id="filter" type="button">
							Filter
						</Button>
						<UncontrolledPopover id="popover" trigger="legacy" placement="bottom" target="filter" >
							<PopoverBody>
								<Container>
									<Row>
										<Col sm={12}>
											<FormGroup row>
												<FormControlLabel className="mx-auto"
													control={<Checkbox checked={checked} onChange={()=> this.setState({checked: !checked})} name="checked" color="primary" />}
													label="By Time"
												/>
											</FormGroup>
										</Col>
										<Col sm={12}><hr></hr></Col>
										<Col sm={12}>
											<legend>By Region</legend>
											<FormGroup row className="search">
												<h6>Search For your Country</h6>
												<Input type="text" name="country" placeholder="Search For Country" />
											</FormGroup>
											<FormGroup row>
												<h6>Search For your State</h6>
												<Input type="text" name="State" placeholder="Search For State" />
											</FormGroup>
											<FormGroup row>
												<h6>Search For your City</h6>
												<Input type="text" name="City" placeholder="Search For City" />
											</FormGroup>	
										</Col>
										<Col sm={12}><hr></hr></Col>
										<Col sm={12} className="category">
											<legend  className="mx-auto">Category </legend>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Uncategorised} 
													onChange={()=> this.setState({Uncategorised: !Uncategorised})} 
													name="Uncategorised" 
													color="primary"
													className="category" />}
													label="Uncategorised"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Political} onChange={()=> this.setState({Political: !Political})} name="Political" color="primary" />}
													label="Political"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Crime} onChange={()=> this.setState({Crime: !Crime})} name="Crime" color="primary" />}
													label="Crime"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Natural} 
													onChange={()=> this.setState({Natural: !Natural})} 
													name="Natural" 
													color="primary" 
													className="category" />}
													label="Natural Disasters"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Union Budget"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Corona"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="India"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Business"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Sports"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Technology"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Startups"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Entertainment"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Hatke"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="International"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Automobile"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Science"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Travel"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Health"
												/>
											</FormGroup>
											<FormGroup row>
												<FormControlLabel
													control={<Checkbox checked={Informative} onChange={()=> this.setState({Informative: !Informative})} name="Informative" color="primary" />}
													label="Miscellaneous"
												/>
											</FormGroup>
											<FormGroup row>
												<button>Submit</button>
											</FormGroup>
										</Col>
									</Row>
								</Container>
							</PopoverBody>
						</UncontrolledPopover>
					</span>

					<span>
						<Button className="search-button" id="search_bar" type="button">
							<BsSearch type="submit" onSubmit={()=>console.log("Submitted")}/>
						</Button>
      				</span>
					<Input className="Search-Input" type="text" placeholder="  Search Report..." name="search" />
				</div>
			</div>
			</>
		);
	}
}

export default Header;


