import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { model } from '../index';
import * as action from '../constants/ActionTypes';

import {
  getSearchData,
  selectActive,
  selectPlaceholder,
  getSearchValue } from '../selector';

import {
  selectIdFromPath } from '../../data/selector';

import {
  triggerSearch,
  startSearch,
  flushSearch,
  pickSearch,
  searchUp,
  searchDown } from '../actions';

interface IState {
  dispatch: Dispatch<{}>;
  placeholder: string;
  search: model.Search;
  active: {key: string, value: string};
  loading: boolean;
  idPath: string;
  id: string;
}

interface DispatchProps {
  triggerSearch: Function;
  startSearch: Function;
  flushSearch: Function;
  pickSearch: Function;
  searchUp: Function;
  searchDown: Function;
}

class SearchTextInput extends React.Component<IState & DispatchProps, void> {

  private handleKeyDown = (e) => {
      const { active, flushSearch, pickSearch, searchUp, searchDown } = this.props;
      switch(e.keyCode) {
        case 13: //Enter
          e.preventDefault();
          if (active.key) {
            browserHistory.push(active.key);
            pickSearch(active.key)
            flushSearch();
          }
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

  componentWillMount() {
    const { idPath, id } = this.props;
    if (idPath !== id ) {
      console.log('path', idPath)
      console.log('select', id)
      console.log('PUSH')
    }
  }

  render() {
    const { search, loading, placeholder } = this.props;
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
          disabled={loading}
        />
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    placeholder: selectPlaceholder(state),
    search: state.search,
    loading: state.ui.loading,
    active: selectActive(state),
    idPath: selectIdFromPath(state),
    id: getSearchValue(state)
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
