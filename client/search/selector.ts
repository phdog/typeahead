import { createSelector } from 'reselect';
import { slice } from 'lodash';

export const getSearchMode = state => state.search.mode;
export const getSearchText = state => state.search.text;
export const getSearchItem = state => state.search.item;
export const getSearchValue = state => state.search.value;
export const getSearchData = state => state.data;
export const getUIData = state => state.ui;
export const getSearchField = () => 'name';
//May also implement combinations of search fields;

// Retrieve search data from store as an array of objects with ids and field values;
export const selectSearchData = createSelector(getSearchData, getSearchField, (data, searchField) => {
  if (data && data.keys && data.keys.length > 0) {
    let dataArr = [];
    data.keys.map(key => {
      dataArr.push({ ['key']: key, ['value'] : data.values[key][searchField] })
    })
    return dataArr;
  } else {
    return [];
  }
})

// Filter out typeahead data from searchData, trim output
export const selectFindData = createSelector(selectSearchData, getSearchText, getSearchMode, (searchData, text, mode) => {
  const maxItems = 7;
  if (searchData && text && mode) {
    let regex = new RegExp(text, 'i');
    let matchArr = [];
    searchData.map(item => {
      if (item.value.match(regex)) { matchArr.push(item) }
    })
    if (matchArr.length > maxItems) { return slice(matchArr, 0, maxItems) }
    else { return matchArr }
// Input is untouched
  } else if (searchData && mode && !text) {
    if (searchData.length > maxItems) { return slice(searchData, 0, maxItems) }
    else { return searchData }
  }
  else { return []}
})

// Return resulting search object
export const selectSearchValue = createSelector(getSearchValue, getSearchData, (key, data) => {
  if (key && data && data.values) {
    return data.values[key]
  } else {
    return {}
  }
})

// Calculate and trim active index in list of output data
export const selectActiveIndex = createSelector(getSearchItem, selectFindData, (item, findData) => {
  let Item;
  const min = 1;
  let max = findData.length + min + 1;
  let range = max - min;
  Item = (item - min) % range;
  if (Item < 0) { return Math.abs(Item + range) } else { return Math.abs(Item) }
})

// Return active value on index from list og output data
export const selectActive = createSelector(selectActiveIndex, selectFindData, (activeIndex, findData) => {
  if (findData) { return findData[activeIndex] } else { return {}}
})

// Return valid placeholder value
export const selectPlaceholder = createSelector(getUIData, getSearchValue, selectSearchValue, selectActive, getSearchMode, getSearchField, (ui, searchValue, selectSearchValue, active, mode, field) => {
  if (ui.loading) { return 'Loading...' }
  else if ( searchValue && !active ) { return selectSearchValue[field] }
  else if (active && mode) { return active.value}
  else { return 'Search...'}
})
