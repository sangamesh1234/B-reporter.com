import React, { Component } from 'react';
// import DataFilter from '../DataFilter/DataFilter';
import Comments from '../RenderReports/Comments/Comments';
import RenderVideo from '../RenderReports/RenderVideo/RenderVideo';
// import ReactAudioPlayer from 'react-audio-player';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import './DisplayReport.css';
import ShareButton from '../RenderReports/ShareButton/ShareButton';
import RenderImages from '../RenderReports/RenderImages/RenderImages';
import LikeButton from '../RenderReports/LikeButton/LikeButton';
import jwt_decode from 'jwt-decode';
import { MdModeComment,MdLocationOn } from 'react-icons/md';
import CardLoader from '../CardLoader/CardLoader'
import AddReports from './AddReport'
import axios from 'axios';
import Sidebar from "../SideBar/Sidebar"
import CONFIG from '../Config/Config';
import Filter from '../Filters/Filter'
const token = localStorage.usertoken;
class DisplayReport extends Component{
    constructor(props) {
		super(props);

		this.state = {
			data:[],
            MyReports:[],
            showComments :false,
            name:token !== '' ? jwt_decode(token).name : 'Anonomous User',
            reportIdClicked:null,
            loading:false

	
		};
    }
    componentDidMount() {
        const token = localStorage.usertoken;
        console.log(token);

		this.setState({loading:true}, ()=>{

            if (token === '') {
                alert('User not logged-in, Please Login First!');
                window.location.replace("http://localhost:3000/login");
            }
            const decoded = jwt_decode(token);
            axios
                .get(CONFIG.server + '/users/reports/' + decoded.id)
                .then((response) => {
                    console.log(response.data);
                    this.setState({loading:false,MyReports:response.data.reverse(), data:response.data.reverse()});
                })
                .catch((error) => console.log(error));



		})
		
	}

	//var RepID = 0;
	//var RepName = '';
	getDate = (report) => {
		report = report.created.split('T');
		report[0] = report[0].split('-');
		var date = getMonth(report[0][1]) + ' ' + report[0][2] + ', ' + report[0][0];
		report[1] = report[1].split(':');

		var time = report[1][0] + ':' + report[1][1];
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
		return ' -- Posted ' + date + ' at ' + time;
	};

	commentClicked(report) {
        const {showComments,reportIdClicked}= this.state;
		console.log(report.id);		
			localStorage.setItem('RepID', report.id);
            localStorage.setItem('RepName', report.name);
            this.setState({reportIdClicked:report.id})
			showComments===true?reportIdClicked===report.id?this.setState({showComments:!showComments}):  this.setState({reportIdClicked:report.id}) && this.setState({showComments:!showComments}):this.setState({showComments:!showComments});
	}

	handleFilters = (newMyReports) => {
		this.setState({MyReports : newMyReports});
	}
    // =====================================
    
	//   ===================================
render(){
    const { MyReports,
		showComments,
        name,
        loading,
        reportIdClicked} = this.state;
	return <>
			<div><Filter data={this.state.data} onFiltersChange={this.handleFilters} /></div>
{loading?<><div className="Loader"><CardLoader/></div></>:MyReports.length===0?<AddReports/>:MyReports.map((report) => {
		return <React.Fragment  key={report.id}>	
			<div className="DisplayContainer">
					<div className="panel panel-default">
						<div className="panel-body">
						   <section className="post-heading">
								<div className="row">
									<div className="col-md-11">
										<div className="media">
										  <div className="media-left">
											   {/* eslint-disable-next-line */}
											<a href="#">
											<IconContext.Provider value={{ className: "UserIcon" }}>
												<FaUserTie /> 
											</IconContext.Provider></a>
										  </div>
										  <div className="media-body">
											  {/* eslint-disable-next-line */}
										    <div style={{display:"flex",flexDirection:"row"}}><a href="#" className="anchor-username"><h4 className="media-heading">{report.name.replace(/\s/g, "_")}</h4></a>
											 {/* eslint-disable-next-line */} 
											   <a href="#" className="anchor-time">{this.getDate(report)}</a>
											 {/* eslint-disable-next-line */}
											 <img className="flag" src={'/assets/Flags/' + report.country + '.png'} alt="demo" />
											 </div>  
												<h6 className="Place"><IconContext.Provider  value={{className:"LocationIcon"}}>
												<MdLocationOn /> 
											  </IconContext.Provider>{report.country}, {report.state}, {report.city+"."}</h6>
										 </div>  									                             
										</div>
									</div>
									 <div className="col-md-1">
																			{/* eslint-disable-next-line */}
										 <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
									 </div>
								</div>             
						   </section>
						   <hr/>
						   <div className="cardBody">
						   {report.media.toString().endsWith("mp4") ? <RenderVideo report={report}/>:<RenderImages report={report}/>}
						   <section className="post-body">
							   <p>{report.description}<br/>
							   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras 
							   turpis sem, dictum id bibendum eget, malesuada ut massa. Ut scel
							   erisque nulla sed luctus dapibus. Nulla sit amet mi vitae purus sol
							   licitudin venenatis. Praesent et sem urna. Integer vitae lectus nis
							   l. Fusce sapien ante, tristique efficitur lorem et, laoreet ornare lib
							   ero. Nam fringilla leo orci. Vivamus semper quam nunc, sed ornare magna dignissim sed. Etiam interdum justo quis risus
							   efficitur dictum. Nunc ut pulvinar quam. N
							   unc mollis, est a dapibus dignissim, eros elit tempor diam, eu tempus quam felis eu velit.</p>
						   </section>
						   </div>
						   <hr/>
						   <section className="post-footer" >
							   <div className="post-footer-option">
									<ul className="list-unstyled">
										<li ><i className="glyphicon glyphicon-thumbs-up"></i><LikeButton report={report} LoginStatus={this.props.LoginStatus}/></li>
										<li onClick={()=>this.commentClicked(report)}><i className="glyphicon glyphicon-comment"></i>				  
											<IconContext.Provider  value={{className:"CommentIcon"}}>
												<MdModeComment /> 
											  </IconContext.Provider> Comment</li>
										<li><ShareButton LoginStatus={this.props.LoginStatus}/></li>
									</ul>
							   </div>
						   </section>
						   {reportIdClicked===report.id?showComments?<><Comments username={name} LoginStatus={this.props.LoginStatus}/></>:null:null}            
						</div>
					</div>   
				</div>
			<br/>
</React.Fragment>})}
				
</>
}
}


export default DisplayReport;
