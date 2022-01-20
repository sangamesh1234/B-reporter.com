import React, { useState } from 'react';
import '../css/ShareButton.scss'
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    EmailShareButton,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,    
  } from "react-share";
// import $ from "jquery"
import { ShareOutlined } from "@material-ui/icons";


// import { IconContext } from "react-icons";
const ShareButton =(props)=>{

    function check_status(props){
        const {isActive}=props.LoginStatus.state;
        if(isActive == null||isActive === false){
            alert("Login First")
        window.location.replace('http://localhost:3000/login')
        }
    
    }
    const [active, setButton]= useState(false)
        return <div className={active?"menu active":"menu"}>
        <div className="btn trigger shareicon">
        <ShareOutlined className="ShareIcon" onClick={()=>setButton(!active)}/>
        </div>
        <div className="icons" style={active?{}:{pointerEvents:"none"}}>
          <div className="rotater">
            <div className="btn btn-icon">
            <FacebookShareButton url={"http://www.google.com"}  className="IconButton" beforeOnClick={()=>check_status(props)} ><FacebookIcon size={80} round="true" style={{background:"none"}} className="Icons"/></FacebookShareButton>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
           <LinkedinShareButton url={"http://www.google.com"} className="IconButton" beforeOnClick={()=>check_status(props)}><LinkedinIcon size={80} round="true" style={{background:"none"}}  className="Icons"/></LinkedinShareButton>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
           <TwitterShareButton url={"http://www.google.com"} className="IconButton" beforeOnClick={()=>check_status(props)}><TwitterIcon  size={80} round="true" style={{background:"none"}} className="Icons" /></TwitterShareButton>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
           <EmailShareButton url={"http://www.google.com"} className="IconButton" beforeOnClick={()=>check_status(props)}><EmailIcon  size={80} round="true"   style={{background:"none"}} className="Icons"/></EmailShareButton>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
           <WhatsappShareButton url={"http://www.google.com"} className="IconButton" beforeOnClick={()=>check_status(props)}><WhatsappIcon  size={80} round="true" style={{background:"none", size:"40px"}} className="Icons"/></WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
}
export default ShareButton;
