import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
} from './types';

const writingModelsReducer = handleActions({
  [FETCH_WRITINGMODELS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_WRITINGMODELS_FAIL]: (state, { payload }) => {
    console.error(payload);
    return state;
  },
}, {});

const subjectAreasReducer = handleActions({
  [FETCH_SUBJECTAREAS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_SUBJECTAREAS_FAIL]: (state, { payload }) => {
    console.error(payload);
    return state;
  },
}, {});

export default combineReducers({
  writingModels : writingModelsReducer,
  subjectAreas  : subjectAreasReducer,
});
