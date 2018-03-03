import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import {
  FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_BODY, SET_DOCUMENT_SECTION_ID,
  SET_FUNCTIONPANEL_ACTIVE, SET_FUNCTIONPANEL_FLAG,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID,
  START_ANALYSIS,
  SET_POPUP_ACTIVE,
  SET_INFOFLAG,
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
  [SET_DOCUMENT_SECTION_ID]: (state, { payload }) => {
    return {
      ...state,
      sectionId: payload,
    };
  },
  [START_ANALYSIS]: (state) => {
    return {
      ...state,
    };
  },
}, {
  title     : '',
  body      : {},
  sectionId : -1,
});

const functionPanelActiveReducer = handleAction(SET_FUNCTIONPANEL_ACTIVE, (state, { payload }) => payload, true);
const functionPanelFlagReducer = handleAction(SET_FUNCTIONPANEL_FLAG, (state, { payload }) => payload, -1);
const functionPanelStatusReducer = combineReducers({
  active : functionPanelActiveReducer,
  flag   : functionPanelFlagReducer,
});

const writingModelIdReducer = handleAction(SET_WRITINGMODEL_ID, (state, { payload }) => payload, -1);
const subjectAreaIdReducer = handleAction(SET_SUBJECTAREA_ID, (state, { payload }) => payload, -1);

const popUpActiveReducer = handleAction(SET_POPUP_ACTIVE, (state, { payload }) => payload, false);

const infoFlagReducer = handleAction(SET_INFOFLAG, (state, { payload }) => payload, -1);

export default combineReducers({
  writingModels       : writingModelsReducer,
  subjectAreas        : subjectAreasReducer,
  sections            : sectionsReducer,
  document            : documentReducer,
  functionPanelStatus : functionPanelStatusReducer,
  writingModelId      : writingModelIdReducer,
  subjectAreaId       : subjectAreaIdReducer,
  popUpActive         : popUpActiveReducer,
  infoFlag            : infoFlagReducer,
});
