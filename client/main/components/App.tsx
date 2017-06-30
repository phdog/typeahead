import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
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
  render() {
    const { search, dispatch } = this.props;

    return (
      <div className='container'>
          <Input />
          <Output />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(App);
