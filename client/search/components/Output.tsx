import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as action from '../constants/ActionTypes';
import { model } from '../index';
import { selectFindData, selectActiveIndex, selectActive } from '../selector';
import { pickSearch, flushSearch } from '../actions';

interface SearchTextOutputProps {
  dispatch: Dispatch<{}>;
  search: model.Search;
  findData: [string];
  activeIndex: number;
  active: string;
}

interface DispatchProps {
  pickSearch: Function;
  flushSearch: Function;
}

class SearchTextOutput extends React.Component<SearchTextOutputProps & DispatchProps, void> {

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
      {findData.map((item, i) => {
        let className = activeIndex === i ? 'menu__active' : 'menu__inactive'
        return (
          <a
            key={i.toString()}
            value={item}
            onClick={this.handleClick}
            className={className}
            >
            {item}
          </a>
        )
      })
    }
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
