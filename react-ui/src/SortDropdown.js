import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SortDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle outline caret>
          Sort
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.props.setOrder('newest')}>Newest first</DropdownItem>
          <DropdownItem onClick={() => this.props.setOrder('oldest')}>Oldest first</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default SortDropdown
