import { event } from 'jquery';
import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row, FormText, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import '../css/CoronaForm.css';
import CONFIG from '../../Config/Config';
import axios from 'axios';
import SideBar from './DataFilter/SideBar';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Constants from  './Contants';



const token = localStorage.usertoken;

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// // validate form errors being empty
	// Object.values(formErrors).forEach((val) => {
	// 	val.length > 0 && (valid = false);
	// });

	// // validate the form was filled out
	// Object.values(rest).forEach((val) => {
	// 	val === null && (valid = false);
	// });

	return valid;
};

class CoronaForm extends Component{
    constructor(props){
        super(props);

        this.state={
            formView : true,
            reportWith:'',
            reportingFor: '',
            patientName: '',
            country:'',
            state:'',
            city:'',
            age: '',
            ctVal: '',
            symptom:'',
            symptomList:[],
            medHistory:'',
            medication:'',
            medicationList:[],
            vaccine:'',
            comment:'',
            heading:'',
            mediaName:'No File Chosen',
            media:null,
            currentPage: 1
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSymptomsChange=this.handleSymptomsChange.bind(this);
        this.handleMedicationChange=this.handleMedicationChange.bind(this);
        //
        this.handleCountryOption=this.handleCountryOption.bind(this);
		this.handleStateOption=this.handleStateOption.bind(this);
		this.handleCityOption=this.handleCityOption.bind(this);
        //
        this.handleSubmit=this.handleSubmit.bind(this);
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);

        this.onToggleForm=this.onToggleForm.bind(this);
    }

    handleInputChange(event){
        var checkedArr = '';
        const classname= event.target.className
        if(event.target.name=="media") {
            var img= new Image();
            img.src = URL.createObjectURL(event.target.files[0]);
            this.setState({
                mediaName: event.target.files[0].name,
                media: img.src
              })
        }
        else if ((event.target.type!== 'checkbox')) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        else{
            const checked = document.getElementsByClassName(classname);
            for (let i = 0; i < checked.length; i++) {
                if ((checked[i].checked) && (checked[i].type==="checkbox")) {
                    // checkedArr.push(checked[i].value);
                    checkedArr = checkedArr.concat((checked[i].value).concat(','));
                }
            }
            console.log(classname, checkedArr);
            this.setState({
                [event.target.name]: checkedArr
            });
        }
        console.log(event.target.name, event.target.value);
    }
    handleSymptomsChange(event){
        var values=[];
        var value='';
        for (var i = 0, l = event.length; i < l; i++) {
            values.push(event[i].value)
            value=value.concat((event[i].value).concat(','));
        }
        this.setState({ 
            symptom:  value,
            symptomList: values
        });
    }
    handleMedicationChange(event){
        var values=[];
        var value='';
        for (var i = 0, l = event.length; i < l; i++) {
            values.push(event[i].value)
            value=value.concat((event[i].value).concat(','));
        }
        this.setState({ 
            medication:  value,
            medicationList: values
        });
    }

    handleCountryOption(value){
		this.setState({
			country:value,
			state:null,
			city:null
		});
	}
	handleStateOption(value){
		this.setState({
			state:value,
			city:null
		});
	}
	handleCityOption(value){
		this.setState({
			city:value
		});
	}

    handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		if (formValid(this.state)) {
			const authAxios = axios.create({
				baseURL: CONFIG.server + '/users_covid',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
            console.log(this.state);
			const config = {
				headers: {
					// 'content-type': 'multipart/form-data',
                    'content-type': 'application/json',
				}
			};
            console.log("state data : ",this.state);
			authAxios.post('/add_covid_report', [{
                formView : this.state.formView,
                reportWith: this.state.reportWith,
                reportingFor: this.state.reportingFor,
                patientName: this.state.patientName,
                country: this.state.country,
                state: this.state.state,
                city: this.state.city,
                age: this.state.age,
                ctVal: this.state.ctVal,
                symptom: this.state.symptom,
                medHistory: this.state.medHistory,
                medication: this.state.medication,
                vaccine: this.state.vaccine,
                comment: this.state.comment,
                heading: this.state.heading,
                mediaName: this.state.mediaName,
                media: this.state.media,
                currentPage: this.state.currentPage
            }], config)
				.then((res) => {
					console.log(res);
                    if(parseInt(res.data.status) == 200){
                        alert("Report submitted successfully");
                        this.setState({
                            reportWith:'',
                            reportingFor: '',
                            patientName: '',
                            country:'',
                            state:'',
                            city:'',
                            age: '',
                            ctVal: '',
                            symptom:'',
                            symptomList:[],
                            otherSym:'',
                            symptomFirst:'',
                            medHistory:'',
                            medication:'',
                            medicationList:[],
                            otherMed:'',
                            vaccine:'',
                            comment:'',
                            heading:'',
                            mediaName:'No File Chosen',
                            media:'',
                        });
                        this.props.toggleForm();
                    }
					// window.location.replace('https://frontend-69.appspot.com/yourReport');
				})
				.catch((err) => {
					alert("server error 500, while submitting report");
					console.log(err);
				});
		} else {
			console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
		}
	};

    onButtonPress = (e) => {
        e.preventDefault();
        if(this.state.formView){
            this.setState({formView : false});
        }else{
            this.setState({formView : true});
        }
        // this.setState({formView : true});
        console.log(this.state.formView);
    }

    next(e){
        e.preventDefault();
        let currentPage = this.state.currentPage
        currentPage = currentPage >= 3? 4: currentPage + 1
        this.setState({
          currentPage: currentPage
        })
    };
    prev(e){
        e.preventDefault();
        let currentPage = this.state.currentPage
        currentPage = currentPage <= 1? 1: currentPage - 1
        this.setState({
          currentPage: currentPage
        })
    };
    previousButton() {
        let currentPage = this.state.currentPage;
        if(currentPage !==1){
          return (
            <button 
              className="btn btn-secondary" 
              type="button" onClick={this.prev}>
                Previous Page
            </button>
          )
        }
        return null;
    };      
    nextButton(){
        let currentPage = this.state.currentPage;
        if(currentPage <4){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" onClick={this.next}>
                Next Page
            </button>        
          )
        }
        return null;
    };

    onToggleForm(){
        this.props.toggleForm();
        this.setState({
            formView : true,
            reportWith:'',
            reportingFor: '',
            patientName: '',
            country:'',
            state:'',
            city:'',
            age: '',
            ctVal: '',
            symptom:'',
            symptomList:[],
            otherSym:'',
            //symptomFirst:'',
            medHistory:'',
            medication:'',
            medicationList:[],
            otherMed:'',
            vaccine:'',
            comment:'',
            heading:'',
            mediaName:'No File Chosen',
            media:null,
            currentPage: 1
        })
    }

    render(){
        return(
            <div className="container">
                <Modal isOpen={this.props.isFormOpen} className="form">
                    <ModalHeader toggle={this.onToggleForm}>
                        Report Your Story
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit} noValidate>
                        <ModalBody>
                            <Page1
                                currentPage={this.state.currentPage}
                                state={this.state}
                                handleInputChange={this.handleInputChange}
                            />
                            <Page2
                                currentPage={this.state.currentPage}
                                state={this.state}
                                handleCountryOption={this.handleCountryOption}
                                handleStateOption={this.handleStateOption}
                                handleCityOption={this.handleCityOption}
                            />
                            <Page3
                                currentPage={this.state.currentPage}
                                state={this.state}
                                handleInputChange={this.handleInputChange}
                                handleSymptomsChange={this.handleSymptomsChange}
                                handleMedicationChange={this.handleMedicationChange}
                            />
                            <Page4 
                                currentPage={this.state.currentPage}
                                state={this.state}
                                handleInputChange={this.handleInputChange}
                            />
                        </ModalBody>
                        <ModalFooter>
                            {this.previousButton()}
                            {this.state.currentPage===4 ?
                                <button className="btn btn-primary float-right" type="submit">Submit</button>
                            : this.nextButton() }
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

function Page1(props){ 
    var displayRel="none";
    var displayCT="none";
    if (props.state.reportingFor=="relative") displayRel="block";
    if (props.state.reportWith=="withRTPCR") displayCT="block";
    if (props.currentPage!==1) return null;
    console.log(props.state);
    return (
        <div>
            {/* Reporting for */}
            <Row className="Coronaform" >
                <Label className="form-control-label" htmlFor="reportingFor" md={4}>Reporting For</Label>
                <Col md={8}  onChange={props.handleInputChange}>
                    <Label className="reportingFor-label" check>
                        <Input type="radio" id="self" name="reportingFor" value="self" checked={props.state.reportingFor=="self"}/>Self
                    </Label>
                    <Label className="reportingFor-label" check>
                        <Input type="radio" id="relative" name="reportingFor" value="relative" checked={props.state.reportingFor=="relative"} />Relative
                    </Label>
                    {displayRel=="block" ? 
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Input type="text" id="patientName" name="patientName" placeholder="Patient's Name"
                                    value={props.state.patientName} />
                                </Col>
                                <Col md={4}>
                                    <Input type="number" id="age" name="age" 
                                        placeholder="Age" 
                                        value={props.state.age}
                                    />
                                </Col>
                            </Row>
                        </div>
                    : <div></div>}
                </Col>
            </Row>
            
            {/* Report With */}
            <Row className="Coronaform" >
                <Label className="form-control-label" htmlFor="reportWith" md={4}>Report</Label>
                <Col md={8}  onChange={props.handleInputChange}>
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="withReport" name="reportWith" value="withRTPCR" checked={props.state.reportWith=="withRTPCR"}/>With RT-PCR report
                    </Label>
                    {displayCT=="block"?
                        <div id="displayCT">
                            <Row>
                                <Label className="form-control-label" htmlFor="ctVal" md={3}>CT Value</Label>
                                <Col md={6}>
                                    <Input type="number" id="ctVal" name="ctVal" 
                                        placeholder="CT Value" 
                                        value={props.state.ctVal}
                                    />
                                </Col>
                            </Row>
                        </div>
                    :<div></div>}                    
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="withoutReport" name="reportWith" value="withoutRTPCR" checked={props.state.reportWith=="withoutRTPCR"}/>Without RT-PCR report
                    </Label>
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="eyewitness" name="reportWith" value="eyewitness" checked={props.state.reportWith=="eyewitness"}/>As Eyewitness
                    </Label>
                </Col>
            </Row>
        </div>    
    );
}

function Page2(props){
    if (props.currentPage!==2) return null;
    return(
        <div>
            {/* <SideBar show_names={true} /> */}
            <SideBar show_names={true} 
                handleCountryOption={props.handleCountryOption}
                handleStateOption={props.handleStateOption}
                handleCityOption={props.handleCityOption}
            />
        </div>
    );
}

function Page3(props){
    const SymOptions = Constants.SymOptions;
    const medOptions = Constants.medOptions;
    const animatedComponents = makeAnimated();
    if (props.currentPage!==3) return null;
    return(
        <div>
            {/* Symptom */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="symptom" md={4}>Symptoms while positive</Label>
                <Select className="Select mr-3" 
                    name="sym"
                    placeholder="Select the Symptoms"
                    isClearable
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    noOptionsMessage={()=>"Please select Other option"}
                    options= {SymOptions}
                    value={SymOptions.filter(obj => props.state.symptomList.includes(obj.value))}
                    onChange={props.handleSymptomsChange}
                />
            </Row>
            
            {/* Medication */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="medication" md={4}>Medication</Label>
                <Select className="Select mr-3" 
                    placeholder="Select Medicines taken"
                    isClearable
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    noOptionsMessage={()=>"Please select Other option"}
                    options= {medOptions}
                    value={medOptions.filter(obj => props.state.medicationList.includes(obj.value))}
                    onChange={props.handleMedicationChange}
                />
            </Row>
            
            {/* Ongoing Medical History */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="medHistory" md={4}>Any Ongoing Medical History</Label>
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="medH-label" check>
                        <Input type="radio" id="medHistoryYes" name="medHistory" value="yes" checked={props.state.medHistory=="yes"}/>Yes
                    </Label>
                    <Label className="medH-label" check>
                        <Input type="radio" id="medHistoryNo" name="medHistory" value="no" checked={props.state.medHistory=="no"}/>No
                    </Label>
                    <FormText>Will be counted as comorbidity</FormText>
                </Col> 
            </Row>
            
            {/* Vaccine */}
            <Row className="Coronaform" required>
                <Label className="form-control-label" htmlFor="vaccine" md={4}>Vaccinated</Label>
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="vac-label" check>
                        <Input type="radio" id="vaccineYes" name="vaccine" value="yes" checked={props.state.vaccine=="yes"}/>Yes
                    </Label>
                    <Label className="vac-label" check>
                        <Input type="radio" id="vaccineNo" name="vaccine" value="no" checked={props.state.vaccine=="no"}/>No
                    </Label>
                </Col> 
            </Row>
            
        </div>
    );
}

function Page4(props){
    if (props.currentPage!==4) return null;
    return(
        <div>
            {/* Your Story/ Comment */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="comment" md={4}>Your Story</Label>
                <Col md={8}>
                    <Input type="textarea" id="comment" name="comment" rows="6"
                        placeholder="Leave your comments here"
                        value={props.state.comment} onChange={props.handleInputChange} 
                    />
                </Col>
            </Row>
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="heading" md={4}>Title</Label>  
                <Col md={8}>
                    <Input type="text" id="heading" name="heading"
                        placeholder="Title of your story"
                        value={props.state.heading} onChange={props.handleInputChange} 
                    />
                </Col>
            </Row>
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="media" md={4}>Upload Image</Label>  
                <Col md={8}>
                    <Input type="file" id="media" name="media"
                        accept="image/*"
                        onChange={props.handleInputChange}
                    />{props.state.mediaName}
                </Col>
            </Row>
        </div>
    );
}

export default CoronaForm;