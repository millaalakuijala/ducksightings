import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="navigation">
        <Nav tabs>
          <NavItem>
            <NavLink
              href="#"
              active={!this.props.adding}
              onClick={() => this.props.changeView()}>
              Sightings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              active={this.props.adding}
              onClick={() => this.props.changeView()}>
              Add new sighting
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
