import React, { Component } from 'react';
import DisplayContent from './DisplayContent';

class DisplayProperties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DisplayContent type={this.props.type} src={this.props.src}/>
        <p>ID:{this.props.id} Title:{this.props.title}</p>
      </div>
    )
  }
}
export default DisplayProperties;
