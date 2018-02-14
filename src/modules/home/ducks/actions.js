import { createAction } from 'redux-actions';
import axios from 'axios';

import {
  FETCH_WRITINGMODELS_PENDING, FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_PENDING, FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
  INPUT_DOCUMENT_TITLE, INPUT_DOCUMENT_INTRODUCTION, INPUT_DOCUMENT_LITREVIEW, SET_DOCUMENT_SECTION,
  SET_FUNCTIONPANEL_ACTIVE,
} from './types';

export const fetchWritingModelsPending = createAction(FETCH_WRITINGMODELS_PENDING);
export const fetchWritingModelsSuccess = createAction(FETCH_WRITINGMODELS_SUCCESS);
export const fetchWritingModelsFail = createAction(FETCH_WRITINGMODELS_FAIL);
export const fetchWritingModels = () => dispatch => {
  dispatch(fetchWritingModelsPending());
  axios.get('/api/writingModels')
    .then(({ data }) => {
      dispatch(fetchWritingModelsSuccess(data));
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
    })
    .catch(err => {
      dispatch(fetchSubjectAreasFail(err));
    });
};

export const inputDocumentTitle = createAction(INPUT_DOCUMENT_TITLE);
export const inputDocumentIntro = createAction(INPUT_DOCUMENT_INTRODUCTION);
export const inputDocumentLitreview = createAction(INPUT_DOCUMENT_LITREVIEW);
export const setDocumentSection = createAction(SET_DOCUMENT_SECTION);

export const setFunctionPanelActive = createAction(SET_FUNCTIONPANEL_ACTIVE);

export default {
  fetchWritingModels, fetchSubjectAreas,
  inputDocumentTitle, inputDocumentIntro, inputDocumentLitreview, setDocumentSection,
  setFunctionPanelActive,
};
