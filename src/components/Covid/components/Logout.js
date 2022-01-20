import React from 'react'
import { Button } from 'reactstrap';
import '../css/Logout.css'
// import jwt_decode from 'jwt-decode';
// const token = localStorage.usertoken;

function Logout(props){
    // localStorage.removeItem('usertoken');
    props.isActiveModifies(false);
    function handleSignInClick(){
        props.handleClick('\home');
    }
    console.log("In log out component");
    return (
        <div className="logout__main">
            <div  className = "logo__img">
                <img src={'assets/Images/Breporter_logo.jpeg'} alt=""/>
            </div>
            <div className = "logout__msg">
                <p>We will remember you, Hope you enjoyed our service!</p>
            </div>
            <div className = "logout__btn">
                <Button onClick={handleSignInClick}>Sign In Again</Button>
            </div>
        </div>
    );
}

export default Logout;