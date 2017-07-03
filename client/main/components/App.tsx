import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import * as action from '../../search/constants/ActionTypes';
import {
  Input,
  Output
} from '../../search';
import { model } from '../../search';
import './App.css';

interface AppProps {
  search: model.Search;
  dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps, void> {

  handleMouseDown(e) {
    const { dispatch } = this.props;
    if (e.target.className === 'page')
    dispatch({type: action.FLUSH_SEARCH})
  }

  render() {

    return (
      <div className='page' onMouseDown={this.handleMouseDown.bind(this)}>
      <div className='container'>
          <Input />
          <Output />
      </div>
      </div>
    );
  }
}

export default connect(null)(App);
