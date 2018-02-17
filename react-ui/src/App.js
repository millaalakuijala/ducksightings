import React, { Component } from 'react'
import SightingList from './SightingList'
import Header from './Header'
import Navigation from './Navigation'
import AddSighting from './AddSighting'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
    }
  }

  changeView = () => {
    this.setState({ adding: !this.state.adding })
  }

  render() {
    if (this.state.adding) {
      return (
        <div>
          <Header />
          <Navigation
            adding={this.state.adding}
            changeView={this.changeView}
          />
          <AddSighting />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <Navigation
          adding={this.state.adding}
          changeView={this.changeView}
        />
        <SightingList />
      </div>
    )
  }
}

export default App
