import { createSelector } from 'reselect';

export const getWritingModels = state => state.writingModels;
export const getSubjectAreas = state => state.subjectAreas;
export const getSections = state => state.sections;
export const getMoves = state => state.moves;
export const getMarkers = state => state.markers;
export const getRightPanelFlag = state => state.rightPanelFlag;
export const getDocument = state => state.document;
export const getWritingModelId = state => state.writingModelId;
export const getSubjectAreaId = state => state.subjectAreaId;
export const getSectionId = state => state.sectionId;
export const getPopUpActive = state => state.popUpActive;
export const getAnalysis = state => state.analysis;
export const getAnalysisSentenceId = state => state.analysisSentenceId;
