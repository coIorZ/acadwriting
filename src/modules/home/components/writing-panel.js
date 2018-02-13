import React, { Component } from 'react';
import styled from 'styled-components';

import DocumentSection from './document-section';
import SectionSwitcher from './section-switcher';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const DocumentWrapper = styled.div`
  margin: auto auto 0;
  padding: 0 3.5rem 40vh;
  max-width: 40rem;
  width: 100%;
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
  render() {
    const {
      document = {},
    } = this.props;

    const { section = 1, title = '' } = document;

    return (
      <Container>
        <SectionSwitcher {...this.props}/>
        <DocumentWrapper>
          <Title
            value={title} 
            placeholder='Type your title'
            onInput={this.inputTitle}
          />
          {
            section === 1 ?
              <DocumentSection intro
                placeHolder='Type or paste your Introduction here.'
                {...this.props}
              />
              : <DocumentSection 
                placeHolder='Type or paste your Literature Review here.'
                {...this.props}
              />
          }
        </DocumentWrapper>
      </Container>
    );
  }

  inputTitle = e => {
    this.props.inputDocumentTitle(e.target.value);
  }
}
