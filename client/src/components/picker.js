import React, { Component } from 'react';
import { cruiseData } from '../data.js';
import blocksdk from 'blocksdk';

class Picker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: cruiseData.cruises[0].ship_title,
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		this.sdk.setContent(event.target.value);
	}

	componentWillMount() {
		//I need to set my select element!
		this.sdk = new blocksdk();
		this.options = cruiseData.cruises.map((cruise) => {
			return (
				<option value={cruise.cruise_nid}-{cruise.ship_title} key={cruise.cruise_nid}>{cruise.cruise_nid}-{cruise.ship_title}</option>
			);
		});
	}

	render() {
		return (
			<div>
				<select value={this.state.value} onChange={this.handleChange}>
					{this.options}
				</select>
			</div>
		);
	}
}

export default Picker;