import React, { Component } from 'react';
import mallard from './images/mallard.png'

class Header extends Component {

  render() {
  	return (
	  <header className="header">
	    <h1>Duckwatcher</h1>
	    <img src={mallard} alt="A mallard" />
	  </header>
    )
  }

}

export default Header
