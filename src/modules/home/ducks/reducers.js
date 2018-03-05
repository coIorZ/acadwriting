import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  FETCH_MOVES_SUCCESS, FETCH_MOVES_FAIL,
  FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_BODY, SET_DOCUMENT_BODY, SET_DOCUMENT_SECTION_ID,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID,
  SET_POPUP_ACTIVE,
  SET_ANALYSIS,
  SET_RIGHTPANEL_FLAG,
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

const sectionsReducer = handleActions({
  [FETCH_SECTIONS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_SECTIONS_FAIL]: (state, { payload }) => {
    console.error(payload);
    return state;
  },
}, {});

const movesReducer = handleActions({
  [FETCH_MOVES_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_MOVES_FAIL]: (state, { payload }) => {
    console.error(payload);
    return state;
  },
}, {});

const markersReducer = handleActions({
  [FETCH_MARKERS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_MARKERS_FAIL]: (state, { payload }) => {
    console.error(payload);
    return state;
  },
}, {});

const documentReducer = handleActions({
  [INPUT_DOCUMENT_TITLE]: (state, { payload }) => {
    return {
      ...state,
      title: payload,
    };
  },
  [INPUT_DOCUMENT_BODY]: (state, { payload }) => {
    return {
      ...state,
      body: {
        ...state.body,
        [state.sectionId]: payload,
      },
    };
  },
  [SET_DOCUMENT_BODY]: (state, { payload }) => {
    return {
      ...state,
      body: payload,
    };
  },
  [SET_DOCUMENT_SECTION_ID]: (state, { payload }) => {
    return {
      ...state,
      sectionId: payload,
    };
  },
}, {
  title     : '',
  body      : {},
  sectionId : -1,
});

const writingModelIdReducer = handleAction(SET_WRITINGMODEL_ID, (state, { payload }) => payload, -1);
const subjectAreaIdReducer = handleAction(SET_SUBJECTAREA_ID, (state, { payload }) => payload, -1);

const popUpActiveReducer = handleAction(SET_POPUP_ACTIVE, (state, { payload }) => payload, false);

const analysisReducer = handleAction(SET_ANALYSIS, (state, { payload }) => payload, {});

const rightPanelFlagReducer = handleAction(SET_RIGHTPANEL_FLAG, (state, { payload }) => payload, 1);

export default combineReducers({
  writingModels  : writingModelsReducer,
  subjectAreas   : subjectAreasReducer,
  sections       : sectionsReducer,
  moves          : movesReducer,
  markers        : markersReducer,
  document       : documentReducer,
  writingModelId : writingModelIdReducer,
  subjectAreaId  : subjectAreaIdReducer,
  popUpActive    : popUpActiveReducer,
  analysis       : analysisReducer,
  rightPanelFlag : rightPanelFlagReducer,
});
