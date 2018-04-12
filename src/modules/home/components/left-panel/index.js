import React, { Component } from 'react';
import styled from 'styled-components';

import { sProps } from '../../../../lib/utils';
import Button from '../../../../components/button';
import ModelSubjectFilter from './model-subject-filter';
import DocumentEditor from './document-editor';
import SectionSwitcher from './section-switcher';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    height: 4rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

export default class WritingPanel extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Logo>
            <img src={require('../../../../images/NTU-logo-full-colour.png')}/>
          </Logo>
        </Header>
        <ModelSubjectFilter/>
        <SectionSwitcher/>
        <DocumentEditor/>
        <BtnContainer>
          <Button onClick={this.props.onAnalysis}>Analyze</Button>
        </BtnContainer>
      </Container>
    );
  }
}
