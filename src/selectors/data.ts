import { createSelector } from 'reselect';

export const getPath = state => state.routing.locationBeforeTransitions.pathname;

// Значение id активного элемента на основании маршрута 
export const selectIdFromPath = createSelector(getPath, path => {
  const [,id] = path.split('/')
  return id;
})
