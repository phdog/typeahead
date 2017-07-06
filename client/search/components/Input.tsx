import './Input.css';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { model } from '../index';
import * as action from '../constants/ActionTypes';
import { getSearchData, selectActive } from '../selector';
import {
  triggerSearch,
  startSearch,
  flushSearch,
  pickSearch,
  searchUp,
  searchDown } from '../actions';

interface SearchTextInputProps {
  dispatch: Dispatch<{}>;
  search: model.Search;
  active: string;
}

interface DispatchProps {
  triggerSearch: Function;
  startSearch: Function;
  flushSearch: Function;
  pickSearch: Function;
  searchUp: Function;
  searchDown: Function;
}

class SearchTextInput extends React.Component<SearchTextInputProps & DispatchProps, void> {

  private handleKeyDown = (e) => {
      const { active, flushSearch, pickSearch, searchUp, searchDown } = this.props;
      switch(e.keyCode) {
        case 13: //Enter
          e.preventDefault();
          pickSearch(active)
          flushSearch();
          break;
        case 40:
          searchUp();
          break;
        case 38:
          searchDown();
          break;
        case 27: //Escape
        flushSearch();
          break;
      }
    }

  private handleChange = (e) => {
    const { triggerSearch } = this.props;
    triggerSearch(e.target.value)
  }

  private handleFocus = () => {
    const { startSearch } = this.props;
    startSearch();
  }

  render() {
    const { search, active } = this.props;
    let placeholder = (search.value && !active) ? search.value : (active && search.mode) ? active : 'Search...';
    return (
      <div className='input'>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    search: state.search,
    active: selectActive(state)
})

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  triggerSearch: (text: string) => { dispatch(triggerSearch(text)); },
  startSearch: () => { dispatch(startSearch()); },
  flushSearch: () => { dispatch(flushSearch()); },
  pickSearch: (text: string) => { dispatch(pickSearch(text)); },
  searchUp: () => { dispatch(searchUp()); },
  searchDown: () => { dispatch(searchDown()); }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextInput);
