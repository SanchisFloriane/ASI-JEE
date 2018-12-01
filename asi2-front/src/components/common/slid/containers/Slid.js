import React, { Component } from "react";
import './slid.css';
import EditMetaSlid from "../components/EditMetaSlid";
import Content from "../../content/containers/Content";

import { connect } from 'react-redux';
import { setSelectedSlid, updatePresentationSlids } from '../../../../actions';

class Slid extends Component {
  constructor(props) {
    super(props);
    this.updateSelectedSlid = this.updateSelectedSlid.bind(this);
    this.updateCurrentSlid = this.updateCurrentSlid.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.textChanged = this.textChanged.bind(this);
    this.drop = this.drop.bind(this);
  }

  updateSelectedSlid() {
    const tmpSlid = {
      id: this.props.id,
      title: this.props.title,
      txt: this.props.txt,
      content_id: this.props.content_id,
    };
    this.props.dispatch(setSelectedSlid(tmpSlid));
  }

  drop(ev) {
    let newContent = this.props.content_map[this.props.draggedSlid];
    const tmpSlid = {
      id: this.props.id,
      title: this.props.title,
      txt: this.props.title,
      content_id: this.props.draggedSlid
    }
    this.updateCurrentSlid(tmpSlid);
  }

  titleChanged(e) {
    const tmpSlid = {
      id: this.props.id,
      title: e.target.value,
      txt: this.props.txt,
      content_id: this.props.content_id,
    }
    this.updateCurrentSlid(tmpSlid);
  }

  textChanged(e) {
    const tmpSlid = {
      id: this.props.id,
      title: this.props.title,
      txt: e.target.value,
      content_id: this.props.content_id,
    }
    this.updateCurrentSlid(tmpSlid);
  }

  updateCurrentSlid(tmpSlid) {
    this.props.dispatch(updatePresentationSlids(tmpSlid));
  }

  render() {
    let content = this.props.content_map[this.props.content_id];
    let displayMode = this.props.displayMode;
    return(
      <div>
        {displayMode === 'FULL_MNG' ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={this.drop}
          >
            <EditMetaSlid
              title={this.props.title}
              txt={this.props.txt}
              content={content}
              handleChangeTitle={this.titleChanged}
              handleChangeTxt={this.textChanged}
            />
            <Content
              type={content.type}
              src={content.src}
              onlyContent={true}
            />
        </div>
        ) : displayMode === 'SHORT' && (
          <div onClick={this.updateSelectedSlid}>
            <h2>{this.props.title}</h2>
            <p>{this.props.txt}</p>
            <Content
              type={content.type}
              src={content.src}
              onlyContent={true}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    content_map: state.updateModelReducer.content_map,
    presentation: state.updateModelReducer.presentation,
    draggedSlid: state.selectedReducer.draggedSlid,
  };
}

export default connect(mapStateToProps)(Slid);
