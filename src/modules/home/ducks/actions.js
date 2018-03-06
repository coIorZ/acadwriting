import { createAction } from 'redux-actions';
import axios from 'axios';

import editor from '../../../lib/editor';

import {
  FETCH_WRITINGMODELS_PENDING, FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_PENDING, FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_PENDING, FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  FETCH_MARKERS_PENDING, FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAIL,
  FETCH_MOVES_PENDING, FETCH_MOVES_SUCCESS, FETCH_MOVES_FAIL,
  INPUT_DOCUMENT_TITLE, SET_DOCUMENT_BODY_BY_SECTIONID, SET_DOCUMENT_BODY,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID, SET_SECTION_ID,
  SET_POPUP_ACTIVE,
  SET_ANALYSIS, SET_ANALYSIS_SENTENCE_ID,
  SET_RIGHTPANEL_FLAG, SET_RIGHTPANEL_TAB,
} from './types';

export const fetchWritingModelsPending = createAction(FETCH_WRITINGMODELS_PENDING);
export const fetchWritingModelsSuccess = createAction(FETCH_WRITINGMODELS_SUCCESS);
export const fetchWritingModelsFail = createAction(FETCH_WRITINGMODELS_FAIL);
export const fetchWritingModels = () => dispatch => {
  dispatch(fetchWritingModelsPending());
  axios.get('/api/writingModels')
    .then(({ data }) => {
      dispatch(fetchWritingModelsSuccess(data));
      dispatch(setWritingModelId(Number(Object.keys(data)[0])));
    })
    .catch(err => {
      dispatch(fetchWritingModelsFail(err));
    });
};

export const fetchSubjectAreasPending = createAction(FETCH_SUBJECTAREAS_PENDING);
export const fetchSubjectAreasSuccess = createAction(FETCH_SUBJECTAREAS_SUCCESS);
export const fetchSubjectAreasFail = createAction(FETCH_SUBJECTAREAS_FAIL);
export const fetchSubjectAreas = () => dispatch => {
  dispatch(fetchSubjectAreasPending());
  axios.get('/api/subjectAreas')
    .then(({ data }) => {
      dispatch(fetchSubjectAreasSuccess(data));
      dispatch(setSubjectAreaId(Number(Object.keys(data)[0])));
    })
    .catch(err => {
      dispatch(fetchSubjectAreasFail(err));
    });
};

export const fetchSectionsPending = createAction(FETCH_SECTIONS_PENDING);
export const fetchSectionsSuccess = createAction(FETCH_SECTIONS_SUCCESS);
export const fetchSectionsFail = createAction(FETCH_SECTIONS_FAIL);
export const fetchSections = () => dispatch => {
  dispatch(fetchSectionsPending());
  axios.get('/api/sections')
    .then(({ data }) => {
      dispatch(fetchSectionsSuccess(data));
      dispatch(setSectionId(Number(Object.keys(data)[0])));
    })
    .catch(err => {
      dispatch(fetchSectionsFail(err));
    });
};

export const fetchMovesPending = createAction(FETCH_MOVES_PENDING);
export const fetchMovesSuccess = createAction(FETCH_MOVES_SUCCESS);
export const fetchMovesFail = createAction(FETCH_MOVES_FAIL);
export const fetchMoves = () => dispatch => {
  dispatch(fetchMovesPending());
  axios.get('/api/moves')
    .then(({ data }) => {
      dispatch(fetchMovesSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMovesFail(err));
    });
};

export const fetchMarkersPending = createAction(FETCH_MARKERS_PENDING);
export const fetchMarkersSuccess = createAction(FETCH_MARKERS_SUCCESS);
export const fetchMarkersFail = createAction(FETCH_MARKERS_FAIL);
export const fetchMarkers = () => dispatch => {
  dispatch(fetchMarkersPending());
  axios.get('/api/markers')
    .then(({ data }) => {
      dispatch(fetchMarkersSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMarkersFail(err));
    });
};

export const inputDocumentTitle = createAction(INPUT_DOCUMENT_TITLE);
export const setDocumentBodyBySectionId = sectionId => {
  editor().safe();
  return {
    type    : SET_DOCUMENT_BODY_BY_SECTIONID,
    payload : {
      input: editor().html(),
      sectionId,
    },
  };
};
export const inputDocumentBody = () => (dispatch, getState) => {
  const { sectionId } = getState();
  dispatch(setDocumentBodyBySectionId(sectionId));
};
export const setDocumentBody = createAction(SET_DOCUMENT_BODY);
export const pasteDocumentBody = payload => (dispatch, getState) => {
  const { sectionId } = getState();
  editor().paste(payload);
  dispatch(setDocumentBodyBySectionId(sectionId));
};

export const setWritingModelId = createAction(SET_WRITINGMODEL_ID);
export const setSubjectAreaId = createAction(SET_SUBJECTAREA_ID);
export const setSectionId = payload => (dispatch, getState) => {
  const { document } = getState();
  editor().html(document.body[payload] || '');
  dispatch({
    type: SET_SECTION_ID,
    payload,
  });
}; 

export const startAnalysis = () => (dispatch, getState) => {
  if(!editor().text()) return;
  const { markers, moves, document, sectionId } = getState();
  const { analysis, body } = editor().analyze({ markers, moves, document, sectionId });
  dispatch(setDocumentBody(body));
  dispatch(setAnalysis(analysis));
  dispatch(setRightPanelFlag(2));
};
export const setAnalysis = createAction(SET_ANALYSIS);
export const setAnalysisSentenceId = createAction(SET_ANALYSIS_SENTENCE_ID);

export const clickEditor = payload => dispatch => {
  const sentenceId = editor().click(payload).selectedSentenceId();
  dispatch(setAnalysisSentenceId(sentenceId));
  dispatch(setRightPanelFlag(21));
};

export const setPopUpActive = createAction(SET_POPUP_ACTIVE);

export const setRightPanelFlag = createAction(SET_RIGHTPANEL_FLAG);
export const setRightPanelTab = createAction(SET_RIGHTPANEL_TAB);

export default {
  fetchWritingModels, fetchSubjectAreas, fetchSections, fetchMoves, fetchMarkers,
  inputDocumentTitle, inputDocumentBody, pasteDocumentBody,
  setWritingModelId, setSubjectAreaId, setSectionId,
  startAnalysis,
  clickEditor,
  setPopUpActive,
  setRightPanelFlag, setRightPanelTab,
};
