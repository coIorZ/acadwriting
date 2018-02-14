import React, { Component } from 'react';
import styled from 'styled-components';

import ContentEditable from '../../../components/content-editable';

const Container = styled.div`
  position: relative;
  min-height: 5rem;
  outline: none;
  border: none;
  font-size: 1.125rem;
  color: #312b38;
  line-height: 2rem;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;

  & p {
    margin: 0;
    padding: 0 0 1rem;
  }
`;

const CE = styled(ContentEditable)`
  position: relative;
  min-height: 200px;
  outline: none;
  border: none;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  color: #908d94;
  pointer-events: none;
  user-select: none;
`;

export default class Section extends Component {
  render() {
    const {
      placeHolder = '',
      document = {},
    } = this.props;

    const { introduction, litreview, section } = document;

    const input = section === 1 ? introduction : litreview;

    return (
      <Container>
        <CE
          html={input}
          onChange={this.inputText}
        >
          <p>{introduction}</p>
        </CE>
        { !input && <Placeholder>{placeHolder}</Placeholder> }
      </Container>
    );
  }

  inputText = e => {
    const {
      document,
      inputDocumentIntro,
      inputDocumentLitreview,
    } = this.props;

    const section = document.section;

    if(section === 1) {
      inputDocumentIntro(e.target.value);
    } else if(section === 2) {
      inputDocumentLitreview(e.target.value);
    }
  }
}
