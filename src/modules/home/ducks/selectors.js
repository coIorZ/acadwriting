import { createSelector } from 'reselect';

export const getWritingModels = state => state.writingModels;
export const getSubjectAreas = state => state.subjectAreas;
export const getSections = state => state.sections;
export const getDocument = state => state.document;
export const getFunctionPanelStatus = state => state.functionPanelStatus;
export const getWritingModelId = state => state.writingModelId;
export const getSubjectAreaId = state => state.subjectAreaId;
export const getPopUpActive = state => state.popUpActive;

export const getSection = createSelector(
  getSections, 
  getDocument, 
  (sections, document) => sections[document.sectionId],
);
