import React, { Component } from 'react';
import { connect } from '98k';
import styled from 'styled-components';

import { sProps } from '../../../lib/utils';
import LeftPanel from '../components/left-panel';
import RightPanel from '../components/right-panel';

const Container = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100vh;
`;

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'home/fetchAtInit',
    });
  }

  render() {
    const active = this.props.popUpActive;

    return (
      <Container>
        <LeftPanel {...sProps(this.props, 'sections', 'sectionId', 'writingModels', 'writingModelId', 'subjectAreas', 'subjectAreaId', 'document')}/>
        <RightPanel {...sProps(this.props, 'rightPanelTab', 'guideFlag', 'writingModelId', 'sentences', 'sectionId', 'subjectAreaId', 'moves', 'currentMoveId', 'steps', 'currentStepId', 'markers', 'currentMarkerId', 'mdCodes', 'mdSubCodes', 'mdMarkers', 'analysisFlag', 'analysis', 'analysisSentenceId')}/>
      </Container>
    );
  }

  hidePopUp = () => {
    this.props.setPopUpActive(false);
  }
}

export default connect(state => state.home)(Home);
