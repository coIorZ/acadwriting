import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  FETCH_MOVES_SUCCESS, FETCH_MOVES_FAIL,
  FETCH_STEPS_SUCCESS, FETCH_STEPS_FAIL,
  FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAIL,
  FETCH_SCENTENCE_BY_MARKERID_SUCCESS, FETCH_SCENTENCE_BY_MARKERID_FAIL,
  INPUT_DOCUMENT_TITLE, SET_DOCUMENT_BODY_BY_SECTIONID, SET_DOCUMENT_BODY,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID, SET_SECTION_ID, SET_MARKER_ID,
  SET_POPUP_ACTIVE,
  SET_ANALYSIS, SET_ANALYSIS_SENTENCE_ID, SET_ANALYSIS_FLAG,
  SET_GUIDE_FLAG,
  SET_RIGHTPANEL_TAB,
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

const stepsReducer = handleActions({
  [FETCH_STEPS_SUCCESS]: (state, { payload }) => {
    return payload;
  },
  [FETCH_STEPS_FAIL]: (state, { payload }) => {
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

const sentencesReducer = handleActions({
  [FETCH_SCENTENCE_BY_MARKERID_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      [payload.id]: payload.sentences,
    };
  },
  [FETCH_SCENTENCE_BY_MARKERID_FAIL]: (state, { payload }) => {
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
  [SET_DOCUMENT_BODY_BY_SECTIONID]: (state, { payload }) => {
    return {
      ...state,
      body: {
        ...state.body,
        [payload.sectionId]: payload.input,
      },
    };
  },
  [SET_DOCUMENT_BODY]: (state, { payload }) => {
    return {
      ...state,
      body: payload,
    };
  },
}, {
  title : '',
  body  : {},
});

const writingModelIdReducer = handleAction(SET_WRITINGMODEL_ID, (state, { payload }) => payload, -1);
const subjectAreaIdReducer = handleAction(SET_SUBJECTAREA_ID, (state, { payload }) => payload, -1);
const sectionIdReducer = handleAction(SET_SECTION_ID, (state, { payload }) => payload, -1);
const markerIdReducer = handleAction(SET_MARKER_ID, (state, { payload }) => payload, -1);

const popUpActiveReducer = handleAction(SET_POPUP_ACTIVE, (state, { payload }) => payload, false);

const analysisReducer = handleAction(SET_ANALYSIS, (state, { payload }) => payload, {});
const analysisSentenceIdReducer = handleAction(SET_ANALYSIS_SENTENCE_ID, (state, { payload }) => payload, null);

const analysisFlagReducer = handleAction(SET_ANALYSIS_FLAG, (state, { payload }) => payload, 1);
const guideFlagReducer = handleAction(SET_GUIDE_FLAG, (state, { payload }) => payload, 1);
const rightPanelTabReducer = handleAction(SET_RIGHTPANEL_TAB, (state, { payload }) => payload, 1);

export default combineReducers({
  writingModels      : writingModelsReducer,
  subjectAreas       : subjectAreasReducer,
  sections           : sectionsReducer,
  moves              : movesReducer,
  steps              : stepsReducer,
  markers            : markersReducer,
  sentences          : sentencesReducer,
  document           : documentReducer,
  writingModelId     : writingModelIdReducer,
  subjectAreaId      : subjectAreaIdReducer,
  sectionId          : sectionIdReducer,
  markerId           : markerIdReducer,
  popUpActive        : popUpActiveReducer,
  analysis           : analysisReducer,
  analysisSentenceId : analysisSentenceIdReducer,
  analysisFlag       : analysisFlagReducer,
  guideFlag          : guideFlagReducer,
  rightPanelTab      : rightPanelTabReducer,
});
