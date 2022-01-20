import React from 'react';
import './Filter.css';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            byTime : true, // True if latest reports are shown first
            country : "",
            state : "",
            city : "",
            categories : ""
        }
        this.getFilteredList = this.getFilteredList.bind(this);
    }

    componentDidUpdate(state) {
        console.log(this.state);
    }

    getFilteredList(state) {
        let FilteredResults = this.props.data.filter(function(report) {
            let matched_location = true, matched_category = true;
         
            if ((state.country !== "" && state.country !== report.country) ||
                (state.state !== "" && state.state !== report.state) || 
                (state.city !== "" && state.city !== report.city)) {

                matched_location = false;
            }

            if (state.categories==="") return matched_location;

            // state.categories.split(',').map((category) => {
            //     report.categories.map((report_category) => {
            //         if (category === report_category) {
            //             matched_category = true;
            //         }
            //     })
            // })

            return (matched_category && matched_location);
        });

        if (!state.byTime) {
            FilteredResults.reverse();
        }
        console.log(this.props.data);
        console.log(FilteredResults);
        return FilteredResults;
        // this.props.onFiltersChange(FilteredResults);
    }


    render() {   
        return (
            <nav className="side-bar-left">
                <ul>
                    <li>
                        <input onChange={()=>{this.setState({byTime : !this.state.byTime}, 
                                                            ()=>{
                                                                this.props.onFiltersChange(this.getFilteredList(this.state));} ) }} 
                               type="checkbox" checked={this.state.byTime} value="byTime" /> By Time
                    </li>
                    <h2 className= "location_heading">By Region</h2>
                    <li>
                    <label>
                        Country: <input type="text" name="country" placeholder="Search for Country"
                                        onChange={(e)=>{this.setState({country : e.target.value}, 
                                                             ()=>{
                                                                this.props.onFiltersChange(this.getFilteredList(this.state))}) }}
                                        value = {this.state.country}/>
                    </label>
                    </li>
                    <li>
                    <label>
                        State: <input type="text" name="state" placeholder="Search for State"
                                        onChange={(e)=>{this.setState({state : e.target.value}, 
                                                        ()=>{
                                                            this.props.onFiltersChange(this.getFilteredList(this.state))}) }}
                                        value = {this.state.state}/>
                    </label>
                    </li>
                    <li>
                    <label>
                        City: <input type="text" name="city" placeholder="Search for City"
                                        onChange={(e)=>{this.setState({city : e.target.value},
                                             ()=>{
                                                this.props.onFiltersChange(this.getFilteredList(this.state))})} }
                                        value = {this.state.city}/>
                    </label>
                    </li>
                    <li>
                    <label>
                        Categories: <input type="text" name="categories" placeholder="Search for Category"
                                        onChange={(e)=>{this.setState({categories : e.target.value},
                                             ()=>{ this.props.onFiltersChange(this.getFilteredList(this.state))})} }
                                        value = {this.state.categories}/>
                    </label>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default Filter;