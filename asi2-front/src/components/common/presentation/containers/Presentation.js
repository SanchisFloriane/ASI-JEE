import React, { Component } from "react";
import './presentation.css';
import SlidList from '../components/SlidList';
import EditMetaPres from '../components/EditMetaPres';

class Presentation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <EditMetaPres/>
        <SlidList/>
      </div>
    );
  }
}


export default Presentation;
