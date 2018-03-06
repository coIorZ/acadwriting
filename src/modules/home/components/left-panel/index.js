import React, { Component } from 'react';
import styled from 'styled-components';

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

const DocumentWrapper = styled.div`
  margin: auto auto 0;
  padding: 2rem 3rem .2rem;
  max-width: 45rem;
  width: 100%;
  height: calc(100vh - 11rem);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

export default class WritingPanel extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      sections = {},
      sectionId,
    } = this.props;

    const section = sections[sectionId];

    return (
      <Container>
        <Header>
          <Logo>
            <img src={require('../../../../images/NTU-logo-full-colour.png')}/>
          </Logo>
        </Header>
        <ModelSubjectFilter {...this.props}/>
        <SectionSwitcher {...this.props}/>
        <DocumentWrapper>
          {section && (
            <DocumentEditor
              placeHolder={`Type or paste your ${section.text} here.`}
              {...this.props}
            />
          )}
        </DocumentWrapper>
        <BtnContainer>
          <Button onClick={this.startAnalysis}>Analyze</Button>
        </BtnContainer>
      </Container>
    );
  }

  inputTitle = e => {
    this.props.inputDocumentTitle(e.target.value);
  }

  startAnalysis = () => {
    this.props.startAnalysis();
  }
}
