import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { flushSearch } from '../../search/actions';
import {
  Input,
  Output
} from '../../search';
import './App.css';

interface DispatchProps {
  flushSearch: Function
}

class App extends React.Component<DispatchProps, void> {

  handleMouseDown(e) {
    if (e.target.className !== 'item') {
      this.props.flushSearch();
    }
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

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  flushSearch: () => {
    dispatch(flushSearch());
  }
});

export default connect(null, mapDispatchToProps)(App);
