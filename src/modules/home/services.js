import axios from 'axios';

export const fetchWritingModels = () => axios.get('/api/writingModels');
export const fetchSubjectAreas = () => axios.get('/api/subjectAreas');
export const fetchSections = () => axios.get('/api/sections');

export const fetchMoves = () => axios.get('/api/moves');
export const fetchSteps = () => axios.get('/api/steps');
export const fetchMarkers = () => axios.get('/api/markers');
export const fetchSentencesByMarkerId = id => axios.get('/api/sentencesByMarkerId', { params: { id } });

export const fetchMdCodes = () => axios.get('/api/mdCodes');
export const fetchMdSubCodes = () => axios.get('/api/mdSubCodes');
export const fetchMdMarkers = () => axios.get('/api/mdMarkers');

export const fetchRsTypes = () => axios.get('/api/rsTypes');
export const fetchRsSteps = () => axios.get('/api/rsSteps');
export const fetchRsMarkers = () => axios.get('/api/rsMarkers');
export const fetchRsSentencesByMarker = (stepId, marker) => axios.get('/api/rsSentencesByMarker', { params: { stepId, marker } });
export const fetchRsSentencesByStepId = id => axios.get('/api/rsSentencesByStepId', { params: { id } });
