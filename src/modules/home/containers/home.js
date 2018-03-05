import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas, getSections, getMoves, getMarkers,
  getDocument, getSection,
  getFunctionPanelStatus,
  getWritingModelId, getSubjectAreaId,
  getPopUpActive,
  getRightPanelFlag,
  getAnalysis,
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
    this.props.fetchMarkers();
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
    writingModels       : getWritingModels(state),
    subjectAreas        : getSubjectAreas(state),
    sections            : getSections(state),
    moves               : getMoves(state),
    markers             : getMarkers(state),
    section             : getSection(state),
    document            : getDocument(state),
    functionPanelStatus : getFunctionPanelStatus(state),
    writingModelId      : getWritingModelId(state),
    subjectAreaId       : getSubjectAreaId(state),
    popUpActive         : getPopUpActive(state),
    rightPanelFlag      : getRightPanelFlag(state),
    analysis            : getAnalysis(state),
  }),
  actions,
)(Home);
