import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { addContent } from '../../../actions';

class AddContentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: 'img',
      src: ''
    }
    this.saveNewContent = this.saveNewContent.bind(this);
  }

  saveNewContent() {
    let newContent = {
      title: this.state.title,
      type: this.state.type,
      src: this.state.src
    }
    this.props.dispatch(addContent(newContent));
    this.props.onClose();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          className="dialogForm"
        >
          <DialogTitle id="form-dialog-title">Add a new content</DialogTitle>
          <DialogContent>
            <TextField label="Title" onChange={(e) => this.setState({title: e.target.value})} fullWidth/>

            <DialogContentText className="pt-1 w-100">
              Type of content
            </DialogContentText>
            <select className="form-control" onChange={(e) => this.setState({type: e.target.value})}>
              <option>img</option>
              <option>img_url</option>
              <option>video</option>
              <option>web</option>
            </select>
            <TextField label="URL" onChange={(e) => this.setState({src: e.target.value})} fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveNewContent} color="primary">
              ADD
            </Button>
            <Button onClick={this.props.onClose} color="primary">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(AddContentPanel);
