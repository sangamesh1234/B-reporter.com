import React,{useState} from 'react';
// import $ from 'jquery'
import './Sidebar.css'
import DataFilter from '../RenderReports/DataFilter/DataFilter'



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

  if (results.length !== 0) {
    props.FilterData.setState({
      FilterResults: results,
    });
  } else {
    alert('No Data found for this Region');
  }
}
    return(<>
      <nav className="main-menu">
          <ul className="Filters">
          <div className="Section">
                      Filters
          </div>  
          <li className="nav-text">
                      By Time
          </li>
          <li className="nav-text" onClick={()=>setRegion(!Filterclicked)}>
                      By Region
          </li>
      </ul>
      <ul>
          <div className="Section">
                      Category
          </div>
          <li className="nav-text">
                      Uncategorised
          </li>
          <li className="nav-text">
                      Political
          </li>
          <li className="nav-text">
                      Crimes
          </li>
          <li className="nav-text">
                      Natural Disasters
          </li>
          <li className="nav-text">
                      Informative
          </li>
      </ul>
  </nav>
  <div><DataFilter datafilters={renderFilterSearch} setActive={()=>setRegion(!Filterclicked)} Active={Filterclicked} LoginStatus={props.FilterData}/></div>

 </>
 );
}
export default SideBar;