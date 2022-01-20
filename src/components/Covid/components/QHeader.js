import React, { useState, Dimensions } from "react";
// import styled from "styled-components";

import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import SearchIcon from "@material-ui/icons/Search";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CloseIcon from '@material-ui/icons/Close';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Input,
  Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavbarText, Button, UncontrolledPopover 
} from 'reactstrap';

import "../css/QHeader.css";
import CoronaForm from './CoronaForm';
import { Link, useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';

// const StyledInput = styled(Input)`
//   font-size: 16px;
// `;

function QHeader(props) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchbarText, setSearchbarText] = useState(undefined);
  const token = localStorage.usertoken;
  var decoded = null;
  console.log("In Qheader >> ", token);
  if(token == undefined){
    alert("Browser local state modifying issue, But no worry, please press ok");
  }else{
    decoded = jwt_decode(token);
  }
  function toggleForm(){
    setIsFormOpen(!isFormOpen);
  }
  function renderToHome(){
    console.log("home btn pressed");
    props.handleClick('/home');
  }
  function renderToOwnReport(){
    console.log("Own Report btn pressed");
    props.handleClick('/ownReports');
  }
  function onSearchBarTextChange(e){
    e.preventDefault()
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
    console.log("In Qheader setting value of search bar to ", e.target.value);
    setSearchbarText(e.target.value);
    if(e.target.value == ""){
      props.setSearched_query(undefined);
    }
  }
  function onSearchSubmit(){
    props.setSearched_query(searchbarText);
  }
  // const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
    <div className="qHeader">
      <div className="qHeader__logo">
        <img src={'assets/Images/Breporter_logo.jpeg'} alt=""/>
        {/* <NavbarBrand className="mx-auto logo_name" href="/" >B-Reporter</NavbarBrand> */}
        <div className="logo_text">
          <h5>B-Reporter</h5>
        </div>
      </div>
      {/* <Button> */}
      <div className="add_report" onClick={toggleForm}>
        {/* <Link href="/home">Add Your Experiences Of Covid</Link> */}
        <div className="qHeader__Add_report_icon">
          <PostAddIcon />
        </div>
        Post Your Covid Experiences
      </div>
      {/* </Button> */}
      <div className="qheader_all_icons">
        <div className="qHeader__icons" onClick={renderToHome}>
          <HomeIcon />
        </div>
        <div className="qHeader__icons" onClick={renderToOwnReport}>
          <EventNoteTwoToneIcon />
        </div>
        <div className="qHeader__icons">
          <NotificationsIcon />
        </div>
      </div>
      <div className="qHeader__input">
        <FindInPageIcon />
        {/* <input type="text" placeholder="Search Reports" onChange={onSearchBarTextChange(value)}/> */}
        <Input
            placeholder="Search Reports"
            type="text"
            name="search_text"
            noValidate
            value={searchbarText}
            onChange={onSearchBarTextChange}
        />
        <div className="qHeader_search_icons"  onClick={onSearchSubmit}>
          <SearchIcon />
        </div>
      </div>
      <div>
          <div className="qHeader__profile">
            <Button id="popover" type="button">
              <AccountCircleIcon/>
            </Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
                <div>
                  <div className="hidden_Button">
                    <div className="hidden_Button_icon">
                      <AccountBoxIcon />
                    </div>
                    <Link className="edit_profile" to={'/Profile'}>My Profile</Link>
                  </div>
                  <div className="hidden_Button">
                    <div className="hidden_Button_icon">
                      <ExitToAppIcon />
                    </div>
                    <Link className="edit_profile" to={'/Logout'} onClick={props.handleLogout}>Log Out</Link>
                  </div>
                </div>
            </UncontrolledPopover>
            <div className="qHeader__user">
              {decoded != null ?
              <h5>{decoded.name}</h5>
              :<h5>UserName</h5>
              }
            </div>
          </div>
      </div>
    </div>
    <CoronaForm isFormOpen={isFormOpen} toggleForm={toggleForm} />
    </div>
  );
}

export default QHeader;
