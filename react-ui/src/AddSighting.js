import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { addSighting, loadSpecies } from './api'

export default class AddSighting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      species: '',
      description: '',
      dateTime: new Date(),
      count: 0,
      speciesMessage: '',
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onDateChange = (e) => {
    const newDateTime = this.state.dateTime
    const dateParts = e.target.value.split('-')
    newDateTime.setFullYear(dateParts[0], (dateParts[1]-1), dateParts[2])
    this.setState({ dateTime: newDateTime })
  }

  onTimeChange = (e) => {
    const newDateTime = this.state.dateTime
    const timeParts = e.target.value.split(':')
    newDateTime.setHours(timeParts[0])
    newDateTime.setMinutes(timeParts[1])
    this.setState({ dateTime: newDateTime })
  }

  sendSighting = async (species, description, dateTime, count) => {
    loadSpecies()
      .then((speciesNames) => {
        if (speciesNames.includes(species.toLowerCase()) && count > 0) {
          addSighting(species.toLowerCase(), description, dateTime, count)
          this.setState({ speciesMessage: "Sighting saved." })
        }
        else {
          this.setState({ speciesMessage: "Invalid species or count. Try again." })
        }
      })
  }

  render() {
    const { species, description, dateTime, count} = this.state
    return (
      <Form className="form">
        <FormGroup>
          <Label for="speciesInput">Which duck species did you see?</Label>
          <Input type="text" name="species" id="speciesInput" value={species} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="countInput">How many ducks did you see?</Label>
          <Input type="number" name="count" id="count" value={count} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="descriptionInput">Describe the ducks:</Label>
          <Input type="textarea" name="description" id="descriptionInput" value={description} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="dateInput">Date</Label>
          <Input type="date" name="date" id="dateInput" onChange={this.onDateChange} />
        </FormGroup>
        <FormGroup>
          <Label for="timeInput">Time</Label>
          <Input type="time" name="time" id="timeInput" onChange={this.onTimeChange} />
        </FormGroup>
        <FormGroup>
        <Button outline onClick={() => this.sendSighting(species, description, dateTime, count)}>Add sighting</Button>
        <FormText>{this.state.speciesMessage}</FormText>
        </FormGroup>
      </Form>
    );
  }
}
