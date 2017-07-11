import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as action from '../constants/ActionTypes';
import { model } from '../index';
import { selectFindData, selectActiveIndex, selectActive } from '../selector';
import { pickSearch, flushSearch } from '../actions';

interface IState {
  dispatch: Dispatch<{}>;
  search: model.Search;
  findData: [{ key: string, value: string}];
  activeIndex: number;
  active: string;
}

interface DispatchProps {
  pickSearch: Function;
  flushSearch: Function;
}

class SearchTextOutput extends React.Component<IState & DispatchProps, void> {

  handleClick = (e) => {
    const { active, pickSearch, flushSearch }  = this.props;
    pickSearch(e.target.getAttribute('value'));
    flushSearch();
  }

  render() {
    const { search, findData, activeIndex } = this.props;
    return (
      search.mode && (findData.length > 0) &&
      <div className='menu'>
      <ul>
      {findData.map((item, i) => {
        let className = activeIndex === i ? 'menu__active' : 'menu__inactive'
        return (
          <Link to={`/${item.key}`} key={item.key}>
          <li
            value={item.key}
            onClick={this.handleClick}
            className={className}
            >
            {item.value}
          </li>
          </Link>
        )
      })
    }
    </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    search: state.search,
    findData: selectFindData(state),
    activeIndex: selectActiveIndex(state),
    active: selectActive(state)
})

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  pickSearch: (text: string) => { dispatch(pickSearch(text)); },
  flushSearch: () => { dispatch(flushSearch()); }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextOutput);
