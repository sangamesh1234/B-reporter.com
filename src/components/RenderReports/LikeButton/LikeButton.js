import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdThumbUp } from 'react-icons/md';
import './LikeButton.css';
import axios from 'axios';
import CONFIG from '../../Config/Config';

class LikeButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {likeButtonClicked : false,
		likes : props.report.likes=== null ? 0 : props.report.likes,
		id : props.report.id}
	}
	// const [likeButtonClicked, setButtonStatus] = useState(false);
	// let likes = props.report.likes=== null ? 0 : props.report.likes;
	// let id = props.report.id;
	
	// ==============================
	 handleClicked(e){
		e.preventDefault();

		const  isActive  = this.props.LoginStatus;
	
		if (isActive == null || isActive === false) {
			alert('Login First');
			// window.location.replace('https://backend-279606.appspot.com/users/login');
			 window.location.replace("http://localhost:3000/login");
		} 
		else {
			console.log(this.state.likeButtonClicked)	
			this.setState({likeButtonClicked : !this.state.likeButtonClicked}, () => {
				console.log(this.state.likes);
				console.log(this.state.likeButtonClicked);
				this.setState({likes:this.state.likes + (this.state.likeButtonClicked ? 1 : -1)}, ()=>{
					console.log(this.state.likes);
					console.log("Clicked like")
					axios
						.put(CONFIG.server + '/users/reports/likes/' + this.state.id,{likes:this.state.likes} )
						.then((res) => {console.log(res)
						})
						.catch((err) => {
							// alert("error: 'User is not registered yet!!'");
							console.log(err);
						});
						})
				})
				// likes += (likeButtonClicked ? 1 : -1);
		}
	};

	// ====================================
	//  check_status() {
	// 	console.log(this.props);
		
	// }
	// =============================================
	render() {return (
			<div className="Likebutton" onClick={(e) => this.handleClicked(e) }>
				<IconContext.Provider value={{ className: 'LikeIcon' }}>
					<MdThumbUp color={this.state.likeButtonClicked ? 'rgb(98, 193, 236)' : 'grey'} round="true" />
				</IconContext.Provider>
			 {/* {likeButtonClicked ? likes + 1 : likes === 0 ? 0 : props.report.likes - 1} */}
			</div>
	);}
};
export default LikeButton;
