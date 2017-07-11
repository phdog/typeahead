import { createSelector } from 'reselect';

export const getPath = state => state.routing.locationBeforeTransitions.pathname;

export const selectIdFromPath = createSelector(getPath, path => {
  const [id] = path.split('/')
  return id;
})
