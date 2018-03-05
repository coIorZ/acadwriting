import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Switcher from './switcher';
import Analysis from './analysis';

const Container = styled.div`
  position: relative;
  height: 100%;
  box-shadow: -25px 0 56px 0 rgba(241, 242, 250, .4);
`;

export default class FunctionPanel extends Component {
  render() {
    const { 
      rightPanelFlag: flag,
      writingModelId,
    } = this.props;

    return (
      <Container>
        <Switcher {...this.props}/>
        {flag == 3 && <Analysis {...this.props}/>}
      </Container>
    );
  }
}
