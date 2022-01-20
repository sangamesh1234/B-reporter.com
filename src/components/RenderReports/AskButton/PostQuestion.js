import React,{useState} from 'react';
import './PostQuestion.css'
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import Popup from "reactjs-popup";
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';

const PostQuestion=(props)=>{
  let active = props.active
  const [value, setValue]= useState("")
const colourStyles = {// SETS STyles for the Select Option Bar
  control: (styles) => ({
    ...styles,
    padding:3,
    paddingLeft:6,
    bottom:8,
    width:250,
    backgroundColor:"white",
  }),
  option: (styles) => ({
    ...styles,
    width:250,
    color:"black",
  }),
 
};

function countryOptions(props){//  Renders the List of all Countries
    let Data = props.filterState.Data;
    let countryOptions=[];
    Data.forEach((item) => {
      let temp={id: "null",value:"none",label:'None'};
      temp.id=item.id;
      temp.value=item.name;
      temp.label=item.name;
      countryOptions.push(temp)
    });

return(countryOptions)

}
// ===============================================================================
function stateOptions(props){//  Renders the List of all States in selected country
    let Data = props.filterState.state;
    let stateOptions=[];
    if(Data.length === 0){
      return;
    }
    // console.log(Data)
    Data.forEach((item) => {
      let temp={id: "null",value:"none",label:'None'};
      temp.id=item.id;
      temp.value=item.name;
      temp.label=item.name;
      stateOptions.push(temp)
    });
return(stateOptions)

}
// =====================================================================================
function cityOptions(props){//  Renders the List of all Cities in selected State
    let Data = props.filterState.cities;
    let cityOptions=[];
    if(Data.length===0){
      return
    }
    // console.log(Data)
    Data.forEach((item) => {
      let temp={id: "null",value:"none",label:'None'};
      temp.id=item.id;
      temp.value=item.name;
      temp.label=item.name;
      cityOptions.push(temp)
    });
return(cityOptions)
}

function FilterApplied(props){//Call renderSearchresults() method from posts component
  props.setActive();
  props.SearchClicked(value);
  console.log(value);

}
const style ={
  width:"500px",
  height:"max-content",
  padding:"10px",
}

// =============================================================================================
return(
  <Popup  open={active} closeOnDocumentClick contentStyle={style}>
    <div  className="PostQuestion" >
<div className="title">
  <h4>POST A QUESTION</h4>
</div>
<div className="PostForm">
<form  className="PostFormBody">
	<IconContext.Provider value={{ className: 'LoggedUserIcon' }}>
		<FaUserTie />
	</IconContext.Provider>
	<textarea
  id ="usertext"
	type="text"
	placeholder="Post a question......"
	onChange={(e)=> {setValue(e.target.value)}}
	required
	/>
</form>
</div>
<h5>Please Select who can answer* :</h5>
<div className="LocationFilters">
<Select className="Select mr-3" 
  onChange={props.CountrySelect} 
  placeholder="Select the Country"
  styles={colourStyles}
  isClearable
  value={{label:props.filterState.value.Country}}
  noOptionsMessage={()=>"No Country Found"}
  options={countryOptions(props)} />

 <Select className="Select mr-3" 
  onChange={props.StateSelect} 
  placeholder="Select a State"
  styles={colourStyles}
  value={{label:props.filterState.value.State}}
  isClearable
  noOptionsMessage={()=>"No State Found"}
  options={stateOptions(props)} /> 

 <Select className="Select mr-3" 
  onChange={props.CitySelect} 
  value={{label:props.filterState.value.City}}
  placeholder="Select the City"
  styles={colourStyles}
  isClearable
  noOptionsMessage={()=>"No City Found"}
  options={cityOptions(props)} />   
</div>
<div className="footer">
<Button variant="primary" size="lg" onClick={()=>FilterApplied(props)} value="Search" className="PostButton" >
Post  </Button>
  <Button variant="secondary" size="lg" onClick={() =>props.setActive()} value="Search" className="CloseButton" >
  Close        
  </Button>
</div>
</div>
</Popup>
)


} 
export default PostQuestion;
