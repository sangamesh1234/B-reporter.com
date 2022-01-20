import React, { Component } from "react";
import FeedBox from "./FeedBox";
import "../css/Feed.css";
import CovidReport from "./CovidReport";
import GroupWorkIcon from '@material-ui/icons/GroupWork';

class Feed extends Component{
    constructor(props){
        super(props)
        this.state = {
            isActive : this.props.isActive,
            cards : this.props.AllCReports
        }
    }
    componentDidMount(){
        console.log("this is in Feed with login status : ", this.state.isActive);
        console.log("this are cards in feed ", this.state.cards);
        console.log("card finishes");
    }

    async componentWillReceiveProps(nextProps){
        await this.setState({
            cards: nextProps.AllCReports
        });
    }
    render(){
        console.log("In Feed, ",this.state);
        return (
            <div className="feed">
                <FeedBox />
                {(this.state.cards).map((card) => (
                    <CovidReport key={card.id} Card = {card}/>
                ))}
                <div className = "all_cought_up">
                    <GroupWorkIcon/>
                    Hey.. All Cought Up!
                </div>
            </div>
        )
    }
}

export default Feed;
