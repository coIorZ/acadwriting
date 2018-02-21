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
      section = null,
    } = this.props;

    const { body } = document;

    return section && (
      <Container>
        <CE
          html={body[section.text] || ''}
          onChange={this.inputText}
        >
        </CE>
        { !body[section.text] && <Placeholder>{placeHolder}</Placeholder> }
      </Container>
    );
  }

  inputText = e => {
    const {
      section = null,
      inputDocumentBody,
    } = this.props;

    section && inputDocumentBody({
      section : section.text, 
      value   : e.target.value,
    });
  }
}
