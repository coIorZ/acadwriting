import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 5rem;
  outline: none;
  border: none;
  overflow: auto;
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

const Editor = styled.div`
  position: relative;
  min-height: 200px;
  padding-bottom: 20vh;
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

export default class DocumentEditor extends Component {
  render() {
    const {
      placeHolder = '',
      document = {},
      section = {},
    } = this.props;

    const input = document.body[section.id];

    return (
      <Container>
        <Editor 
          id='editor' 
          className='editor'
          contentEditable={true}
          spellCheck={false}
          onInput={this.inputText}
          onPaste={this.pasteText}
          onClick={this.clickEditor}
        >
          <p><br/></p>
        </Editor>
        {(!input || input === '<p><br></p>') && <Placeholder>{placeHolder}</Placeholder>}
      </Container>
    );
  }

  inputText = () => {
    this.props.inputDocumentBody();
  }

  pasteText = e => {
    this.props.pasteDocumentBody(e);
  }

  clickEditor = e => {
    this.props.clickEditor(e);
  }
}
