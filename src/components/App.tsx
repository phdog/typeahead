import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { stopSearch, fetchData } from '../actions';
import Input from './Input';
import Output from './Output';
import Card from './Card';

interface DispatchProps {
  fetchData: Function;
  stopSearch: Function;
}

class App extends React.Component<DispatchProps, void> {

  componentWillMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  handleMouseDown = (e) => {
    const { stopSearch } = this.props;
    e.target.className.includes('menu') || stopSearch();
  }

  render() {

    return (
      <div className='page' onMouseDown={this.handleMouseDown}>
        <div className='container'>
          <div className='search'>
            <Input />
          </div>
          <div>
            <Card />
          </div>
          <div className='find'>
            <Output />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  fetchData: () => { dispatch(fetchData()); },
  stopSearch: () => { dispatch(stopSearch()); }
});

export default connect(null, mapDispatchToProps)(App);
