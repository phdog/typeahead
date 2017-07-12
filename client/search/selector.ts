import { createSelector } from 'reselect';
import { slice } from 'lodash';
import { selectIdFromPath } from '../data/selector';

export const getSearchMode = state => state.search.mode;
export const getSearchText = state => state.search.text;
export const getSearchItem = state => state.search.item;
export const getSearchValue = state => state.search.value;
export const getSearchData = state => state.data;
export const getUIData = state => state.ui;
export const getSearchField = () => 'name';
// Можно реализовать поиск по комбинированных полям (тэги например)

// Привести данные из Стора к формату поиска. Массив объектов с id и значениями полей для поиска
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

// Фильтр данных по поисковой фразе. Обрезка длинны списка.
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
// Ввод не трогали
  } else if (searchData && mode && !text) {
    if (searchData.length > maxItems) { return slice(searchData, 0, maxItems) }
    else { return searchData }
  }
  else { return []}
})

// Вернуть результирующий объект поиска целиком
export const selectSearchValue = createSelector(getSearchValue, getSearchData, (key, data) => {
  if (key && data && data.values) {
    return data.values[key]
  } else {
    return {}
  }
})

// Вычислить активный индекс на основе сформированного списка данных
export const selectActiveIndex = createSelector(getSearchItem, selectFindData, (item, findData) => {
  let Item;
  const min = 1;
  let max = findData.length + min + 1;
  let range = max - min;
  Item = (item - min) % range;
  if (Item < 0) { return Math.abs(Item + range) } else { return Math.abs(Item) }
})

// Вернуть активное значение по активному индексу
export const selectActive = createSelector(selectActiveIndex, selectFindData, (activeIndex, findData) => {
  if (findData) { return findData[activeIndex] } else { return {}}
})

// Вернуть значение плейсхолдера для поля ввода
export const selectPlaceholder = createSelector(getUIData, getSearchValue, selectSearchValue, selectActive, getSearchMode, getSearchField, (ui, searchValue, selectSearchValue, active, mode, field) => {
  // Если идет загрузка
  if (ui.loading) { return 'Loading...' }
  // Есть выбранное значение но нет активного элемета
  else if ( searchValue && !active ) { return selectSearchValue[field] }
  // Есть активный элемент в режиме редактирования
  else if (active && mode) { return active.value}
  // Режим ввода нового элемента
  else if (ui.add) { return 'Enter new item below... or start new search'}
  // Серч, просто серч
  else { return 'Start typing...'}
})
