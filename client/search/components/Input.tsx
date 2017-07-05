import './Input.css';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { model } from '../index';
import * as action from '../constants/ActionTypes';
import { getSearchData, selectActive } from '../selector';

interface SearchTextInputProps {
  dispatch: Dispatch<{}>;
  search: model.Search;
  active: string;
}

class SearchTextInput extends React.Component<SearchTextInputProps, void> {

  handleKeyDown = (e) => {
      const { dispatch, active } = this.props;
      switch(e.keyCode) {
        case 13: //Enter
          e.preventDefault();
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

  handleChange = (e) => {
    const { dispatch } = this.props;
    dispatch({ type: action.TRIGGER_SEARCH, payload: e.target.value })
  }

  handleFocus = () => {
    const { dispatch } = this.props;
    dispatch({type: action.START_SEARCH})
  }

  render() {
    const { search, active } = this.props;
    let placeholder = (search.value && !active) ? search.value : (active && search.mode) ? active : 'Search...';
    return (
      <form>
        <input
          type='text'
          name='typeahead'
          placeholder={placeholder}
          value={search.text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
        />
      </form>
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
