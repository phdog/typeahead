import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as action from '../constants/ActionTypes';
import { model } from '../index';
import { selectFindData, selectActiveIndex, selectActive } from '../selector';

interface SearchTextOutputProps {
  dispatch: Dispatch<{}>;
  search: model.Search;
  findData: [string];
  activeIndex: number;
  active: string;
}

class SearchTextOutput extends React.Component<SearchTextOutputProps, void> {

  handleClick = (e) => {
    const { dispatch, active }  = this.props;
    dispatch({ type: action.PICK_SEARCH, payload: e.target.getAttribute('value') });
    dispatch({type: action.FLUSH_SEARCH});
  }

  render() {
    const { search, findData, activeIndex } = this.props;
    return (
      search.mode && (findData.length > 0) &&
      <div className='menu'>
      {findData.map((item, i) => {
        let className = activeIndex === i ? 'menu__active' : null
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

function mapStateToProps(state) {
  return {
    search: state.search,
    findData: selectFindData(state),
    activeIndex: selectActiveIndex(state),
    active: selectActive(state)
  }
}

export default connect(mapStateToProps)(SearchTextOutput);
