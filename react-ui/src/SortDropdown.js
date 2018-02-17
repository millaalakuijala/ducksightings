import React from 'react';
import Select from 'react-select';

  const options = [
    { label: "Newest first", value: "newest" },
    { label: "Oldest first", value: "oldest" },
  ]

class SortDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: "newest",
    }
  }

  handleSelectChange = (value) => {
    this.setState({ selectedOrder: value.value}, () => {
      this.props.setOrder(this.state.selectedOrder)
    })

  }

  render () {
    return (
      <div className="section">
        <Select
          autosize={false}
          onChange={this.handleSelectChange}
          options={options}
          value={this.state.selectedOrder}
        />
      </div>
    )
  }
}

export default SortDropdown
