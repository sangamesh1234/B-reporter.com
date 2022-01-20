import React, { useState } from 'react';
// import DataFilter from '../DataFilter/DataFilter';
import Comments from '../Comments/Comments';
import RenderVideo from '../RenderVideo/RenderVideo';
// import ReactAudioPlayer from 'react-audio-player';
import '@brainhubeu/react-carousel/lib/style.css';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import './ReportList.css';
import ShareButton from '../ShareButton/ShareButton';
import RenderImages from '../RenderImages/RenderImages';
import LikeButton from '../LikeButton/LikeButton';
import { MdModeComment} from 'react-icons/md';
import CardLoader from '../../CardLoader/CardLoader'
import Sidebar from '../../SideBar/Sidebar'
import AskButton from '../AskButton/AskButton'
import Filter from '../../Filters/Filter'
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Button, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
class ReportList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FilterResults : this.props.FilterResults,
			isActive : this.props.isActive
		}
	}

	render() {
		
		return (
			<>
			<div className="Home-page-background">
			<Container>
				<Row>
			{this.state.FilterResults.map((report) => {
				return <React.Fragment  key={report.id}>

				<Col sm={{size:12, offset:0}} xs={{size:12, offset:0}} md={{size:12, offset:'auto'}} lg={{size:12, offset:0}} xl={{size:6, offset:0}}>
				<div className="ReportContainer">
							<div className="panel-default">
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
													{/* eslint-disable-next-line */}
													<div style={{display:"flex",flexDirection:"row"}}><a href="#" className="anchor-username"><h4 className="media-heading">{report.name.replace(/\s/g, "_")}</h4></a>
														{/* eslint-disable-next-line */} 
															<a href="#" className="anchor-time">{report.created}</a>
														{/* eslint-disable-next-line */}
													</div>  
													<AskButton/>
													<img className="flag" src={'/assets/Flags/' + report.country + '.png'} alt="flag" />
													<h6 className="Place">
														{report.country}, {report.state}, {report.district+"."}
													</h6>
												</div>
											</div>
											<div className="ml-auto">
												{/* eslint-disable-next-line */}
												<a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
											</div>
										</div>
									</section>
									<div className="cardBody">
										<section className="post-body">
											<p>{report.description}</p>
										</section>
									</div>
								</div>
							</div>   
				</div>
				</Col>
					</React.Fragment>})}
				</Row>
			</Container>
			</div>
		</>
		);
	}
}



export default ReportList;

// import React, { useState } from 'react';
// // import DataFilter from '../DataFilter/DataFilter';
// import Comments from '../Comments/Comments';
// import RenderVideo from '../RenderVideo/RenderVideo';
// // import ReactAudioPlayer from 'react-audio-player';
// import '@brainhubeu/react-carousel/lib/style.css';
// import { IconContext } from 'react-icons';
// import { FaUserTie } from 'react-icons/fa';
// import './ReportList.css';
// import ShareButton from '../ShareButton/ShareButton';
// import RenderImages from '../RenderImages/RenderImages';
// import LikeButton from '../LikeButton/LikeButton';
// import { MdModeComment} from 'react-icons/md';
// import CardLoader from '../../CardLoader/CardLoader'
// import Sidebar from '../../SideBar/Sidebar'
// import AskButton from '../AskButton/AskButton'
// import Filter from '../../Filters/Filter'
// import { Link, Redirect, NavLink } from 'react-router-dom';
// import { Container, Row, Col } from 'reactstrap';
// import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Button, UncontrolledPopover, PopoverBody } from 'reactstrap';
// import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
// class ReportList extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			FilterResults : this.props.FilterResults,
// 			showComments : false,
// 			reportIdClicked : null,
// 			isActive : this.props.isActive
// 		}
// 	}
	
// 	componentDidMount() {
// 		console.log(this.props);
// 		// console.log(this.state.FilterResults);	
		
// 	}

// 	componentDidUpdate() {
// 		console.log(this.state);
// 	}

// 	setReportId(id) {
// 		this.setState({reportIdClicked : id});
// 	}

// 	setComments(showComments) {
// 		this.setState({showComments : showComments});
// 	}

// 	check_status(report) {
// 		// const { isActive } = this.props.state;
// 		if (this.state.isActive == null || this.state.isActive === false) {
// 			alert('Login First');
// 			window.location.replace("http://localhost:3000/login");

// 		} else {
// 			localStorage.setItem('RepID', report.id);
// 			localStorage.setItem('RepName', report.name);
// 			this.setReportId(report.id);			
// 			if (this.state.showComments===true) {
// 				if (this.state.reportIdClicked===report.id) {
// 					this.setComments(!this.state.showComments)
// 				}
// 				else {
// 					this.setReportId(report.id) && this.setComments(!this.state.showComments);
// 				}
// 			}
// 			else {
// 				this.setComments(!this.state.showComments);
// 			}
// 			// this.state.showComments===true?this.state.reportIdClicked===report.id?this.setComments(!tshowComments):this.setReportId(report.id) && this.setComments(!showComments):this.setComments(!showComments);
// 		}
// 	}
	
// 	handleFilters = (newFilterResults) => {
// 		this.setState({FilterResults : newFilterResults});
// 	}

// 	render() {
		
// 		if (this.state.FilterResults.length === 0) {
		
// 			return (
// 				<>
// 					<Filter data={this.props.data} onFiltersChange={this.handleFilters}/>
// 					<div className="Loader"><CardLoader/></div>
// 				</>
				
// 			);
// 		}
// 		else {
// 			return (
// 			<>
// 			{/*<div><Sidebar/></div>*/}
// 			<div className="Home-page-background">
// 			<div className="Trending-news">
// 				<Toast>
// 					<ToastHeader className="trending-header">
// 						Trending News!
// 					</ToastHeader>
// 					<ToastBody className="trending-body">
// 						Trending News 1
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						Trending News 2
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						Trending News 3
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						Trending News 4
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						Trending News 5
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						Trending News 6
// 						<hr></hr>
// 					</ToastBody>
// 					<ToastBody className="trending-body">
// 						dvjknfdbmlfd,
// 						backgrounddvjkjkvfdgffd
// 						dvjkbnklf
// 						dsvkjnklndlmb
// 						dsbvbksnlbm;ldf
// 						vdsbjkbkldfb
// 						kdsjbvjnblm;lb
// 						dbsvbjfkbnr
// 						dbvjfsdkm;
// 						bdjflkdmsl;nisfbdnklnm
// 					</ToastBody>
// 				</Toast>
// 			</div>
// 			<Filter data={this.props.data} onFiltersChange={this.handleFilters} />
// 			<Container>
			
// 				<Row>
// 			{this.state.FilterResults.map((report) => {
// 				return <React.Fragment  key={report.id}>

// 				<Col sm={{size:12, offset:0}} xs={{size:12, offset:0}} md={{size:12, offset:'auto'}} lg={{size:12, offset:0}} xl={{size:6, offset:0}}>
// 				<div className="ReportContainer">
// 							<div className="panel-default">
// 								<div className="panel-body">
// 									<section className="post-heading">
// 										<div className="row">
// 											<div className="media">
// 												<div className="media-left">
// 													{/* eslint-disable-next-line */}
// 													<a href="#">
// 													<IconContext.Provider value={{ className: "UserIcon" }}>
// 														<FaUserTie /> 
// 													</IconContext.Provider></a>
// 												</div>
// 												<div className="media-body">
// 													{/* eslint-disable-next-line */}
// 													<div style={{display:"flex",flexDirection:"row"}}><a href="#" className="anchor-username"><h4 className="media-heading">{report.name.replace(/\s/g, "_")}</h4></a>
// 														{/* eslint-disable-next-line */} 
// 															<a href="#" className="anchor-time">{report.created}</a>
// 														{/* eslint-disable-next-line */}
// 													</div>  
// 													<AskButton/>
// 													<img className="flag" src={'/assets/Flags/' + report.country + '.png'} alt="flag" />
// 													<h6 className="Place">
// 														{report.country}, {report.state}, {report.city+"."}
// 													</h6>
// 												</div>  									                             
// 											</div>
// 											<div className="ml-auto">
// 												{/* eslint-disable-next-line */}
// 												<a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
// 											</div>
// 										</div>             
// 									</section>
// 									<div className="cardBody">
// 									<div className ='report'>{report.media.toString().endsWith("mp4") ? <RenderVideo report={report}/>:<RenderImages report={report}/>}</div>
// 										<section className="post-body">
// 											<p>{report.description}<br/>
// 												Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras 
// 												turpis sem, dictum id bibendum eget, malesuada ut massa. Ut scel
// 												erisque nulla sed luctus dapibus. Nulla sit amet mi vitae purus sol
// 												licitudin venenatis. Praesent et sem urna. Integer vitae lectus nis
// 												l.
// 											</p>
// 										</section>
// 									</div>
// 									<section className="post-footer" >
// 										<div className="post-footer-option">
// 											<ul className="list-unstyled">
// 												<li ><LikeButton report={report} LoginStatus={this.state.isActive}/></li>
// 												<li onClick={()=>{this.check_status(report)}}>				  
// 													<IconContext.Provider  value={{className:"CommentIcon"}}>
// 														<MdModeComment /> 
// 													</IconContext.Provider>
// 												</li>
// 												<li><ShareButton LoginStatus={this.props.Ref}/></li>
// 											</ul>
// 										</div>
// 									</section>
// 									{this.state.reportIdClicked===report.id?this.state.showComments?<><Comments LoginStatus={this.props.Ref}/></>:null:null}            
// 								</div>
// 							</div>   
// 				</div>
// 				</Col>
// 					</React.Fragment>})}
// 				</Row>
// 			</Container>
// 			</div>
// 		</>
// 		);
// 	}	
// 	}
// }



// export default ReportList;
