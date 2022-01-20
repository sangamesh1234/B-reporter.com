import React from 'react';
import '../../css/FilterPopup.css';
import Select from 'react-select';
import {Row, Col, Label} from 'reactstrap';

// ==================================================================================  
export default function Filterpopup(props){
  let active = props.active
    /*const colourStyles = {// SETS STyles for the Select Option Bar
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
};*/

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
  props.SearchClicked()
}
const style ={
  width:"500px",
  padding:"5px",
}

// =============================================================================================
return(
    <div  className="FilterPopup" >
        <Row className="Coronaform">
                {props.show_names && <Label className="country" md={3}>Country</Label>}
                <Select className="Select mr-3" 
                    md={8}
                    onChange={props.CountrySelect} 
                    placeholder="Select the Country"
                    //styles={colourStyles}
                    isClearable
                    value={{label:props.filterState.value.Country}}
                    noOptionsMessage={()=>"No Country Found"}
                    options={countryOptions(props)} 
                />
        </Row>
        <Row className="Coronaform">
            {props.show_names && <Label className="state" md={3}>State</Label>}
            <Select className="Select mr-3" 
                md={8}
                onChange={props.StateSelect} 
                placeholder="Select a State"
                //styles={colourStyles}
                value={{label:props.filterState.value.State}}
                isClearable
                noOptionsMessage={()=>"No State Found"}
                options={stateOptions(props)} 
            />
        </Row>
        <Row className="Coronaform">
            {props.show_names && <Label className="city" md={3}>City</Label>}
            <Select className="Select mr-3" 
                md={8}
                onChange={props.CitySelect} 
                value={{label:props.filterState.value.City}}
                placeholder="Select the City"
                //styles={colourStyles}
                isClearable
                noOptionsMessage={()=>"No City Found"}
                options={cityOptions(props)} 
            />
        </Row>
    </div>

)

} 
