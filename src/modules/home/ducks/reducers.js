import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_BODY, SET_DOCUMENT_SECTION_ID,
  SET_FUNCTIONPANEL_ACTIVE,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID,
} from './types';

const writingModelsReducer = handleActions({
  [FETCH_WRITINGMODELS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_WRITINGMODELS_FAIL]: (state, { payload }) => {
    return state;
  },
}, {});

const subjectAreasReducer = handleActions({
  [FETCH_SUBJECTAREAS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_SUBJECTAREAS_FAIL]: (state, { payload }) => {
    return state;
  },
}, {});

const sectionsReducer = handleActions({
  [FETCH_SECTIONS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_SECTIONS_FAIL]: (state, { payload }) => {
    return state;
  },
}, {});

const titleReducer = handleAction(INPUT_DOCUMENT_TITLE, (state, { payload }) => payload, '');
const bodyReducer = handleAction(INPUT_DOCUMENT_BODY, (state, { payload }) => {
  const { section, value } = payload;
  return {
    ...state,
    [section]: value,
  };
}, {});
const sectionIdReducer = handleAction(SET_DOCUMENT_SECTION_ID, (state, { payload }) => payload, 1);
const documentReducer = combineReducers({
  title     : titleReducer,
  body      : bodyReducer,
  sectionId : sectionIdReducer,
});

const functionPanelActiveReducer = handleAction(SET_FUNCTIONPANEL_ACTIVE, (state, { payload }) => payload, true);

const writingModelIdReducer = handleAction(SET_WRITINGMODEL_ID, (state, { payload }) => payload, -1);
const subjectAreaIdReducer = handleAction(SET_SUBJECTAREA_ID, (state, { payload }) => payload, -1);

export default combineReducers({
  writingModels       : writingModelsReducer,
  subjectAreas        : subjectAreasReducer,
  sections            : sectionsReducer,
  document            : documentReducer,
  functionPanelActive : functionPanelActiveReducer,
  writingModelId      : writingModelIdReducer,
  subjectAreaId       : subjectAreaIdReducer,
});
