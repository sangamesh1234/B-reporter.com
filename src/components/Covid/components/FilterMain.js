import React, { Component } from 'react';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
//import { FaUserAlt } from 'react-icons/fa';
//import { IconContext } from 'react-icons';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Nav, Navbar, UncontrolledDropdown, NavbarBrand, NavItem, NavbarToggler, Collapse, Button, 
	UncontrolledPopover, PopoverBody, 
	Form, FormGroup, Input, Label,
	Container, Row, Col,
	Dropdown, DropdownToggle, DropdownItem, DropdownMenu, NavbarText
} from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, makeStyles, InputLabel, MenuItem, FormHelperText, FormControl} from '@material-ui/core';
import Select from 'react-select';
import '../css/FilterMain.css';
import SideBar from './DataFilter/SideBar';
import axios from 'axios';
import CONFIG from '../../Config/Config';
import Constants from  './Contants';
import makeAnimated from 'react-select/animated';


const token = localStorage.usertoken;

class FilterMain extends Component {

	constructor(props){
		super(props);

		this.state ={
			country:null,
			state:null,
			city:null,

			ctValRange:'',
			vaccine: false,
			ageRange:null,
			symptoms:null,
			medicine:null,
			withReport:'',

			route: null,

			Uncategorised: false,
			Political: false,
			Crime: false,
			Natural: false,
			Informative: false,
			loading : false
		};

		this.handleCountryOption=this.handleCountryOption.bind(this);
		this.handleStateOption=this.handleStateOption.bind(this);
		this.handleCityOption=this.handleCityOption.bind(this);

		this.handleSymptomsChange=this.handleSymptomsChange.bind(this);
        this.handleMedicationChange=this.handleMedicationChange.bind(this);

		this.onFilterApply= this.onFilterApply.bind(this);
	}
	componentDidMount(){
		console.log(this.SymOptions);
		console.log(this.medOptions);
	}
	async handleCountryOption(value){
		await this.setState({
			country:value,
			state:null,
			city:null
		});
		const {country, state, city} = this.state;
		this.props.fatch_regionalReports(country, state, city);
	}
	async handleStateOption(value){
		await this.setState({
			state:value,
			city:null
		});
		const {country, state, city} = this.state;
		this.props.fatch_regionalReports(country, state, city);
	}
	async handleCityOption(value){
		await this.setState({
			city:value
		});
		const {country, state, city} = this.state;
		this.props.fatch_regionalReports(country, state, city);
	}

	onFilterApply = () =>{
		const {ageRange,ctValRange,vaccine,symptoms,medicine,withReport} = this.state;
		console.log("submit button pressed in fitlermain", this.state);
		const obj = {ageGroup : ageRange, ctValRange,vaccine,symptoms,medicine,withReport};
		this.props.fatch_categorialReports(obj);
	}

	handleSymptomsChange(event){
        var value='';
        for (var i = 0, l = event.length; i < l; i++) {
            value=value.concat((event[i].value).concat(','));
        }
        this.setState({ symptoms:  value});
    }
    handleMedicationChange(event){
        var value='';
        for (var i = 0, l = event.length; i < l; i++) {
            value=value.concat((event[i].value).concat(','));
        }
        this.setState({ medicine:  value});
    }

	render() {
		console.log("In filtermain : ", this.state);
		//
		const {vaccine, withReport } = this.state;
		const SymOptions = Constants.SymOptions;
		const medOptions = Constants.medOptions;
		const animatedComponents = makeAnimated();
		// if (route !== null) {
		// 	return <Redirect to={route} />;
		// }
		return (
			<>
			<div>
				<div>
					<Container className="filter-main">
						<Row>
							<Col sm={12}>
								<div className='time'>
									<legend className='filter-topic'>Earlier First</legend>
									<FormControlLabel
										control={<Checkbox
													checked={this.props.isCheckedTimeBox}
													onChange={this.props.onCheckTimeBox}
													name="earlierFirst" color="primary"
												/>}
										className = 'timeCheck'
										// label="Earlier First"
									/>
								</div>
							</Col>
							<Col sm={12}><hr></hr></Col>
							{/* By Region */}
							<Col sm={12}>
								<legend className='filter-topic'>Regional Sort</legend>
								<SideBar show_names={false} 
									handleCountryOption={this.handleCountryOption}
									handleStateOption={this.handleStateOption}
									handleCityOption={this.handleCityOption}
								/>
							</Col>

							<Col sm={12}><hr></hr></Col>

							{/* By Category */}
							<Col sm={12} className="category">
								<legend  className='filter-topic'>Categorial Sort</legend>
								<Row className="category">
									<FormControlLabel
										control={<Checkbox checked={vaccine}
													onChange={()=> this.setState({vaccine: !vaccine})}
													name="vaccine"
													color="primary"
													className="category" />
												}
										label="Vaccination"
									/>
								</Row>
								<Row className="category">
									<FormControlLabel
										control={<Checkbox checked={withReport}
													onChange={()=> this.setState({withReport: !withReport})}
													name="withReport"
													color="primary"
													className="category" />
												}
										label="RT-PCR Report"
									/>
								</Row>
								<Row className="category">
										<Label className="form-control-label" htmlFor="age" style={{width: "100%"}}>Age Group</Label>
										<Input className="Select-category" type="select" name="age" id="age" onChange={(event)=>{
											console.log("selecting age group : ",event.target.value);
											this.setState({
												ageRange:event.target.value
											})
										}}>
											<option value={null}>No restriction</option>
											<option>&lt;18</option>
											<option>18-45</option>
											<option>&gt;45</option>
										</Input>
								</Row>
								<Row className="category">
									<Label className="form-control-label" htmlFor="ctVal" style={{width: "100%"}}>CT value</Label>	
									<Input className="Select-category" type="select" name="ctVal" id="ctVal" onChange={(event)=>{
											console.log("selecting ctValue range : ",event.target.value);
											this.setState({
												ctValRange:event.target.value
											})
									}}>
										<option>&lt;20</option>
										<option>20-36</option>
										<option>&gt;36</option>
									</Input>
								</Row>
								<br />
								<Row className="category">
									{/* <Label className="form-control-label" htmlFor="symptom">Symptoms</Label> */}
									<Select className="Select-category"
										name="symptom"
										id="symptom"
										placeholder="Symptoms"
										isClearable
										isMulti
										closeMenuOnSelect={false}
										components={animatedComponents}
										noOptionsMessage={()=>"Please select Other option"}
										options= {SymOptions}
										onChange={this.handleSymptomsChange}
									/>
								</Row>
								<br />
								<Row className="category">
									{/* <Label className="form-control-label" htmlFor="medicine">Medication</Label> */}
									<Select className="Select-category mr-3" 
										placeholder="Medicines"
										isClearable
										isMulti
										closeMenuOnSelect={false}
										components={animatedComponents}
										noOptionsMessage={()=>"Please select Other option"}
										options= {medOptions}
										onChange={this.handleMedicationChange}
									/>
								</Row>
								<Row>
									<button onClick={this.onFilterApply}>Apply filters</button>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
			</>
		);
	}
}

export default FilterMain;


