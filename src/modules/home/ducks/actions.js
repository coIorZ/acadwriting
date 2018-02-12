import { createAction } from 'redux-actions';
import axios from 'axios';

import {
  FETCH_WRITINGMODELS_PENDING, FETCH_WRITINGMODELS_SUCCESS, FETCH_WRITINGMODELS_FAIL,
  FETCH_SUBJECTAREAS_PENDING, FETCH_SUBJECTAREAS_SUCCESS, FETCH_SUBJECTAREAS_FAIL,
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
