import React, { Component } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CONFIG from './../../../Config/Config';

import Loader from './CommentLoader'
import DeleteButton from './DeleteButton';

import './../../css/Comments/Comment.css';
import CommentBox from './CommentBox';


class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			loading:false,
			showComments: false,
		};
	}
	componentDidMount() {
		this.setState({loading:true}, ()=>{
			axios.get(CONFIG.server + '/users/comments/' + this.props.rid)
			.then((res)=>{
				var data = this.getDate(res.data);
				data = data.reverse();
				this.setState({ comments: data,loading:false });
				console.log(data.length + " comments loaded for report : "+ this.props.rid);
				console.log(data);
			}).catch((e)=>{console.log("error while fatching comments for report ",this.props.rid)});
		});
	}
	// ======================================================
   getDate(data){
	   data.forEach((comment)=>{
		var commentDate = comment.created.split('T');
		commentDate[0] = commentDate[0].split('-');
		var date = getMonth(commentDate[0][1]) + ' ' + commentDate[0][2] + ', ' + commentDate[0][0];
		commentDate[1] = commentDate[1].split(':');
		var time = commentDate[1][0] + ':' + commentDate[1][1];
		function getMonth(value) {
			switch (value) {
				case "01" : return "January";
				case "02" : return "Febuary";
				case "03" : return "March";
				case "04" : return "April";
				case "05" : return "May";
				case "06" : return "June";
				case "07" : return "July";		
				case "08" : return "August";
				case "09" : return "September";
				case "10" : return "October";
				case "11" : return "November";
				case "12": return "December";
				default:return null;
			}
		}
		comment.created= date + ' at ' + time;
	   })
	   return data;
	}
	// =====================================================
  

	// =======================================================
	CommentForm = () => {
		const {comments} = this.state
		var token = localStorage.usertoken;
		var decoded = token?jwt_decode(token):null;
		console.log("In comments >> ", decoded.id);
		//  =======================
		this.handleSubmit = (e) => {
			e.preventDefault();
			let comment = comments
			console.log("comment form report id is > ",this.props.rid);
			let content = {
				uid : decoded.id,
				username : decoded.name,
				comment : e.target[0].value,
				report_id : this.props.rid,
				created : "now"
			};
			//const RepID = this.props.rid;
			//const RepName = localStorage.RepName;
			var authorVal = decoded.name;
			var textVal = e.target[0].value;
			if (!textVal || !authorVal) {
				return;
			}
			comment.unshift(content);
			this.setState({comments: comment });
			e.target[0].value = '';
			e.target[1].value = '';
			axios.post(CONFIG.server+'/users/add_direct_comments', content)
				.then((res) => {
					console.log(res);
					alert("comment posted successfully");
				})
				.catch((err) => {
					alert("error: 'Comment cant be added'");
					console.log(err);
				});
			return;
		};
		// ============================
		return (
			<>
				<form onSubmit={this.handleSubmit} className="createComment">
					<IconContext.Provider value={{ className: 'LoggedUserIcon' }}>
						<FaUserTie />
					</IconContext.Provider>
					<textarea
						type="text"
						placeholder="Comment Something.."
						value={this.state.content}
						onChange={this.handleTextChange}
						required
					/>
					<button type="submit">Comment</button>
				</form>
			</>
		);
	}

	// ================================================
	CommentList = () => {
		const {loading,comments} = this.state;
		var State= this;
		var token = localStorage.usertoken;
		var decoded = token?jwt_decode(token):null;
		return (<>
			<div>
				{/* <h4>COMMENTS</h4> */}
					<div className="commentForm">
							{this.CommentForm()}
					</div>
				<div className="comment-list">
					<div className="box">
						{loading?
							<Loader/>
						:(comments.length!==0)?
							comments.map(function (cmt, index){
								return (
									<div className="sideLine">
										<div key={index} className="Comments">
											<CommentBox commentCard = {cmt} report_uid={decoded.id} State={State}/>
										</div>
									</div>
								);
							})
							:<h4>No Comments Yet !!!!!!</h4>
						}
					</div>
				</div>
			</div>
		</>);
	};

	render(){
		return (
			<>
			<div>
				{this.CommentList()}
			</div>
			</>
		);
	}
}

export default Comments;
