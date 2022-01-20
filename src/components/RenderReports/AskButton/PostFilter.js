import React, { Component } from "react";
import PostQuestion from './PostQuestion' 
import axios from 'axios';
import CONFIG from '../../Config/Config';
class DataFilter extends Component{
  constructor(props) {
    super(props);
      this.state = {
        Data : require("../../../DataBase/CountriesData.json"),
        filter:[{"Country":"None","State":"None","City":"None"}],
        value:{"Country":'Select a Country...',"State":'Select a State...',"City":'Select a City...'},
        state:[],
        cities:[],
    }; 
  }
  //-------------{{ COUNTRY FILTERS}}--------------------------------------
  countrySelected=(arr)=>{
      const {Data,filter,value}= this.state;
      let countryfilter = [...filter]
      const CurrentValue=value;

      if(arr===null){
        console.log("Country IN")
        CurrentValue.Country="Select a Country..."
        CurrentValue.State="Select a State..."
        CurrentValue.City="Select a City..."
        countryfilter=[{"Country":"None","State":"None","City":"None"}]
        this.setState({
          value:CurrentValue,
          filter:countryfilter,
          state:[],
          cities:[]
        })
        return
      }else{

        CurrentValue.Country=arr.value
        CurrentValue.State="All"
        CurrentValue.City="All"
        this.setState({
          value:CurrentValue
        })
      }
      const seletedCountryid = Data.findIndex(p=>{return p.name === arr.value});
      const countryStates = [...Data[seletedCountryid].states]
      countryfilter[0].Country=Data[seletedCountryid].name
      if(countryStates.length===0 ){
        countryfilter[0].State="None"
        CurrentValue.State="No State Found..."
        CurrentValue.City="No City Found..."
      this.setState({
        value:CurrentValue
      })
      }else{
        countryfilter[0].State=Data[seletedCountryid].states[0].name
      }
      countryfilter[0].City="None"
      this.setState({
          filter:countryfilter,
          state:countryStates,
          cities:[]
      })
  }

//------------------{{ STATE FILTERS}}-----------------------------------------
  stateSelected=(arr)=>{
    const {state,filter,value}= this.state;
    const statefilter =filter
    const CurrentValue=value;

    if(arr===null){
        CurrentValue.State="Select a State..."
        CurrentValue.City="Select a City..."
        statefilter[0].State ="None"
        statefilter[0].City ="None"
        this.setState({
          value:CurrentValue,
          filter:statefilter,
          cities:[]
        })
      return
    }else{
      CurrentValue.State=arr.value
      CurrentValue.City="All"
      this.setState({
        value:CurrentValue
      })
    const seletedStateid = state.findIndex(p=>{return p.name=== arr.value });
    if(seletedStateid === -1){
      CurrentValue.State="No State Found"
      CurrentValue.City="No City Found"
      this.setState({
        value:CurrentValue
      })
        return;
    }
    const statesCities = [...state[seletedStateid].cities]
    statefilter[0].State= state[seletedStateid].name
    if(state[seletedStateid].cities.length===0){
      CurrentValue.City="No City Found"
      this.setState({
        value:CurrentValue
      })
      return
    }
    statefilter[0].City=state[seletedStateid].cities[0].name
    this.setState({
        filter :statefilter,
        cities:statesCities
    })
  }
}
//------------------------{{ CITY FILTERS}}------------------------------------
citySelected=(arr)=>{
  const {cities,filter,value}= this.state;
  const cityfilter =filter;
  const CurrentValue=value;
  if(arr===null){
    CurrentValue.City="Select a City..."
    cityfilter[0].City ="None"
    this.setState({
      value:CurrentValue,
      filter:cityfilter,
    })
    return
  }else{
    CurrentValue.City=arr.value
    this.setState({
    value:CurrentValue
    })
  
  const selectedcityid = cities.findIndex(p=>{return p.name === arr.value }); 
  cityfilter[0].City= cities[selectedcityid].name
  this.setState({
      filter :cityfilter,
  })
  }
}
submit_question = (submittedvalue) => {
    let obj = {
      Ques: submittedvalue,
      QuesName: "hidden",
      QuesLocation: this.state.value["Country"] + " " + this.state.value["State"] + ", " + this.state.value["City"],
      // QuesLocation: this.stat
    }
    console.log(submittedvalue)
    axios.post(CONFIG.server+'/users/addques', obj).then((res) => {alert("posted successfully");})
    .catch((err) => {
        alert("error while posting question");
        console.log(err);
    });
    
  };
    render() {
      const {filter} =  this.state;
        return (
          <>
     <PostQuestion 
         CountrySelect={this.countrySelected} 
         StateSelect={this.stateSelected}
         CitySelect={this.citySelected}
         filterState={this.state}
         setActive={this.props.setActive}
         active={this.props.active}
        //  SearchClicked={this.props.datafilters.bind(this,filter)}
         //SearchClicked={()=>console.log(filter)}
          SearchClicked={(value)=>this.submit_question(value)}
         />
         </>
        );
      };
}  

export default DataFilter;