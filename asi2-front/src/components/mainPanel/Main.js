import React, { Component } from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import * as contentMapTmp from '../../source/contentMap.json';
import * as presTmp from '../../source/pres.json';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import Slid from '../common/slid/containers/Slid';
import Presentation from '../common/presentation/containers/Presentation';
import EditSlidPanel from '../editSlidPanel/containers/EditSlidPanel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider, connect } from 'react-redux';
import globalReducer from '../../reducers';
import { createStore } from 'redux';
import { updateContentMap,updatePresentation } from '../../actions';

const store = createStore(globalReducer);
//var Comm = require('../../../services/Comm.js');

class Main extends Component {
  constructor(props) {
    super(props);
    store.dispatch(updateContentMap(contentMapTmp.default));
    store.dispatch(updatePresentation(presTmp.default));

    /* connection
    Comm.loadPres(0, store.dispatch(updatePresentation));
    Comm.resources_list(store.dispatch(updateContentMap));

    */
  }
  render() {
    let slid = presTmp.default.slidArray[0];
    let pres = presTmp.default;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className='container-fluid'>
            <div className="row">
              <div className='col-md-3 col-lg-3 height-100'>
                <Presentation/>
              </div>
              <div className='col-md-6 col-lg-6 height-100'>
                <EditSlidPanel/>
              </div>
              <div className='col-md-3 col-lg-3 height-100'>
                <BrowseContentPanel />
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    content_map: state.updateModelReducer.content_map
  };
}

export default Main;
//export default connect(mapStateToProps)(Main);
