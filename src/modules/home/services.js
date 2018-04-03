import axios from 'axios';

export const fetchWritingModels = () => axios.get('/api/writingModels');
export const fetchSubjectAreas = () => axios.get('/api/subjectAreas');
export const fetchSections = () => axios.get('/api/sections');
export const fetchMoves = () => axios.get('/api/moves');
export const fetchSteps = () => axios.get('/api/steps');
export const fetchMarkers = () => axios.get('/api/markers');
export const fetchMdCodes = () => axios.get('/api/mdCodes');
export const fetchMdSubCodes = () => axios.get('/api/mdSubCodes');
export const fetchMdMarkers = () => axios.get('/api/mdMarkers');
export const fetchSentencesByMarkerId = id => axios.get('/api/sentencesByMarkerId', { params: { id } });
