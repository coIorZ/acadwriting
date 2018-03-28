import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas, getSections, getMoves, getMarkers, getSteps,
  getMdCodes, getMdSubCodes, getMdMarkers, getSentences,
  getDocument,
  getWritingModelId, getSubjectAreaId, getSectionId, 
  getCurrentMoveId, getCurrentStepId, getCurrentMarkerId,
  getPopUpActive,
  getRightPanelTab,
  getAnalysis, getAnalysisSentenceId, getAnalysisFlag,
  getGuideFlag,
} from '../ducks/selectors';

import LeftPanel from '../components/left-panel';
import RightPanel from '../components/right-panel';
import PopUp from '../../../components/pop-up';
import Info from '../components/left-panel/info';

const Container = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100vh;
`;

class Home extends Component {
  componentDidMount() {
    this.props.fetchWritingModels();
    this.props.fetchSubjectAreas();
    this.props.fetchMoves();
    this.props.fetchSteps();
    this.props.fetchMarkers();
    this.props.fetchMdCodes();
    this.props.fetchMdSubCodes();
    this.props.fetchMdMarkers();
  }

  render() {
    const active = this.props.popUpActive;

    return (
      <Container>
        <LeftPanel {...this.props}/>
        <RightPanel {...this.props}/>
        {active && (
          <PopUp {...this.props}>
            <Info {...this.props}/>
          </PopUp>
        )}
      </Container>
    );
  }
}

export default connect(
  state => ({
    writingModels      : getWritingModels(state),
    subjectAreas       : getSubjectAreas(state),
    sections           : getSections(state),
    moves              : getMoves(state),
    steps              : getSteps(state),
    markers            : getMarkers(state),
    mdCodes            : getMdCodes(state),
    mdSubCodes         : getMdSubCodes(state),
    mdMarkers          : getMdMarkers(state),
    sentences          : getSentences(state),
    document           : getDocument(state),
    writingModelId     : getWritingModelId(state),
    subjectAreaId      : getSubjectAreaId(state),
    sectionId          : getSectionId(state),
    currentMoveId      : getCurrentMoveId(state),
    currentStepId      : getCurrentStepId(state),
    currentMarkerId    : getCurrentMarkerId(state),
    popUpActive        : getPopUpActive(state),
    analysis           : getAnalysis(state),
    analysisSentenceId : getAnalysisSentenceId(state),
    rightPanelTab      : getRightPanelTab(state),
    analysisFlag       : getAnalysisFlag(state),
    guideFlag          : getGuideFlag(state),
  }),
  actions,
)(Home);
