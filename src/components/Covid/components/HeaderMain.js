import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Input,
  Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavbarText, Button, UncontrolledPopover 
} from 'reactstrap';

import { useHistory } from 'react-router-dom';
import { auth } from '../firebase.js';
import { Link} from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import Profile from './profie';
import '../css/HeaderMain.css'

function HeaderMain({user}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const history = useHistory('');

    if (user === false) {
        history.push("/sign-in")
    }

    const logout = (event) => {
        event.preventDefault();
        auth.signOut();
        history.push("/sign-in");
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
            <NavbarToggler onClick={toggle} />
                <NavbarBrand className="mr-auto logo_image" href="/" ><img src={'assets/Images/Breporter_logo.jpeg'}/></NavbarBrand>
                <NavbarBrand className="mx-auto logo_name" href="/" >B-Reporter</NavbarBrand>
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink className = 'menus' href="/home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink className = 'menus' href="/yourreport">Your Reports</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button id="popover" type="button" className="user">
                            <FaUserAlt /> 
                        </Button>
                        <UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
                            <ul className="form">
                                <li><Link className="profile" to={'/Profile'}>My Profile</Link></li>
                                {/* <li><Link className="Register" to={'/register'}>Register</Link></li> */}
                                <li><Link className="logout" onClick={logout}>Log Out</Link></li>
                            </ul>
                        </UncontrolledPopover>
                    </NavItem>
                </Nav>
            </Navbar>
            <div className='header-main-filter'>
                <Input className="Search-Input" type="text" placeholder="  Search Report..." name="search" />
                <span>
                    <Button className="search-button" id="search_bar" type="button">
                        <BsSearch type="submit" onSubmit={()=>console.log("Submitted")}/>
                    </Button>
                </span>
            </div>
        </div>
    )
}

export default HeaderMain