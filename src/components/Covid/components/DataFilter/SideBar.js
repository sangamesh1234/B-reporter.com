import React,{useState} from 'react';
// import $ from 'jquery'
import '../../css/SideBar.css';
import DataFilter from './DataFilter';

const SideBar=(props)=>{
  const [Filterclicked, setRegion]=useState(false);
  function renderFilterSearch(filters){
    let results = [];
    let countryResults = [];
    let stateResults = [];
    console.log(filters);
    const { data } = props.FilterData.state;
    let Data = data;
    if(filters[0].Country.toLowerCase()==="all"){
      props.FilterData.setState({
        FilterResults:data
      });
      return
    }
    countryResults = Data.filter( function( el ) {
      return filters[0].Country.toLowerCase() === el.country.toLowerCase()&&results.unshift(el);
    });
  stateResults = countryResults.filter( function( el ) {
    return filters[0].State.toLowerCase() === el.state.toLowerCase()&&results.splice(results.findIndex(report => report.id === el.id),1)&&results.unshift(el);
  });
  stateResults.filter( function( el ) {
    return filters[0].City.toLowerCase() === el.city.toLowerCase()&&results.splice(results.findIndex(report => report.id  === el.id),1)&&results.unshift(el);
  });

  /*if (results.length !== 0) {
    props.FilterData.setState({
      FilterResults: results,
    });
  } else {
    alert('No Data found for this Region');
  }*/
}
    return(<>
  
  <div>
    <DataFilter
      datafilters={renderFilterSearch}
      setActive="true" Active="true"
      show_names = {props.show_names}
      LoginStatus={props.FilterData}
      handleCountryOption={props.handleCountryOption}
      handleStateOption={props.handleStateOption}
      handleCityOption={props.handleCityOption}
    />
  </div>

 </>
 );
}
export default SideBar;