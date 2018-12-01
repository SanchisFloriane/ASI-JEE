import React, { Component } from 'react';
import './browseContentPanel.css';
import Content from '../../common/content/containers/Content';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddContentPanel from '../components/AddContentPanel';

import { connect } from 'react-redux';

class BrowseContentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened:false
    };
    this.changeDialogState = this.changeDialogState.bind(this);
  }

  changeDialogState() {
    this.setState({isDialogOpened: !this.state.isDialogOpened});
  }

  render() {
    let contentMap = this.props.content_map;
    return(
      <div>
        <div className="height-100">
          <div className="height-20vh"/>
          <div className="height-80vh vertical-scroll">
            {Object.keys(contentMap).map((index) => {
              let content = contentMap[index];
              return (
                <Content
                  key={content.id}
                  id={content.id} 
                  type={content.type}
                  title={content.title}
                  src={content.src}
                  onlyContent={false}
                />
              );
            })}
          </div>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className="add-button"
            onClick={this.changeDialogState}
          >
            <AddIcon/>
          </Button>
          <AddContentPanel
            open={this.state.isDialogOpened}
            onClose={this.changeDialogState}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    content_map: state.updateModelReducer.content_map
  };
}

export default connect(mapStateToProps)(BrowseContentPanel);
