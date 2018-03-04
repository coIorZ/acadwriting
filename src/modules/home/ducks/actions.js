import { createAction } from 'redux-actions';
import axios from 'axios';

import editor from '../../../lib/editor';

import {
  FETCH_WRITINGMODELS_PENDING, FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_PENDING, FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_PENDING, FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  FETCH_MARKERS_PENDING, FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAIL,
  FETCH_MOVES_PENDING, FETCH_MOVES_SUCCESS, FETCH_MOVES_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_BODY, SET_DOCUMENT_SECTION_ID,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID,
  SET_POPUP_ACTIVE,
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
      dispatch(setDocumentSectionId(Number(Object.keys(data)[0])));
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
export const inputDocumentBody = () => ({
  type    : INPUT_DOCUMENT_BODY,
  payload : editor().html(),
});
export const pasteDocumentBody = payload => dispatch => {
  editor().paste(payload);
  dispatch({
    type    : INPUT_DOCUMENT_BODY,
    payload : editor().html(),
  });
};
export const setDocumentSectionId = payload => (dispatch, getState) => {
  const { document } = getState();
  editor().html(document.body[payload] || '');
  dispatch({
    type: SET_DOCUMENT_SECTION_ID,
    payload,
  });
}; 

export const setWritingModelId = createAction(SET_WRITINGMODEL_ID);
export const setSubjectAreaId = createAction(SET_SUBJECTAREA_ID);

export const startAnalysis = () => (dispatch, getState) => {
  const { markers } = getState();
  editor().analyze(markers);
  dispatch(inputDocumentBody());
};

export const clickEditor = payload => dispatch => {
  editor().click(payload);
};

export const setPopUpActive = createAction(SET_POPUP_ACTIVE);

export default {
  fetchWritingModels, fetchSubjectAreas, fetchSections, fetchMoves, fetchMarkers,
  inputDocumentTitle, inputDocumentBody, pasteDocumentBody, setDocumentSectionId,
  setWritingModelId, setSubjectAreaId,
  startAnalysis,
  clickEditor,
  setPopUpActive,
};
