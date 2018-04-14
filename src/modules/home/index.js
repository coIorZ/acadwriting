import * as services from './services';
import Home from './pages/home';
import editor from '../../lib/editor';

export default {
  namespace : 'home',
  state     : {
    writingModels : {},
    subjectAreas  : {},
    sections      : {},
    moves         : {},
    steps         : {},
    markers       : {},
    sentences     : {},
    mdCodes       : {},
    mdSubCodes    : {},
    mdMarkers     : {},
    mdSentences   : {},
    rsTypes       : {},
    rsSteps       : {},
    rsMarkers     : {},
    rsSentences   : { step: {}, marker: {} },
    document      : {
      title : '',
      body  : {},
    },
    writingModelId     : -1,
    subjectAreaId      : -1,
    sectionId          : -1,
    currentMoveId      : -1,
    currentStepId      : -1,
    currentMarkerId    : -1,
    currentMdCodeId    : -1,
    currentMdSubCodeId : -1,
    currentMdMarkerId  : -1,
    popUpActive        : false,
    analysis           : {},
    analysisSentenceId : -1,
    rightPanelTab      : 1,
    analysisFlag       : 1,
    guideFlag          : 1,
  },
  effects: {
    *fetchAtInit(action, { put, call }) {
      const { data: writingModels } = yield call(services.fetchWritingModels);
      const { data: subjectAreas } = yield call(services.fetchSubjectAreas);
      const { data: sections } = yield call(services.fetchSections);
      const { data: moves } = yield call(services.fetchMoves);
      const { data: steps } = yield call(services.fetchSteps);
      const { data: markers } = yield call(services.fetchMarkers);
      const { data: mdCodes } = yield call(services.fetchMdCodes);
      const { data: mdSubCodes } = yield call(services.fetchMdSubCodes);
      const { data: mdMarkers } = yield call(services.fetchMdMarkers);
      const { data: rsTypes } = yield call(services.fetchRsTypes);
      const { data: rsSteps } = yield call(services.fetchRsSteps);
      const { data: rsMarkers } = yield call(services.fetchRsMarkers);
      yield put({ 
        type    : 'home/saveAtInit', 
        payload : { 
          writingModels, subjectAreas, sections, moves, steps, markers, mdCodes, mdSubCodes, mdMarkers, rsTypes, rsSteps, rsMarkers,
          writingModelId : Number(Object.keys(writingModels)[0]),
          subjectAreaId  : Number(Object.keys(subjectAreas)[2]),
          sectionId      : Number(Object.keys(sections)[0]),
        }, 
      });
    },
    *switchSection({ payload: sectionId }, { put, select }) {
      const document = yield select(state => state.home.document);
      editor().html(document.body[sectionId] || '');
      yield put({ type: 'home/saveSectionId', payload: sectionId });
      yield put({ type: 'home/saveAnalysisFlag', payload: 1 });
    },
    *inputDocumentBody(action, { put, select }) {
      const sectionId = yield select(state => state.home.sectionId);
      editor().safe();
      yield put({
        type    : 'home/saveDocumentBodyBySectionId',
        payload : { sectionId, body: editor().html() },
      });
    },
    *pasteDocumentBody({ payload: e }, { put, select }) {
      const sectionId = yield select(state => state.home.sectionId);
      editor().paste(e);
      yield put({
        type    : 'home/saveDocumentBodyBySectionId',
        payload : { sectionId, body: editor().html() },
      });
    },
    *clickEditor({ payload: e }, { put }) {
      const sentenceId = editor().click(e).sentenceId(e);
      if(sentenceId) {
        yield put({ type: 'home/saveAnalysisSentenceId', payload: sentenceId });
        yield put({ type: 'home/saveAnalysisFlag', payload: 2 });
      }
    },
    *startAnalysis(action, { put, select }) {
      if(!editor().text()) return;
      const { markers, moves, steps, document, sectionId } = yield select(state => state.home);
      const { analysis, body } = editor().analyze({ markers, moves, steps, document, sectionId });
      yield put({ type: 'home/saveDocumentBody', payload: body });
      yield put({ type: 'home/saveAnalysis', payload: analysis });
      yield put({ type: 'home/saveRightPanelTab', payload: 2 });
    },
    *fetchSentencesByMarkerId({ payload: markerId }, { call, put }) {
      const { data: sentences } = yield call(services.fetchSentencesByMarkerId, markerId);
      yield put({ type: 'home/saveSentencesByMarkerId', payload: { markerId, sentences } });
    },
    *fetchRsSentencesByMarker({ payload: { stepId, markerId, marker } }, { call, put }) {
      const { data: sentences } = yield call(services.fetchRsSentencesByMarker, stepId, marker);
      yield put({ type: 'home/saveRsSentencesByMarkerId', payload: { markerId, sentences } });
    },
    *fetchRsSentencesByStepId({ payload: stepId }, { call, put }) {
      const { data: sentences } = yield call(services.fetchRsSentencesByStepId, stepId);
      yield put({ type: 'home/saveRsSentencesByStepId', payload: { stepId, sentences } });
    },
    *clickAnalysisStep({ payload: stepId }, { select }) {
      const analysis = yield select(state => state.home.analysis);
      const sectionId = yield select(state => state.home.sectionId);
      const sentences = analysis[sectionId].steps[stepId];
      editor().highlightSentences(sentences);
    },
  },
  reducers: {
    saveAtInit(state, { payload }) {
      return { ...state, ...payload };
    },
    saveWritingModelId(state, { payload: writingModelId }) {
      return { ...state, writingModelId };
    },
    saveRightPanelTab(state, { payload: rightPanelTab }) {
      return { ...state, rightPanelTab };
    },
    saveSubjectAreaId(state, { payload: subjectAreaId }) {
      return { ...state, subjectAreaId };
    },
    saveSectionId(state, { payload: sectionId }) {
      return { ...state, sectionId };
    },
    savePopUpActive(state, { payload: popUpActive }) {
      return { ...state, popUpActive };
    },
    saveDocumentBody(state, { payload: body }) {
      return { 
        ...state,  
        document: {
          ...state.document,
          body,
        },
      };
    },
    saveDocumentBodyBySectionId(state, { payload: { sectionId, body } }) {
      return { 
        ...state,  
        document: {
          ...state.document,
          body: {
            ...state.document.body,
            [sectionId]: body,
          },
        },
      };
    },
    saveAnalysis(state, { payload: analysis }) {
      return { ...state, analysis };
    },
    saveAnalysisFlag(state, { payload: analysisFlag }) {
      return { ...state, analysisFlag };
    },
    saveAnalysisSentenceId(state, { payload: analysisSentenceId }) {
      return { ...state, analysisSentenceId };
    },
    saveGuideFlag(state, { payload: guideFlag }) {
      return { ...state, guideFlag };
    },
    saveCurrentMarkerId(state, { payload: currentMarkerId }) {
      return { ...state, currentMarkerId };
    },
    saveCurrentStepId(state, { payload: currentStepId }) {
      return { ...state, currentStepId };
    },
    saveCurrentMoveId(state, { payload: currentMoveId }) {
      return { ...state, currentMoveId };
    },
    saveSentencesByMarkerId(state, { payload: { markerId, sentences } }) {
      return { 
        ...state,  
        sentences: {
          ...state.sentences,
          [markerId]: sentences,
        },
      };
    },
    saveCurrentMdCodeId(state, { payload: currentMdCodeId }) {
      return { ...state, currentMdCodeId };
    },
    saveCurrentMdSubCodeId(state, { payload: currentMdSubCodeId }) {
      return { ...state, currentMdSubCodeId };
    },
    saveCurrentMdMarkerId(state, { payload: currentMdMarkerId }) {
      return { ...state, currentMdMarkerId };
    },
    saveCurrentRsTypeId(state, { payload: currentRsTypeId }) {
      return { ...state, currentRsTypeId };
    },
    saveCurrentRsStepId(state, { payload: currentRsStepId }) {
      return { ...state, currentRsStepId };
    },
    saveCurrentRsMarkerId(state, { payload: currentRsMarkerId }) {
      return { ...state, currentRsMarkerId };
    },
    saveRsSentencesByMarkerId(state, { payload: { markerId, sentences } }) {
      return { 
        ...state,  
        rsSentences: {
          ...state.rsSentences,
          marker: {
            ...state.rsSentences.marker,
            [markerId]: sentences,
          },
        },
      };
    },
    saveRsSentencesByStepId(state, { payload: { stepId, sentences } }) {
      return { 
        ...state,  
        rsSentences: {
          ...state.rsSentences,
          step: {
            ...state.rsSentences.step,
            [stepId]: sentences,
          },
        },
      };
    },
  },
  routes: {
    '/': { component: Home },
  },
};
