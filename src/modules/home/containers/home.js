import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas, getSections,
  getDocument, getSection,
  getFunctionPanelStatus,
  getWritingModelId, getSubjectAreaId,
  getPopUpActive,
  getInfoFlag,
} from '../ducks/selectors';

import LeftPanel from '../components/left-panel';
import RightPanel from '../components/right-panel';
import PopUp from '../../../components/pop-up';
import Info from '../components/left-panel/info';

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`;

class Home extends Component {
  componentDidMount() {
    this.props.fetchWritingModels();
    this.props.fetchSubjectAreas();
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
    section             : getSection(state),
    document            : getDocument(state),
    functionPanelStatus : getFunctionPanelStatus(state),
    writingModelId      : getWritingModelId(state),
    subjectAreaId       : getSubjectAreaId(state),
    popUpActive         : getPopUpActive(state),
    infoFlag            : getInfoFlag(state),
  }),
  actions,
)(Home);
