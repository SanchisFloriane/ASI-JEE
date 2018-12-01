import React, { Component } from "react";
import Slid from '../../slid/containers/Slid';

import { connect } from 'react-redux';

class SlidList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="vertical-scroll height-70vh">
        {this.props.presentation.slidArray.map((slid) => {
          return (
            <Slid
              key={slid.id}
              id={slid.id}
              title={slid.title}
              txt={slid.txt}
              content_id={slid.content_id}
              contentMap={this.props.content_map}
              displayMode={"SHORT"}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    content_map: state.updateModelReducer.content_map,
    presentation: state.updateModelReducer.presentation,
  };
}

export default connect(mapStateToProps)(SlidList);
