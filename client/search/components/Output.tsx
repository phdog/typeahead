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

class SearchTextOutput extends React.Component<SearchTextOutputProps, void> {

  handleClick(e) {
    const { dispatch, active }  = this.props;
    dispatch({ type: action.PICK_SEARCH, payload: e.target.getAttribute('value') });
    dispatch({type: action.FLUSH_SEARCH});
  }

  render() {
    const { search, findData, activeIndex } = this.props;
    return (
      search.mode && findData &&
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
