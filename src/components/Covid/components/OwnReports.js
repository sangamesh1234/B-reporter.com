import React, {Component} from 'react'
// import { useHistory } from 'react-router-dom';
// import { auth } from './firebase.js';
import '../css/Home.css';
import FilterMain from './FilterMain';
import Feed from './Feed';
import axios from 'axios';
import CONFIG from '../../Config/Config';
import jwt_decode from 'jwt-decode';
import Widget from './Widget';

class OwnReports extends Component{
    constructor(props){
        super(props)
        this.state = {
            formView : false,
            isActive : this.props.isActive,
            AllCReports: [],
            loading : false
        }
    }
    async componentWillMount(){
        console.log(this.state.isActive,"in own Reports");
        const token = localStorage.usertoken;
        if (token === ''|| (this.state.isActive == null || this.state.isActive === false)) {
            // window.location.replace("http://localhost:3000/signin");
            this.props.handleClick("/signin");
        }else{
            const decoded = jwt_decode(token);
            console.log("decoded " , decoded);
            this.setState({loading: true},
                await axios.get(CONFIG.server + '/users_covid/Creports/'+ decoded.id)
                .then((res)=> {
                    console.log(res);
                    this.setState({AllCReports:res.data});
                    //
                }).catch((error)=>console.log(error))
            );
	    }
        console.log("login status : ", this.state.isActive);
        console.log(this.state.AllCReports);
    }

    render(){
        return (
            <div className='main'>
                <div className="filter">
                    <FilterMain />
                </div>
                <div className="report_feed">
                    {this.state.loading && 
                        <Feed AllCReports={this.state.AllCReports} isActive={this.state.isActive}/>
                    }
                </div>
                <div className="stat_feed">
                    <Widget />
                </div>
            </div>
        )
    }
}
export default OwnReports;