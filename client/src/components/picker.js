import React, { Component } from 'react';
import { cruiseData } from '../data.js';
import blocksdk from 'blocksdk';
import styles from './picker.css';

class Picker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: cruiseData.cruises[0].cruise_nid,
			sailValue: null,
			selected: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSailChange = this.handleSailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSailSubmit = this.handleSailSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSailChange(event) {
		this.setState({sailValue: event.target.value});
	}

	handleSubmit(event) {
		this.cruiseContent = null;
		for (let i in cruiseData.cruises) {
			if (cruiseData.cruises[i].cruise_nid == this.state.value) {
				this.cruiseContent = cruiseData.cruises[i];
			}
		}
    	event.preventDefault();
    	this.getSailings();
    	this.setState({selected: true});
  	}

  	handleSailSubmit(event) {
  		console.log(this.state.sailValue);
  		event.preventDefault();
  		this.setSdkData();
  	}

  	setSdkData() {
  		let content = '';
  		for (let i in cruiseData.cruises) {
			if (cruiseData.cruises[i].cruise_nid == this.state.value) {
				let selectedCruise = cruiseData.cruises[i];
				content += '<h1>Your selected cruise from ' + selectedCruise.companyTitle + '</h1>'
			}
		}
		this.sdk.setContent(content);
  	}

  	getSailings() {
  		console.log(this.cruiseContent);
  		this.setState({sailValue: this.cruiseContent.sails[0].sail_nid})
  		this.sailings = this.cruiseContent.sails.map((sail) => {
			return (
				<option value={sail.sail_nid} key={sail.sail_nid}>{sail.sail_nid}</option>
			);
		});

  	}

	componentWillMount() {
		//I need to set my select element!
		this.sdk = new blocksdk();
		this.options = cruiseData.cruises.map((cruise) => {
			return (
				<option value={cruise.cruise_nid} key={cruise.cruise_nid}>{cruise.cruise_nid}-{cruise.ship_title}</option>
			);
		});
	}

	render() {
		let display = '';
		if (this.state.selected) {
			display = 
			<div className = 'padding'>
				<h2>Select a sailing</h2>
				<form onSubmit={this.handleSailSubmit}>
					<select value={this.state.sailValue} onChange={this.handleSailChange}>
							{this.sailings}
					</select>
					<div>
						<input type="submit" value="Submit"/>
					</div>
				</form>
			</div>;
		}
		else {
			display = <div className='padding'>
				<h2>Select a cruise ship</h2>
				<form  onSubmit={this.handleSubmit}>
					<select value={this.state.value} onChange={this.handleChange}>
						{this.options}
					</select>
					<div>
						<input type="submit" value="Submit"/>
					</div>
				</form>
			</div>;
		}
		return (
			<div>
				{display}
			</div>
		);
	}
}

export default Picker;