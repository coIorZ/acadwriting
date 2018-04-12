import React, { Component } from 'react';
import { connect } from '98k';
import styled from 'styled-components';

import { sProps } from '../../../lib/utils';
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
    this.props.dispatch({ type: 'home/fetchAtInit' });
  }

  render() {
    const { active, sections, sectionId } = this.props;

    return (
      <Container>
        <LeftPanel onAnalysis={this.startAnalysis}/>
        <RightPanel {...sProps(this.props, 'rightPanelTab', 'guideFlag', 'writingModelId', 'sentences', 'sectionId', 'subjectAreaId', 'moves', 'currentMoveId', 'steps', 'currentStepId', 'markers', 'currentMarkerId', 'mdCodes', 'mdSubCodes', 'mdMarkers', 'analysisFlag', 'analysis', 'analysisSentenceId', 'currentMdCodeId', 'currentMdSubCodeId', 'currentMdMarkerId', 'rsTypes', 'rsSteps', 'rsMarkers')}/>
        {active && (
          <PopUp onClickMask={this.hidePopUp}>
            <Info sections={sections} sectionId={sectionId}/>
          </PopUp>
        )}
      </Container>
    );
  }

  hidePopUp = () => {
    this.props.dispatch({ type: 'home/savePopUpActive', payload: false });
  }

  startAnalysis = () => {
    this.props.dispatch({ type: 'home/startAnalysis' });
  }
}

export default connect(({ home: { popUpActive, sections, sectionId } }) => ({
  active: popUpActive,
  sections,
  sectionId,
}))(Home);
