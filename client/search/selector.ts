import { createSelector } from 'reselect';
import { slice } from 'lodash';

export const getSearchMode = state => state.search.mode;
export const getSearchText = state => state.search.text;
export const getSearchItem = state => state.search.item;
export const getSearchData = () => { return [
  'sweets', 'cake', 'pie', 'muffin', 'chocolate', 'pancake', 'ice cream', 'smothie', 'cotton candy', 'bisquits', 'donuts',
  'lollipop', 'lemonade', 'pizza', 'popcorn', 'marmelade', 'mashmallow', 'fizzy drinks', 'cup cake', 'cookies'
]}

export const selectFindData = createSelector(getSearchData, getSearchText, getSearchMode, (searchData, text, mode) => {
  const maxItems = 7;
  if (searchData && text && mode) {
    let regex = new RegExp(text, 'i');
    let matchArr = [];
    searchData.map(item => {
      if (item.match(regex)) { matchArr.push(item) }
    })
    if (matchArr.length > maxItems) { return slice(matchArr, 0, maxItems) }
    else { return matchArr }

  } else if (searchData && mode && !text) {
    if (searchData.length > maxItems) { return slice(searchData, 0, maxItems) }
    else { return searchData }
  }
  else { return []}
})

export const selectActiveIndex = createSelector(getSearchItem, selectFindData, (item, findData) => {
  let max = findData.length + 1;
  let Item = item % max;
  if (Item < 0) { return Math.abs(Item + max) } else { return Math.abs(Item) }
})

export const selectActive = createSelector(selectActiveIndex, selectFindData, (activeIndex, findData) => {
  if (findData) { return findData[activeIndex] } else { return {}}
})
