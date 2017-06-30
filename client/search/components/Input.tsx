import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { model } from '../index';
import * as action from '../constants/ActionTypes';
import { getSearchData, selectActive } from '../selector';


interface SearchTextInputProps {
  dispatch: Dispatch<{}>;
  search: model.Search;
  active: string;
}
interface SearchTextInputState {

}

class SearchTextInput extends React.Component<SearchTextInputProps, SearchTextInputState> {


  handleKeyDown(target) {
      const { dispatch, active } = this.props;
      switch(target.keyCode) {
        case 13: //Enter
          dispatch({ type: action.PICK_SEARCH, payload: active})
          dispatch({ type: action.FLUSH_SEARCH });
          break;
        case 40:
          dispatch({ type: action.SEARCH_UP });
          break;
        case 38:
          dispatch({ type: action.SEARCH_DOWN });
          break;
        case 27: //Escape
          dispatch({ type: action.FLUSH_SEARCH });
          break;
      }

    }

  handleChange(e) {
    const { dispatch } = this.props;
    dispatch({ type: action.TRIGGER_SEARCH, payload: e.target.value })
  }

  handleFocus() {
    const { dispatch } = this.props;
    dispatch({type: action.START_SEARCH})
  }

  render() {
    const { search } = this.props;
    let placeholder = search.value ? search.value : 'Search';
    return (
      <Input fluid
        placeholder={placeholder}
        icon={{ name: 'search', circular: true, link: true }}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        value={search.text}
        onKeyDown={this.handleKeyDown.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    active: selectActive(state)
  }
}

export default connect(mapStateToProps)(SearchTextInput);
