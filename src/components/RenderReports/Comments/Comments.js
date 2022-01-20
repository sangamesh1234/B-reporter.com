import React, { Component } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import axios from 'axios';
import './Comment.css';
import jwt_decode from 'jwt-decode';
import Loader from './CommentLoader/CommentLoader'
import DeleteButton from './DeleteButton/DeleteButton'
import CONFIG from '../../Config/Config';
const token = localStorage.usertoken;

const decoded = token?jwt_decode(token):"s";

class CommentBox extends Component {
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

			axios
			.get(CONFIG.server + '/users/comments/' + localStorage.RepID)
			.then((response) =>  response.data.reverse())
			.then((data) => {
				data = this.getDate(data);
				console.log(data);
				this.setState({ comments: data,loading:false });
			})
			.catch((error) => console.log(error));

		})
		
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
		comment.created=' -- Posted ' + date + ' at ' + time;
	   })
	   return data;
	}
	// =====================================================
  

	// =======================================================
	CommentForm = () => {
		const {comments} = this.state
		//  =======================
	this.handleSubmit = (e) => {
			e.preventDefault();
			let comment =comments
			console.log(localStorage.RepID.split('"')[0]);
			let content = {
				RepID: localStorage.RepID,
				ComID: decoded.id,
				comm: e.target[0].value,
				RepName: localStorage.RepName,
				ComName: decoded.name,
				created:" -- just now",
			};
			//const RepID = localStorage.RepID;
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
			axios
				.post(CONFIG.server+'/users/addcomments', content)
				.then((res) => {
				// console.log(res);
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
	CommentList = (props) => {
		const {loading,comments} = this.state;
		var State= this;
		return (<>
			<div className="comment-list">
			<h4>COMMENTS</h4>
				<div className="box">
					<div className="commentForm">{this.CommentForm()}</div>
		{loading?<Loader/>:comments.length!==0?comments.map(function (c, index){
						return (
							<div key={index} className="Comments">
							  <h5>
									<IconContext.Provider value={{ className: 'CommentUserIcon' }}>
										<FaUserTie /> {c.ComName} <span>{c.created}</span>
									</IconContext.Provider>
									{decoded.id===c.ComID?<DeleteButton Comment={c} CommentState={State}/>:null}
								</h5>
								<p>{c.comm}</p>
							</div>
						);
					}):<h4>No Comments Yet !!!!!!</h4>}
				</div>
			</div>
		</>);
	};

	render() {	
			return (
				<>
					<div>
							{this.CommentList(this.props)}
					</div>
				</>
			);
		}
	}

export default CommentBox;
