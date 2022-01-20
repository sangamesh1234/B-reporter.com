import { Avatar, ButtonBase } from "@material-ui/core";
import React, { Component } from "react";

import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined } from "@material-ui/icons";

import "../css/CovidReport.css"
import axios from "axios";
import CONFIG from '../../Config/Config';
import jwt_decode from 'jwt-decode';
import ShareButton from './ShareButton';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ShowMoreText from 'react-show-more-text';

import Comments from "./Comments/Comments";

const getTime = (timestamp) => {
    // 2021-05-06T08:41:27.000Z
    var reportDate = timestamp.split('T'); // [0]:2021-05-06, [1]:08:41:27.000Z
    //date
    reportDate[0] = reportDate[0].split('-'); // [0][0] : 2021,[0][1] : 05,[0][2] : 06,
    var date = getMonth(reportDate[0][1]) + ' ' + reportDate[0][2] + ', ' + reportDate[0][0];
    //time
    reportDate[1] = reportDate[1].split(':'); // [1][0] : 08, [1][1] : 41, [1][2] : 27,
    var hr = parseInt(reportDate[1][0]);
    var tag = '';
    if(Math.floor(hr/12) == 0){
        hr = (hr == 0)? 12:hr;
        tag = 'am';
    }else{
        hr = (hr == 12)? 12:hr-12;
        tag = 'pm';
    }
    var time = hr + ':' + reportDate[1][1] + tag;
    function getMonth(value) {
        switch (value) {
            case "01" : return "Jan";
            case "02" : return "Feb";
            case "03" : return "Mar";
            case "04" : return "Apr";
            case "05" : return "May";
            case "06" : return "Jun";
            case "07" : return "Jul";
            case "08" : return "Aug";
            case "09" : return "Sep";
            case "10" : return "Oct";
            case "11" : return "Nov";
            case "12": return "Dec";
            default:return null;
        }
    }
    return date + '|' + time;
};
class CovidReport extends Component{
    constructor(props){
        super(props);
        this.state ={
            heading : this.props.Card.heading,
            des : this.props.Card.Description,
            country : this.props.Card.Country,
            state : this.props.Card.State,
            city : this.props.Card.City,
            // timestamp : "9:30am, 4 days ago",
            timestamp : getTime(this.props.Card.created),
            username : (this.props.Card.Username)? (this.props.Card.Username):"Username",
            likes : (this.props.Card.Likes != null) ? this.props.Card.Likes : 0,
            dislikes : (this.props.Card.Dislikes != null) ? this.props.Card.Dislikes : 0,
            isUpdating : false,
            comments : this.props.Card.comments,
            similar : this.props.Card.similar,
            isClickedMore : false,
            // loading icons
            loading_cards : false,
            show_comments : false
        };
        this.onReactAction = this.onReactAction.bind(this);
        this.onLikeAction = this.onLikeAction.bind(this);
        this.onDislikeAction = this.onDislikeAction.bind(this);
        this.onhandleCommentIconClick = this.onhandleCommentIconClick.bind(this);
    }
    componentDidMount(){
        console.log("in covid report section");
        console.log(this.props);
    }
    // status code: 201 : acted successfully
    // status code: 202 : reverted successfully
    // status code: 205 : did not act
    // status code: 400 : User does not exist
    onReactAction = (act) => {
        console.log("updating likes current = ", this.state.likes);
        try{
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            var uid = decoded.id;
            var rid = this.props.Card.id;
            // var act = 'like';
            axios.put(CONFIG.server + '/users_covid/Creports/'+ act +'/'+ uid + '/' + rid, {Likes : this.state.likes+1})
            .then((res)=>{
                console.log(res);
                if(parseInt(res.data.status) == 201){
                    if(act == "like"){
                        this.setState({likes : this.state.likes+1});
                    }else{
                        this.setState({dislikes : this.state.dislikes+1});
                    }
                    console.log(decoded.name+ " "+act+"d " + this.state.heading);
                }else if(parseInt(res.data.status) == 202){
                    if(act == "like"){
                        this.setState({likes : this.state.likes+1, dislikes : Math.max(this.state.dislikes-1,0)});
                    }else{
                        this.setState({likes : Math.max(this.state.likes-1, 0), dislikes : this.state.dislikes+1});
                    }
                    console.log(decoded.name+ " reverted from "+act+" action for " + this.state.heading);
                }else if(parseInt(res.data.status) == 205){
                    console.log(decoded.name+ " already liked " + this.state.heading + "No action performed");
                }else{
                    console.log("status code didn't match, It is a error");
                }
            }).catch((err)=>{
                console.log("error at server end ", err);
            });
        }catch(err){
            console.log("error while adding like")
        }
    }

    onLikeAction = (e) => {
        e.preventDefault();
        this.onReactAction('like');
    }
    onDislikeAction = (e) => {
        e.preventDefault();
        this.onReactAction('dislike');
    }

    onhandleCommentIconClick = (e) =>{
        e.preventDefault();
        let show_comments = this.state.show_comments
        this.setState({
            show_comments : !show_comments
        });
    }

    render(){
        const {show_comments} = this.state;
        return(
            <div className = "cReport">
                <div className = "cReport__info">
                    <div className = "cReport__info__user">
                        <Avatar />
                        <h5>{this.state.username}</h5>
                    </div>
                    <small>
                        <div>{this.state.timestamp}</div>
                        <div>{this.state.city},{this.state.state}</div>
                    </small>
                </div>
                <div className = "cReport__body">
                    <div className = "cReport__body__header">
                        <h5>Heading of the report</h5>
                        {/* <div className="cReport__similar">
                            <p>Similar Reports</p>
                        </div> */}
                    </div>
                    <div className = "cReport__body__content" style={{width:"100%"}}>
                        {/* { this.state.isClickedMore ?
                            <div className = "cReport__des">
                                <p>{this.state.des}</p>
                                <ButtonBase className = "cReport__des__btn">...less</ButtonBase>
                            </div>
                            :
                            <div className = "cReport__des">
                                <p>{this.state.des}</p>
                                <ButtonBase className = "cReport__des__btn">...more</ButtonBase>
                            </div>
                        } */}
                        <ShowMoreText
                            lines={2}
                            more='Show more'
                            less='Show less'
                            expanded={false}
                            >
                            {this.state.des}
                        </ShowMoreText>
                        <div className = "cReport__img">
                            <img src={'assets/Images/placeholder.png'} alt="" />
                        </div>
                    </div>
                    <div className="cReport__body__footer">
                        <div className="cReport__body__footer__Action" onClick={this.onLikeAction}>
                            <ArrowUpwardOutlinedIcon />
                            {this.state.likes}
                        </div>
                        <div className="cReport__body__footer__Action" onClick={this.onDislikeAction}>
                            <ArrowDownwardOutlinedIcon />
                            {this.state.dislikes}
                        </div>
                        <div className="cReport__restAction">
                            <RepeatOutlinedIcon />
                        </div>
                        <div className = "space__between"/>
                        <div className="cReport__restAction" onClick={this.onhandleCommentIconClick}>
                            <ChatBubbleOutlineOutlinedIcon />
                        </div>
                        <div className="cReport__body__footer__Left">
                            <ShareButton />
                        </div>
                        <div className="cReport__body__footer__Left">
                            <UncontrolledDropdown>
                                <DropdownToggle className="dropdown-toggle-button" style={{color:"#737373",background:"#ffffff", border:"2px black",padding:"0", }} >
                                    <MoreHorizOutlined  />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Report Inappropriate</DropdownItem>
                                    <DropdownItem>Save Report</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    { this.state.show_comments &&
                    <div className="cReports__body_comments">
                        <Comments rid={this.props.Card.id}/>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default CovidReport;
