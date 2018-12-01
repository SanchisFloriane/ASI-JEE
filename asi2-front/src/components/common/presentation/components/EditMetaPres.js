import React, { Component } from "react";

import { connect } from 'react-redux';

class EditMetaPres extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="form-group height-25vh">
          <label htmlFor="currentSlideTitle">Title </label>
          <input
            type="text"
            className="form-control"
            id="currentSlideTitle"
            onChange={this.props.handleChangeTitle}
            value={this.props.presentation.title}
          />
          <label htmlFor="currentSlideText">Description</label>
          <textarea
            rows="5"
            type="text"
            className="form-control"
            id="currentSlideText"
            onChange={this.props.handleChangeDescription}
            value={this.props.presentation.description}>
          </textarea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    presentation: state.updateModelReducer.presentation
  };
}

export default connect(mapStateToProps)(EditMetaPres);
