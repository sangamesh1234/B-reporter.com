import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavbarText, Button, UncontrolledPopover 
} from 'reactstrap';

import { useHistory } from 'react-router-dom';
import './HeaderLogin.css';

function HeaderLogin() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const history = useHistory('');

    return (
        <div>
            <Navbar color="light" light expand="md">
            <NavbarToggler onClick={toggle} />
                <NavbarBrand className="mr-auto logo_image" href="/" ><img src={'assets/Images/Breporter_logo.jpeg'}/></NavbarBrand>
                <NavbarBrand className="mr-auto logo_name" href="/" >B-Reporter</NavbarBrand>
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink className = 'menus' href="#">Meet the Team</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink className = 'menus' href="#">Home Remedies</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink className = 'menus' href="#">Contact Us</NavLink>
                    </NavItem>
                    <NavItem>
                    <button clasName='menus-signin'><NavLink className = 'menus' href="/sign-in">SIGN IN</NavLink></button>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderLogin
