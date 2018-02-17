import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { loadSpecies } from './api'


class MultiSelectField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			removeSelected: true,
			options: [],
			value: [],
		}
	}

	componentDidMount() {
		const species = []
		loadSpecies()
	  	  .then((speciesNames) => {
	  		speciesNames.forEach((speciesName) => {
	  		species.push({ label: speciesName, value: speciesName })
	  	  })
	    })
		this.setState({ options: species })
    }

	handleSelectChange = (value) => {
		this.setState({ value: value });
		this.props.selectSpecies(value)
	}

	render () {
		return (
			<div className="section">
				<Select
				    autosize={false}
					multi
					onChange={this.handleSelectChange}
					options={this.state.options}
					placeholder="Filter by species"
					simpleValue
					value={this.state.value}
				/>
			</div>
		)
	}
}

export default MultiSelectField
