import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
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
interface SearchTextOutputState {

}

class SearchTextOutput extends React.Component<SearchTextOutputProps, SearchTextOutputState> {

  handleClick(e) {
    const { dispatch, active }  = this.props;
    dispatch({ type: action.PICK_SEARCH, payload: e.target.getAttribute('value') });
    dispatch({type: action.FLUSH_SEARCH});
  }

  render() {
    const { search, findData, activeIndex } = this.props;
      if ( search.mode && findData ) {
    return (
      <div>
      <Menu vertical fluid borderless>
          {findData.map((item, i) => {
            return (
              <div key={i.toString()}>
              <Menu.Item
                name={item}
                value={item}
                active={activeIndex === i}
                onClick={this.handleClick.bind(this)}
                >
                </Menu.Item>
              </div>
            )
          })
        }
      </Menu>
      </div>
    );
  } else { return null; }
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
