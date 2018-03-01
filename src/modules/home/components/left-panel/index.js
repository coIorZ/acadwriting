import React, { Component } from 'react';
import styled from 'styled-components';

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
  padding: 2rem 3rem 40vh;
  max-width: 45rem;
  width: 100%;
  height: calc(100vh - 4rem);
  overflow: auto;
`;

export default class WritingPanel extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      section = null,
    } = this.props;

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
      </Container>
    );
  }

  inputTitle = e => {
    this.props.inputDocumentTitle(e.target.value);
  }
}
