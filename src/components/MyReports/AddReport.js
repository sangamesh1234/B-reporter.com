import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
//import jwt_decode from 'jwt-decode';
import { IconContext } from 'react-icons';
import { AiOutlineFileAdd } from 'react-icons/ai';

import './AddReports.css';
import CONFIG from '../Config/Config';

const token = localStorage.usertoken;

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		val === null && (valid = false);
	});

	return valid;
};

class AddReport extends Component {
	constructor(props) {
		super(props);
		this.fileChange = this.fileChange.bind(this);
		this.state = {
			//Title: null,
			//Username:token !== '' ? jwt_decode(token).name : 'Anonomous User',
			//Category: null,
			file: '',
			latitude: null,
			longitude: null,
			country: 'india',
			state: 'delhi',
			city: 'delhi',
			description: null,
			category: null,
			AddClicked: false,
			formErrors: {
				file: '',
				latitude: '',
				longitude: '',
				country: '',
				state: '',
				city: '',
				description: '',
				category: '',
			},
		};
	}
	getLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.state);
		if (formValid(this.state)) {
			const authAxios = axios.create({
				baseURL: CONFIG.server + '/users',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const formData = new FormData();
			formData.append('file', this.state.file);
			formData.append('latitude', this.state.latitude);
			formData.append('longitude', this.state.longitude);
			formData.append('country', this.state.country);
			formData.append('state', this.state.state);
			formData.append('city', this.state.city);
			formData.append('description', this.state.description);
			formData.append('block', this.state.category);
			console.log(formData);
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			authAxios
				.post('/addreport', formData, config)
				.then((res) => {
					console.log(res);
					alert(res.data.status);
					window.location.replace('https://frontend-69.appspot.com/yourReport');
				})
				.catch((err) => {
					alert("error: 'Report can't be added!'");
					console.log(err);
				});
		} else {
			console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
		}
	};
	fileChange = (e) => {
		this.setState({ file: e.target.files[0] });
	};
	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			// case 'Title':
			// 	formErrors.Title = value.length < 3 ? 'minimum 5 characaters required' : '';
			// 	break;
			// case 'Category':
			// 	formErrors.Category = value.length < 3 ? 'minimum 5 characaters required' : '';
			// 	break;
			case 'file':
				formErrors.file = value.length === 0 ? 'Field Cannot be Empty' : '';
				break;
			// case 'latitude':
			// 	formErrors.latitude = value.length === 0 ? 'Field Cannot be Empty' : '';
			// 	break;
			// case 'longitude':
			// 	formErrors.longitude = value.length === 0 ? 'Field Cannot be Empty' : '';
			// 	break;
			// case 'country':
			// 	formErrors.country = value.length === 0 ? 'Field Cannot be Empty' : '';
			// 	break;
			// case 'state':
			// 	formErrors.state = value.length === 0 ? 'Field Cannot be Empty' : '';
			// 	break;
			// case 'city':
			// 	formErrors.city = value.length === 0 ? 'Field Cannot be Empty' : '';
			// 	break;
			case 'description':
				formErrors.description = value.length === 0 ? 'Field Cannot be Empty' : '';
				break;
			case 'category':
				formErrors.category = value.length === 0 ? 'Field Cannot be Empty' : '';
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	AddReportForm = () => {
		const { formErrors, AddClicked } = this.state;
		this.getLocation();
		return (
			<div className="AddReportForm">
				<div className="form-wrapper">
					<h2>REPORT AN INCIDENT</h2>
					<hr />
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="description">
							<label htmlFor="description">Report Details</label>
							<textarea
								className={formErrors.description.length > 0 ? 'error' : 'TextArea'}
								placeholder="Report Details"
								type="text"
								name="description"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.description.length > 0 && (
								<span className="errorMessage">{formErrors.description}</span>
							)}
						</div>
						<div className="category">
							<label htmlFor="category"> Report Category</label>
							<input
								className={formErrors.category.length > 0 ? 'error' : null}
								placeholder="Category"
								type="text"
								name="category"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.category.length > 0 && <span className="errorMessage">{formErrors.category}</span>}
						</div>
						<div className="file">
							<label htmlFor="file">Media for Report</label>
							<input
								className={formErrors.file.length > 0 ? 'error' : 'MediaInput'}
								placeholder="Media"
								type="file"
								name="file"
								id="myfile"
								noValidate
								onChange={this.fileChange}
							/>
							{formErrors.file.length > 0 && <span className="errorMessage">{formErrors.file}</span>}
						</div>

						<div className="createAccount">
							<button type="submit">Add</button>
							<small onClick={() => this.setState({ AddClicked: !AddClicked })}>Cancel</small>
						</div>
					</form>
				</div>
			</div>
		);
	};

	AddReport = () => {
		const { Username, AddClicked } = this.state;
		return (
			<div className="wrapper2">
				<div className="form-wrapper2">
					<h2>{Username}</h2>
					<h2>You have Not Reported any Incident Yet!!!</h2>
					<div className="Buttonbody">
						<button className="AddButton" onClick={() => this.setState({ AddClicked: !AddClicked })}>
							<IconContext.Provider value={{ className: 'AddIcon' }}>
								<AiOutlineFileAdd />
							</IconContext.Provider>
							Add Report
						</button>
					</div>
				</div>
			</div>
		);
	};

	render() {
		const { AddClicked } = this.state;
		return <>{AddClicked ? this.AddReportForm() : this.AddReport()}</>;
	}
}

export default AddReport;
