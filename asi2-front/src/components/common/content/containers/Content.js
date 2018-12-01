import React, { Component } from 'react';
import DisplayContent from '../components/DisplayContent';
import DisplayProperties from '../components/DisplayProperties';
import { updateDraggedElt } from '../../../../actions';

import { connect } from 'react-redux';

class Content extends Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
  }

  drag() {
    this.props.dispatch(updateDraggedElt(this.props.id))
  }

  render() {
    let props = this.props;
    return(
      <div>
        {props.onlyContent ? (
          <DisplayContent
            type={props.type}
            src={props.src}
          />
        ) : (
          <div
            draggable="true"
            onDragStart={this.drag}
          >
            <DisplayProperties
              id={props.id}
              title={props.title}
              type={props.type}
              src={props.src}
            />
        </div>
        )}
      </div>
    );
  }
}
export default connect()(Content);
