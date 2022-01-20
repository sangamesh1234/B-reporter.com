import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CONFIG from '../../Config/Config';
import Home from '../Home';
// import ReportList from '../../RenderReports/ReportList/ReportList'

const token = localStorage.usertoken;
class ShowReports extends Component{
    constructor(props) {
		super(props);
		this.state = {
            MyReports:[],
            name:token !== '' ? jwt_decode(token).name : 'Anonomous User',
            loading:false,
            isActive: this.props.LoginStatus.isActive
		};
    }
    componentDidMount() {
        const token = localStorage.usertoken;

		this.setState({loading:true}, ()=>{

            if (token === '') {
                alert('User not logged-in, Please Login First!');
                window.location.replace("http://localhost:3000/login");
            }
            const decoded = jwt_decode(token);
            axios
                .get(CONFIG.server + '/users_covid/covid_reports/' + decoded.id)
                .then((response) => {
                    console.log(response.data);
                    this.setState({loading:false,MyReports:response.data.reverse(), data:response.data.reverse()});
                })
                .catch((error) => console.log(error));
		});
	}

    render(){
        return <div>
            {/* <ReportList isActive = {this.state.isActive} FilterResults={this.state.MyReports}/> */}
            <Home isActive={false}/>
        </div>
    }
}
export default ShowReports;
