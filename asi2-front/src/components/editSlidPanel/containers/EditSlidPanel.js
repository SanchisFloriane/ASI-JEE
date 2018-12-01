import React, { Component } from 'react';
import Slid from '../../common/slid/containers/Slid';

import { connect } from 'react-redux';

class EditSlidPanel extends Component {
  constructor(props) {
    super(props);
  }

  findArrayElementById(array, id) {
    return array.find((element) => {
      return element.id === id;
    })
  }

  render() {
    let selected_slid = this.findArrayElementById(this.props.presentation.slidArray, this.props.selected_slid.id);
    if (selected_slid) {
      return (
        <div>
          <Slid
            id={selected_slid.id}
            title={selected_slid.title}
            txt={selected_slid.txt}
            content_id={selected_slid.content_id}
            contentMap={this.props.content_map}
            handleChangeTitle={this.updateCurrentSlid}
            handleChangeTxt={this.updateCurrentSlid}
            displayMode={"FULL_MNG"}
          />
        </div>
      );
    }
    else {
      return (
        <div/>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected_slid: state.selectedReducer.slid,
    content_map: state.updateModelReducer.content_map,
    presentation: state.updateModelReducer.presentation,
  };
}

export default connect(mapStateToProps)(EditSlidPanel);
