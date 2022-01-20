import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import DeleteButton from './DeleteButton';

class CommentBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentCard : this.props.commentCard,
            report_uid : this.props.report_uid,
        }
    }
    render(){
        return(
            <div className="Comment">
                <h5>
                    <IconContext.Provider value={{ className: 'CommentUserIcon' }}>
                        <FaUserTie /> {this.state.commentCard.username} <span>{this.state.commentCard.created}</span>
                    </IconContext.Provider>
                    {(this.report_uid===this.state.commentCard.uid)?
                        <DeleteButton Comment={this.state.commentCard} CommentState={this.props.State}/>
                    :null}
                </h5>
                <p>{this.state.commentCard.comment}</p>
            </div>
        );
    }
}
export default CommentBox;