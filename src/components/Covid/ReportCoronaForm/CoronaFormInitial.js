import { event } from 'jquery';
import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row, FormText, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import './CoronaForm.css';
import CONFIG from '../../Config/Config';
import axios from 'axios';
import SideBar from '../DataFilter/SideBar';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
            formView : false,
            reportWith:'',
            reportingFor: '',
            patientName: '',
            country:'',
            state:'',
            district: '',
            city:'',
            age: '',
            ctVal: '',
            symptom:[],
            otherSym:'',
            //symptomFirst:'',
            medHistory:'',
            medication:[],
            otherMed:'',
            vaccine:'',
            comment:'',
            country:'',
            state:'',
            district:'',
            //city:'',
            currentPage: 1
        };

        this.handleInputChange=this.handleInputChange.bind(this);
        this.displayNameField=this.displayNameField.bind(this);
        this.displayCTval=this.displayCTval.bind(this);
        this.displayOtherSymptoms=this.displayOtherSymptoms.bind(this);
        this.displayOtherMed=this.displayOtherMed.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
    }

    handleInputChange(event){
        var checkedArr = '';
        const classname= event.target.className
        if ((event.target.type!== 'checkbox')) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        else{
            const checkeds = document.getElementsByClassName(classname);
            for (let i = 0; i < checkeds.length; i++) {
                if ((checkeds[i].checked) && (checkeds[i].type==="checkbox")) {
                    // checkedArr.push(checkeds[i].value);
                    checkedArr = checkedArr.concat((checkeds[i].value).concat(','));
                }
            }
            this.setState({
                [event.target.name]: checkedArr
            });
        }
        console.log(event.target.name, event.target.value);
    }

    displayNameField(event){
        if (event.target.value==="relative") document.getElementById("nameRel").style.display= "block";
        else if(event.target.value==="self") document.getElementById("nameRel").style.display= "none";
    }
    displayCTval(event){
        if (event.target.value==="withRTPCR") document.getElementById("displayCT").style.display= "block";
        else if (event.target.value==="withoutRTPCR" || event.target.value==="eyewitness") document.getElementById("displayCT").style.display="none";
    }
    displayOtherSymptoms(){
        if (document.getElementById("displayOtherSymptoms").style.display==="block") document.getElementById("displayOtherSymptoms").style.display= "none";
        else document.getElementById("displayOtherSymptoms").style.display="block";
    }
    displayOtherMed(){
        if (document.getElementById("displayOtherMed").style.display==="block") document.getElementById("displayOtherMed").style.display= "none";
        else document.getElementById("displayOtherMed").style.display="block";
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
			authAxios.post('/add_covid_report', this.state, config)
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
                            district: '',
                            city:'',
                            age: '',
                            ctVal: '',
                            symptom:[],
                            otherSym:'',
                            symptomFirst:'',
                            medHistory:'',
                            medication:[],
                            otherMed:'',
                            vaccine:'',
                            comment:'',
                            country:'',
                            state:'',
                            district:'',
                            city:'',
                            currentPage: 1
                        });
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
        currentPage = currentPage >= 2? 3: currentPage + 1
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
        if(currentPage <3){
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

    render(){
        return(
            <div className="container">
                <Button onClick={this.onButtonPress}>Reporting Corona</Button>
                <Modal isOpen={this.state.formView} className="form">
                    <ModalHeader toggle={this.onButtonPress}>
                        Report Your Story                    
                    </ModalHeader>
                    <Form onSubmit={(values) => this.handleSubmit(values)} noValidate>
                    <ModalBody>
                        <Page1
                            currentPage={this.state.currentPage}
                            state={this.state}
                            handleInputChange={this.handleInputChange}
                            displayNameField={this.displayNameField}
                            displayCTval={this.displayCTval} 
                        />
                        <Page2
                                currentPage={this.state.currentPage}
                                state={this.state}
                                handleInputChange={this.handleInputChange}
                        />
                        <Page3
                            currentPage={this.state.currentPage}
                            state={this.state}
                            handleInputChange={this.handleInputChange}
                            displayOtherSymptoms={this.displayOtherSymptoms}
                            displayOtherMed={this.displayOtherMed}
                        />
                        </ModalBody>
                        <ModalFooter>
                            {this.previousButton()}
                            {this.state.currentPage===3 ?
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
    if (props.currentPage!==1) return null;
    console.log(props.state);
    return (
        <div>
            {/* Reporting for */}
            <Row className="Coronaform"  onChange={props.displayNameField}>
                <Label className="form-control-label" htmlFor="reportingFor" md={4}>Reporting For</Label>
                <Col md={8}  onChange={props.handleInputChange}>
                    <Label className="reportingFor-label" check>
                        <Input type="radio" id="self" name="reportingFor" value="self" />Self
                    </Label>
                    <Label className="reportingFor-label" check>
                        <Input type="radio" id="relative" name="reportingFor" value="relative" />Relative
                    </Label>
                    <div id="nameRel">
                        <Row>
                            <Col md={6}>
                                <Input type="text" id="patientName" name="patientName" placeholder="Name of patient"
                                value={props.state.patientName} />
                            </Col>
                            <Col md={{size:3, offset:1}}>
                                <Input type="number" id="age" name="age" 
                                    placeholder="Age" 
                                    value={props.state.age}
                                />
                            </Col>
                        </Row>                         
                    </div>   
                </Col>
            </Row>
            
            {/* Report With */}
            <Row className="Coronaform" onChange={props.displayCTval}>
                <Label className="form-control-label" htmlFor="reportWith" md={4}>Report</Label>
                <Col md={8}  onChange={props.handleInputChange}>
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="withReport" name="reportWith" value="withRTPCR"/>With RT-PCR report
                    </Label>
                    <div id="displayCT">
                        <Row>
                            <Label className="form-control-label" htmlFor="ctVal" md={3}>CT Value</Label>
                            <Col md={4}>
                                <Input type="number" id="ctVal" name="ctVal" 
                                    placeholder="CT Value" 
                                    value={props.state.ctVal}
                                />
                            </Col>
                        </Row>
                    </div>
                    
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="withoutReport" name="reportWith" value="withoutRTPCR" />Without RT-PCR report
                    </Label>
                    <Label className="reportWith-label" check>
                        <Input type="radio" id="eyewitness" name="reportWith" value="eyewitness" />As Eyewitness
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
            <SideBar />
            {/* Country, state, district */}
            {/* <Row className="Coronaform">
                <Label className="country" md={4}>Country</Label>
                <Col md={8}>
                    <Input type="text" name="country" id="country" 
                        value={props.state.country} onChange={props.handleInputChange}/>
                </Col>
            </Row>
            <Row className="Coronaform">
                <Label className="state" md={4}>State</Label>
                <Col md={8}>
                    <Input type="text" name="state" id="state" 
                        value={props.state.state} onChange={props.handleInputChange}/>
                </Col>
            </Row>
            <Row className="Coronaform">
                <Label className="district" md={4}>District</Label>
                <Col md={8}>
                    <Input type="text" name="district" id="district" 
                        value={props.state.district} onChange={props.handleInputChange}/>
                </Col>
            </Row> */}
        </div>
    );
}

function Page3(props){
    const SymOptions = [
        { value: 'soreThroat', label: 'Sore Throat' },
        { value: 'fever', label: 'Fever' },
        { value: 'nausea', label: 'Nausea' },
        { value: 'cough', label: 'Cough' },
        { value: 'breathlessness', label: 'Breathlessness' },
        { value: 'lossOfTaste', label: 'Loss of Taste' },
        { value: 'dizziness', label: 'Dizziness' },
        { value: 'vomiting', label: 'Vomiting' },
        { value: 'bodyAche', label: 'Body Ache' },
        { value: 'fatigue', label: 'fatigue' },
        { value: 'other', label: 'Other' }
    ];
    const animatedComponents = makeAnimated();
    if (props.currentPage!==3) return null;
    return(
        <div>
            {/* Symptom */}
            <Row className="Coronaform" >
                <Label className="form-control-label" htmlFor="symptom" md={4}>Symptoms while positive</Label>
                <Select className="Select mr-3" 
                    placeholder="Select the Symptoms"
                    isClearable
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    noOptionsMessage={()=>"Please select Other option"}
                    options= {SymOptions}
                />
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="soreThroat" name="symptom" value="soreThroat" className="symptom" /> Sore Throat
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="fever" name="symptom" value="fever" className="symptom" /> Fever
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="nausea" name="symptom" value="nausea" className="symptom" /> Nausea
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="cough" name="symptom" value="cough" className="symptom" /> Cough
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="breathlessness" name="symptom" value="breathlessness" className="symptom" /> Breathlessness
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="lossOfTaste" name="symptom" value="lossOfTaste" className="symptom" /> Loss of Taste
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="dizziness" name="symptom" value="dizziness" className="symptom" /> Dizziness
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="vomiting" name="symptom" value="vomiting" className="symptom" /> Vomiting
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="bodyAche" name="symptom" value="bodyAche" className="symptom" /> Body Ache
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="fatigue" name="symptom" value="fatigue" className="symptom" /> Fatigue
                    </Label>
                    <Label className="symptom-label" check>
                        <Input type="checkbox" id="otherSymptoms" name="symptom" className="symptom" value={props.state.otherSym} onChange={props.displayOtherSymptoms} /> Others
                    </Label>  
                </Col>
                <div id="displayOtherSymptoms" className="offset-md-4">
                    <Input type="text" id="otherSym" name="otherSym" placeholder="Please Specify" value={props.state.otherSym} onChange={props.handleInputChange} />
                </div>
            </Row>
            
            {/* Symptom facing for first time */}
            {/*}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="symptomFirst" md={4}>Symptom facing for first time</Label>
                <Col md={8}>
                    <Input type="text" id="symptomFirst" name="symptomFirst" 
                        placeholder="Symptom you are facing for first time" 
                        value={props.state.symptomFirst} onChange={props.handleInputChange}
                    />
                </Col> 
            </Row>
            */}
            
            {/* Ongoing Medical History */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="medHistory" md={4}>Any Ongoing Medical History</Label>
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="medH-label" check>
                        <Input type="radio" id="medHistoryYes" name="medHistory" value="yes" />Yes
                    </Label>
                    <Label className="medH-label" check>
                        <Input type="radio" id="medHistoryNo" name="medHistory" value="no" />No
                    </Label>
                    <FormText>Will be counted as comorbidity</FormText>
                </Col> 
            </Row>
            
            {/* Medication */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="medication" md={4}>Medication</Label>
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="paracetamol" name="medication" value="paracetamol" className="medication"/>Paracetamol
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="azithromycin" name="medication" value="azithromycin" className="medication" />Azithromycin
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="ceftum" name="medication" value="ceftum" className="medication" />Ceftum
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="coronil" name="medication" value="coronil" className="medication" />Coronil
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="ayurcoro3" name="medication" value="ayurcoro3" className="medication" />Ayurcoro3
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="ivermactin" name="medication" value="ivermactin" className="medication" />Ivermactin
                    </Label>
                    <Label className="med-label" check>
                        <Input type="checkbox" id="otherMedication" name="medication" className="medication" value={props.state.otherMed} onChange={props.displayOtherMed} />Other
                    </Label>
                </Col> 
                <div id="displayOtherMed" className="offset-md-4">
                    <Input type="text" id="otherMed" name="otherMed" placeholder="Please Specify" value={props.state.otherMed} onChange={props.handleInputChange} />
                </div>
            </Row>
            
            {/* Vaccine */}
            <Row className="Coronaform" required>
                <Label className="form-control-label" htmlFor="vaccine" md={4}>Vaccinated</Label>
                <Col md={8} className="grid-container" onChange={props.handleInputChange}>
                    <Label className="vac-label" check>
                        <Input type="radio" id="vaccineYes" name="vaccine" value="yes" />Yes
                    </Label>
                    <Label className="vac-label" check>
                        <Input type="radio" id="vaccineNo" name="vaccine" value="no" />No
                    </Label>
                </Col> 
            </Row>
            
            {/* Your Story/ Comment */}
            <Row className="Coronaform">
                <Label className="form-control-label" htmlFor="comment" md={4}>Your Story</Label>
                <Col md={8}>
                    <Input type="textarea" id="comment" name="comment" 
                        placeholder="Leave your comments here"
                        value={props.state.comment} onChange={props.handleInputChange} />
                </Col>
            </Row>
        </div>
    );
}

export default CoronaForm;