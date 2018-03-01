import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { LinkButton } from '../../../../components/button';

const Container = styled.div`
  position: relative;
  width: 0;
  height: 100%;
  opacity: ${p => p.active ? 1 : 0};
  width: ${p => p.active ? '90%' : 0};
  ${p => !p.active && css`
    pointer-events: none; 
  `}
  transition: width .5s, opacity .5s;
`;

const HideBtnContainer = styled.div`
  position: absolute;
  top: 1rem;
  transition: transform .3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const HideBtn = ({ onClick }) => (
  <HideBtnContainer>
    <LinkButton label='hide assistant' onClick={onClick}/>
  </HideBtnContainer>
);

const Placeholder = styled.div`
  height: 2rem;
`;

export default class FunctionPanel extends Component {
  render() {
    const active = this.props.functionPanelStatus.active;

    return (
      <Container active={active}>
        <HideBtn onClick={this.hidePanel}/>
        <Placeholder/>
      </Container>
    );
  }

  renderContent = () => {
    const {
      writingModelId,
      functionPanelStatus = {},
    } = this.props;

    const { flag } = functionPanelStatus;

    return <div></div>;
    // flag > 0 when Models or Subjects Tabs in sidebar are clicked, show selection
    //if(flag > 0) return <ModelSubjectSelect {...this.props}/>;
  }

  hidePanel = () => {
    this.props.setFunctionPanelActive(false);
  }
}
