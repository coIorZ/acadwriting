import React, { Component } from 'react';
import styled from 'styled-components';

import DocumentSection from './document-section';
import SectionSwitcher from './section-switcher';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Placeholder = styled.div`
  height: 4rem;
`;

const DocumentWrapper = styled.div`
  margin: auto auto 0;
  padding: 0 3.5rem 40vh;
  max-width: 40rem;
  width: 100%;
  height: calc(100vh - 4rem);
  overflow: auto;
`;

const Title = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  margin: 1.7rem 0 1.15rem;
  width: 95%;
  outline: none;
  border: none;
  background: transparent;
  color: #1d2129;
  line-height: normal;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -.5px;
`;

export default class WritingPanel extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      document = {},
      section = null,
    } = this.props;

    const { title = '' } = document;

    return section && (
      <Container>
        <Placeholder/>
        <SectionSwitcher {...this.props}/>
        <DocumentWrapper>
          <Title
            value={title} 
            placeholder='Type your title'
            onInput={this.inputTitle}
          />
          <DocumentSection
            placeHolder={`Type or paste your ${section.text} here.`}
            {...this.props}
          />
        </DocumentWrapper>
      </Container>
    );
  }

  inputTitle = e => {
    this.props.inputDocumentTitle(e.target.value);
  }
}
