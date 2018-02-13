import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_INTRODUCTION, INPUT_DOCUMENT_LITREVIEW, SET_DOCUMENT_SECTION,
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

const titleReducer = handleAction(INPUT_DOCUMENT_TITLE, (state, { payload }) => payload, '');
const introductionReducer = handleAction(INPUT_DOCUMENT_INTRODUCTION, (state, { payload }) => payload, '');
const litreviewReducer = handleAction(INPUT_DOCUMENT_LITREVIEW, (state, { payload }) => payload, '');
const sectionReducer = handleAction(SET_DOCUMENT_SECTION, (state, { payload }) => payload, 1);

const documentReducer = combineReducers({
  title        : titleReducer,
  introduction : introductionReducer,
  litreview    : litreviewReducer,
  section      : sectionReducer,
});

export default combineReducers({
  writingModels : writingModelsReducer,
  subjectAreas  : subjectAreasReducer,
  document      : documentReducer,
});
