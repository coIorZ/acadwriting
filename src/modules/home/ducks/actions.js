import { createAction } from 'redux-actions';
import axios from 'axios';

import editor from '../../../lib/editor';

import {
  FETCH_WRITINGMODELS_PENDING, FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_PENDING, FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  FETCH_SECTIONS_PENDING, FETCH_SECTIONS_SUCCESS, FETCH_SECTIONS_FAIL,
  FETCH_MARKERS_PENDING, FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAIL,
  FETCH_STEPS_PENDING, FETCH_STEPS_SUCCESS, FETCH_STEPS_FAIL,
  FETCH_MOVES_PENDING, FETCH_MOVES_SUCCESS, FETCH_MOVES_FAIL,
  FETCH_MDMARKERS_PENDING, FETCH_MDMARKERS_SUCESS, FETCH_MDMARKERS_FAIL,
  FETCH_MDSUBCODES_PENDING, FETCH_MDSUBCODES_SUCESS, FETCH_MDSUBCODES_FAIL,
  FETCH_MDCODES_PENDING, FETCH_MDCODES_SUCESS, FETCH_MDCODES_FAIL,
  FETCH_SCENTENCE_BY_MARKERID_PENDING, FETCH_SCENTENCE_BY_MARKERID_SUCCESS, FETCH_SCENTENCE_BY_MARKERID_FAIL,
  INPUT_DOCUMENT_TITLE, SET_DOCUMENT_BODY_BY_SECTIONID, SET_DOCUMENT_BODY,
  SET_WRITINGMODEL_ID, SET_SUBJECTAREA_ID, SET_SECTION_ID,
  SET_CURRENT_MOVE_ID, SET_CURRENT_STEP_ID, SET_CURRENT_MARKER_ID,
  SET_POPUP_ACTIVE,
  SET_ANALYSIS, SET_ANALYSIS_SENTENCE_ID, SET_ANALYSIS_FLAG,
  SET_GUIDE_FLAG,
  SET_RIGHTPANEL_TAB,
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

export const fetchStepsPending = createAction(FETCH_STEPS_PENDING);
export const fetchStepsSuccess = createAction(FETCH_STEPS_SUCCESS);
export const fetchStepsFail = createAction(FETCH_STEPS_FAIL);
export const fetchSteps = () => dispatch => {
  dispatch(fetchStepsPending());
  axios.get('/api/steps')
    .then(({ data }) => {
      dispatch(fetchStepsSuccess(data));
    })
    .catch(err => {
      dispatch(fetchStepsFail(err));
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

export const fetchMdCodesPending = createAction(FETCH_MDCODES_PENDING);
export const fetchMdCodesSuccess = createAction(FETCH_MDCODES_SUCESS);
export const fetchMdCodesFail = createAction(FETCH_MDCODES_FAIL);
export const fetchMdCodes = () => dispatch => {
  dispatch(fetchMdCodesPending());
  axios.get('/api/mdCodes')
    .then(({ data }) => {
      dispatch(fetchMdCodesSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMdCodesFail(err));
    });
};

export const fetchMdSubCodesPending = createAction(FETCH_MDSUBCODES_PENDING);
export const fetchMdSubCodesSuccess = createAction(FETCH_MDSUBCODES_SUCESS);
export const fetchMdSubCodesFail = createAction(FETCH_MDSUBCODES_FAIL);
export const fetchMdSubCodes = () => dispatch => {
  dispatch(fetchMdSubCodesPending());
  axios.get('/api/mdSubCodes')
    .then(({ data }) => {
      dispatch(fetchMdSubCodesSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMdSubCodesFail(err));
    });
};

export const fetchMdMarkersPending = createAction(FETCH_MDMARKERS_PENDING);
export const fetchMdMarkersSuccess = createAction(FETCH_MDMARKERS_SUCESS);
export const fetchMdMarkersFail = createAction(FETCH_MDMARKERS_FAIL);
export const fetchMdMarkers = () => dispatch => {
  dispatch(fetchMdMarkersPending());
  axios.get('/api/mdMarkers')
    .then(({ data }) => {
      dispatch(fetchMdMarkersSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMdMarkersFail(err));
    });
};

export const fetchSentencesByMarkerIdPending = createAction(FETCH_SCENTENCE_BY_MARKERID_PENDING);
export const fetchSentencesByMarkerIdSuccess = createAction(FETCH_SCENTENCE_BY_MARKERID_SUCCESS);
export const fetchSentencesByMarkerIdFail = createAction(FETCH_SCENTENCE_BY_MARKERID_FAIL);
export const fetchSentencesByMarkerId = id => dispatch => {
  dispatch(fetchSentencesByMarkerIdPending());
  axios.get('/api/sentencesByMarkerId', {
    params: { id },
  })
    .then(({ data }) => {
      dispatch(fetchSentencesByMarkerIdSuccess({ id, sentences: data }));
    })
    .catch(err => {
      dispatch(fetchSentencesByMarkerIdFail(err));
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
  dispatch(setAnalysisFlag(1));
}; 

export const setCurrentMoveId = createAction(SET_CURRENT_MOVE_ID);
export const setCurrentStepId = createAction(SET_CURRENT_STEP_ID);
export const setCurrentMarkerId = createAction(SET_CURRENT_MARKER_ID);

export const startAnalysis = () => (dispatch, getState) => {
  if(!editor().text()) return;
  const { markers, moves, steps, document, sectionId } = getState();
  const { analysis, body } = editor().analyze({ markers, moves, steps, document, sectionId });
  dispatch(setDocumentBody(body));
  dispatch(setAnalysis(analysis));
  dispatch(setRightPanelTab(2));
};
export const setAnalysis = createAction(SET_ANALYSIS);
export const setAnalysisSentenceId = createAction(SET_ANALYSIS_SENTENCE_ID);

export const clickEditor = payload => dispatch => {
  const sentenceId = editor().click(payload).sentenceId(payload);
  if(sentenceId) {
    dispatch(setAnalysisSentenceId(sentenceId));
    dispatch(setAnalysisFlag(2));
  }
};

export const setPopUpActive = createAction(SET_POPUP_ACTIVE);

export const setAnalysisFlag = createAction(SET_ANALYSIS_FLAG);
export const setGuideFlag = createAction(SET_GUIDE_FLAG);
export const setRightPanelTab = createAction(SET_RIGHTPANEL_TAB);

export const clickStep = stepId => (dispatch, getState) => {
  const { analysis, sectionId } = getState();
  const sentences = analysis[sectionId].steps[stepId];
  editor().highlightSentences(sentences);
};

export default {
  fetchWritingModels, fetchSubjectAreas, fetchSections, fetchMoves, fetchMarkers, fetchSteps, 
  fetchMdCodes, fetchMdSubCodes, fetchMdMarkers, fetchSentencesByMarkerId,
  inputDocumentTitle, inputDocumentBody, pasteDocumentBody,
  setWritingModelId, setSubjectAreaId, setSectionId, 
  setCurrentMoveId, setCurrentStepId, setCurrentMarkerId,
  startAnalysis,
  clickEditor, clickStep,
  setPopUpActive,
  setAnalysisFlag, setGuideFlag, setRightPanelTab,
};
