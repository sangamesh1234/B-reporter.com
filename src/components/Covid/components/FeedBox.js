import { Avatar } from "@material-ui/core";
import { Component } from "react";
import "../css/FeedBox.css";
import jwt_decode from 'jwt-decode';
// const decoded = jwt_decode(token, { header: true });

class FeedBox extends Component{
    constructor(props){
        super(props);
        const token = localStorage.usertoken;
        this.decoded = jwt_decode(token);
        this.state = {
            name:this.decoded.name
        }
    }
    render(){
        return (
            <div className="feedBox">
                <div className="feedBox__info">
                    <Avatar/>
                    <h5>{this.state.name}</h5>
                </div>
                <div className = "feedBox__feed">
                    <p>Spread your Covid Experiences and help others.</p>
                </div>
            </div>
        )
    }
}

export default FeedBox;
