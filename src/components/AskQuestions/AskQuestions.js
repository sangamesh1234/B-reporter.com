import React, { Component } from 'react';
import Sidebar from '../SideBar/Sidebar'

// import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './AskQuestions.css';
import QuestionList from './QuestionList/QuestionList'
import jwt_decode from 'jwt-decode';
// import Loader from './QuestionLoader/QuestionLoader'
// import DeleteButton from './DeleteButton/DeleteButton'
import CONFIG from '../Config/Config';

const token = localStorage.usertoken;

const name = token?jwt_decode(token).name:"Anonomous User";

class AskQuestions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			QuestionsData: [],
			AnswersData: [],
			loading:false,
			content:'',
			showQuestions: false,
		};
	}
	componentDidMount(){
		axios
		.get(CONFIG.server + '/users/questions')
		.then((res) => {
			this.setState({QuestionsData:res.data});
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
	axios
		.get(CONFIG.server + '/users/answers/1')
		.then((res) => {
			this.setState({AnswersData:res.data});
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
	}
	// =======================================================
	QuestionForm = () => {
		const {QuestionsData} = this.state
		//  =======================
	this.handleSubmit = (e) => {
			e.preventDefault();
			let Question = QuestionsData
			var authorVal = name;
			var textVal = e.target[0].value;
			if (!textVal || !authorVal) {
				return;
			}
			Question.unshift({id:null,question:textVal,answers:[]});
			this.setState({QuestionsData: Question });
			e.target[0].value = '';
			e.target[1].value = '';
			return;
		};
		// ============================
		return (
				<form onSubmit={this.handleSubmit} className="QuestionForm">
					<textarea
						type="text"
						placeholder="Question Something.."
						value={this.state.content}
						onChange={()=>console.log("Changed")}
						required
					/>
					<button type="submit">Add Question</button>
				</form>
		);
	}

	// ================================================
	render() {	
			return (
				<>
						<div><Sidebar FilterData={this.props.Ref}/></div>
					<div>

							<QuestionList Ref={this}/>
					</div>
				</>
			);
		}
	}

export default AskQuestions;
