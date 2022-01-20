import React, { useState } from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import AnswerList from '../AnswerList/AnswerList'
import './QuestionList.css';
// import LikeButton from '../LikeButton/LikeButton';
import jwt_decode from 'jwt-decode';
import CardLoader from '../../CardLoader/CardLoader';
import axios from 'axios';
import CONFIG from '../../Config/Config';
const token = localStorage.usertoken;
const QuestionList = (props) => {
	const [name] = useState(
		token.replace('Bearer ', '') !== '' ? jwt_decode(token.replace('Bearer ', '')).name : 'Anonomous User'
	);
	const [answer, setValue] = useState('');
	const submit_answer = (submittedvalue) => {
	    let ans = {
	      Ans: submittedvalue,
	      AnsName: "hidden",
	      // QuesLocation: this.stat
	    }
	    console.log(submittedvalue)
	    axios.post(CONFIG.server+'/users/addans', ans).then((res) => {alert("posted successfully");})
	    .catch((err) => {
	        alert("error while posting answer");
	        console.log(err);
	    });
    
  };
	
	return <>
{false?<><div className="Loader"><CardLoader/></div></>:
		props.Ref.state.QuestionsData.map((question)=><React.Fragment key={question.id}>	
			<div className="Question_container">
					<div className="panel panel-default">
						<div className="panel-body">
						   <section className="post-heading">
								<div className="row">
										<div className="media">
										  <div className="media-left">
											   {/* eslint-disable-next-line */}
											<a href="#">
											<IconContext.Provider value={{ className: "UserIcon" }}>
												<FaUserTie /> 
											</IconContext.Provider></a>
										  </div>
										  <div className="media-body">
										    <div style={{display:"flex",flexDirection:"row"}}>
												{/* eslint-disable-next-line */}
												<a href="#" className="anchor-username">
													<h4 className="media-heading">{name.replace(/\s/g, "_")}</h4>
												</a>
											 {/* eslint-disable-next-line */} 
											   <a href="#" className="anchor-time">Time</a>
											 {/* eslint-disable-next-line */}
											 <img className="flag" src={'/assets/Flags/'  + 'India.png'} alt="demo" />
											 </div>  
												<h6 className="Place">Location</h6>
										 </div>  									                             
										</div>
									 <div className="col-md-1">
												{/* eslint-disable-next-line */}
										 <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
									 </div>
								</div>             
						   </section>
						   <div className="Question">
							   <p>
								{question.Ques}</p>
						   </div>
							<AnswerList Ref={props.Ref} question={question}/>
						   <form  className="AnswerForm">
										<IconContext.Provider value={{ className: 'LoggedUserIcon' }}>
												<FaUserTie />
											</IconContext.Provider>
												<textarea
												type="text"
												placeholder="Reply...."
												value={answer}
												onChange={(e)=>setValue(e.target.value)}
												required
												/>
											<button type="submit" onClick = {(e)=>{
											
												console.log("user submitted this answer:"+ answer);
												submit_answer(answer);

											}}>Answer</button>
										</form>
						   <hr/>
						</div>
					</div>   
				</div>
			<br/>
			</React.Fragment>)
}</>
}

export default QuestionList;
