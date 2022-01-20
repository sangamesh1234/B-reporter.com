import React, {Component} from 'react'
// import { useHistory } from 'react-router-dom';
// import { auth } from './firebase.js';
import '../css/Home.css';
import CoronaForm from './CoronaForm';
import FilterMain from './FilterMain';
import {Button} from 'reactstrap';
import Feed from './Feed';
import axios from 'axios';
import CONFIG from '../../Config/Config';
import Widget from './Widget';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            formView : false,
            isActive : this.props.isActive,
            AllCReports: [],
            searched_query : this.props.searched_query,
            loading : false,
            earlierFirst: false
        }
		this.regionalReports = this.regionalReports.bind(this);
        this.categorialReports = this.categorialReports.bind(this);
    }
    async componentDidMount(){
        console.log("Props in home did mount : ", this.props);
        console.log(this.state.isActive,"in home");
        if (this.state.isActive == null || this.state.isActive === false) {
            // window.location.replace("http://localhost:3000/signin");
            this.props.handleClick("/signin");
        }else{
            console.log("checking searched query : ", this.props.searched_query);
            console.log("====================================================");
            console.log("====================================================");
            console.log("====================================================");
            console.log("====================================================");
            console.log("====================================================");
            console.log("====================================================");
            if(this.state.searched_query != null && this.state.searched_query != undefined && this.state.searched_query != ""){
                console.log("fatching search results for : ",this.state.searched_query);
                this.setState({loading: true},
                    await axios.get(CONFIG.server + '/users_covid/searched_reports/'+this.state.searched_query)
                    .then((res)=> {
                        console.log("Inside axios");
                        console.log(res);
                        if(!this.state.earlierFirst){
                            (res.data).reverse();
                        }
                        this.setState({AllCReports:res.data});
                        //
                    }).catch((error)=>console.log(error))
                );
            }else{
                console.log("fatching all reports : ");
                this.setState({loading: true},
                    await axios.get(CONFIG.server + '/users_covid/Creports')
                    .then((res)=> {
                        console.log(res);
                        if(!this.state.earlierFirst){
                            (res.data).reverse();
                        }
                        this.setState({AllCReports:res.data});
                        //
                    }).catch((error)=>console.log(error))
                );
                console.log("fatched all reports successfull", this.state.AllCReports.length);
            }
            console.log("finished fatching");
	    }
        console.log("login status : ", this.state.isActive);
        console.log(this.state.AllCReports);
    }

    regionalReports = (country, state, city) => {
		console.log("fatching regional reports in home");
		// const {country, state, city} = this.state;
        console.log(country, state, city);
        if(country == "Select a Country..."){
            console.log("fatching all reports : ");
            axios.get(CONFIG.server + '/users_covid/Creports')
            .then((res)=> {
                console.log(res);
                if(!this.state.earlierFirst){
                    (res.data).reverse();
                }
                this.setState({AllCReports:res.data});
                //
            }).catch((error)=>console.log(error))
            console.log("fatched all reports successfull", this.state.AllCReports.length);
        }else{
            var new_state = (state == "Select a State...")? null:state;
            var new_city = (city == "Select a City...")? null:city;
            axios.get(
                CONFIG.server + '/users_covid/filtered_report/'+country+'/'+new_state+'/'+new_city).then((res)=> {
                console.log("-------------------------------------------------------");
                if(!this.state.earlierFirst){
                    (res.data).reverse();
                }
                this.setState({AllCReports:res.data, loading:true});
                console.log("------------------------------------------------------==");
                console.log(this.state);
            }).catch((error)=>console.log(error))
            // this.setState({loading: true},
            //     axios.get(CONFIG.server + '/users_covid/filtered_report/'+country+'/'+state+'/'+city)
            //     .then((res)=> {
            //         console.log(res);
            //         if(!this.state.earlierFirst){
            //             (res.data).reverse();
            //         }
            //         this.setState({AllCReports:res.data});
            //     }).catch((error)=>console.log(error))
            // );
            console.log("finished regional based fatching", this.state);
        }
    }

    categorialReports = (obj) => {
        // serialize obj
        // pass to server
        // deserialize obj
        var serializedObj = obj;
		console.log("fatching categorial reports in home");
		console.log(obj);
	}

    render(){
        var {earlierFirst} = this.state;
        console.log("In home : ",this.state);
        return (
        <div className="screen_width">
            <div className='main'>
                <div className="filter">
                    <FilterMain onCheckTimeBox = {()=>this.setState({earlierFirst:!earlierFirst})}
                                isCheckedTimeBox = {earlierFirst}
                                fatch_regionalReports={this.regionalReports}
                                fatch_categorialReports={this.categorialReports}/>
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
        </div>
        )
    }
}
export default Home;


// thing which i deleted
// from manifest.json
//
// "icons": [
//     {
//       "src": "favicon.ico",
//       "sizes": "64x64 32x32 24x24 16x16",
//       "type": "image/x-icon"
//     },{
//     "src": "logo192.png",
//     "type": "image/png",
//     "sizes": "192x192"
//     },
//     {
//       "src": "logo512.png",
//       "type": "image/png",
//       "sizes": "512x512"
//     }
//   ],