import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'
import { loadSightings } from './api'
import SpeciesMultiSelect from './SpeciesMultiSelect'
import SortDropdown from './SortDropdown'

class SightingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sightingList: [],
      selectedSpecies: '',
      order: 'newest',
    }
  }

  componentWillMount() {
    this.updateSightingList(this.state.selectedSpecies)
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  setOrder = (order) => {
    this.setState({ order }, () => {
      this.updateSightingList(this.state.selectedSpecies)
    })
  }

  sortByOrder(sightings) {
    if (this.state.order === 'oldest') {
      sightings.sort(function(a, b) {
        return new Date(a.dateTime) - new Date(b.dateTime)
      })
    }
    else if (this.state.order === 'newest'){
      sightings.sort(function(a, b) {
        return new Date(b.dateTime) - new Date(a.dateTime)
      })
    }
  }

  updateSightingList(selectedSpeciesNames) {
    loadSightings()
      .then((sightings) => {
        const selectedSpecies = selectedSpeciesNames.split(',')
        let selectedSightings
        if (selectedSpeciesNames === '') {
          selectedSightings = sightings
        }
        else {
          const filteredSightings = []
          for (let i = 0; i < selectedSpecies.length; i++) {
            const filteredBySpecies = sightings.filter(sighting => sighting.species === selectedSpecies[i])
            filteredSightings.push(...filteredBySpecies)
          }
          selectedSightings = filteredSightings
        }
        this.sortByOrder(selectedSightings)
        this.setState({ sightingList: selectedSightings })
      })
  }

  selectSpecies = (speciesNames) => {
    this.setState({ selectedSpecies: speciesNames }, () => {
        this.updateSightingList(this.state.selectedSpecies)
    })
  }

  render() {
    const sightingsListed = this.state.sightingList.map((sighting) => {
      return (
        <ListGroupItem key={sighting.id}>
          <ListGroupItemHeading>
            {this.capitalize(sighting.species)}, {sighting.count}
          </ListGroupItemHeading>
          {sighting.description}
          <br />
          {new Date(sighting.dateTime).toString().slice(0, 21)}
        </ListGroupItem>
      )
    })
    return (
      <div>
        <div className="list-control">
          <h3>All duck sightings</h3>
          <SpeciesMultiSelect 
            selectSpecies={(speciesName) => this.selectSpecies(speciesName)}
          />
          <SortDropdown
            setOrder={(order) => this.setOrder(order)}
          />
        </div>
        <ListGroup>
          {sightingsListed}
        </ListGroup>
      </div>
    )
  }
}

export default SightingList
