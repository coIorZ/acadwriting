import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { sProps } from '../../../../lib/utils';
import Switcher from './switcher';
import Analysis from './analysis';
import Guide from './guide';

const Container = styled.div`
  display: grid;
  grid-template-rows: 3rem auto;
  box-shadow: -25px 0 56px 0 rgba(241, 242, 250, .4);
`;

export default class FunctionPanel extends Component {
  render() {
    const { 
      rightPanelTab: tab,
    } = this.props;

    return (
      <Container>
        <Switcher {...sProps(this.props, 'rightPanelTab')}/>
        {tab === 1 && <Guide {...sProps(this.props, 'guideFlag', 'writingModelId', 'sentences', 'sectionId', 'subjectAreaId', 'moves', 'currentMoveId', 'steps', 'currentStepId', 'markers', 'currentMarkerId', 'mdCodes', 'mdSubCodes', 'mdMarkers', 'currentMdCodeId', 'currentMdSubCodeId', 'currentMdMarkerId', 'rsTypes', 'rsSteps', 'rsMarkers')}/>}
        {tab === 2 && <Analysis {...sProps(this.props, 'analysisFlag', 'analysis', 'moves', 'steps', 'markers', 'sectionId', 'analysisSentenceId')}/>}
      </Container>
    );
  }
}
