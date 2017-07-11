import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { stopSearch } from '../../search/actions';
import { fetchData } from '../../data/actions';
import {
  Input,
  Output
} from '../../search';
import { selectIdFromPath } from '../../data/selector';
import { getSearchValue } from '../../search/selector';
import { Card } from '../../data';

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
