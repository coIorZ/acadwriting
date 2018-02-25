import React, { Component } from 'react';
import styled from 'styled-components';
import rsr from 'react-string-replace';

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

const Editor = styled(ContentEditable)`
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

const Keyword = styled.span`
  border-bottom: 1px solid red;
`;

const Formatted = ({ input }) => (
  rsr(input, /(to)/g, (match, i) => (
    <Keyword key={i}>{match}</Keyword>
  ))
);

export default class DocumentEditor extends Component {
  render() {
    const {
      placeHolder = '',
      document = {},
      section = {},
    } = this.props;

    const { body } = document;
    const input = body[section.id] || '';

    return (
      <Container>
        <Editor
          html={input}
          onChange={this.inputText}
        >
          {input && <Formatted input={input}/>}
        </Editor>
        { !input && <Placeholder>{placeHolder}</Placeholder> }
      </Container>
    );
  }

  inputText = e => {
    this.props.inputDocumentBody(e.target.value);
  }
}
