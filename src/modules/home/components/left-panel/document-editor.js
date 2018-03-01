import React, { Component } from 'react';
import styled from 'styled-components';

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

const Editor = styled.div`
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
        {!input && <Placeholder>{placeHolder}</Placeholder>}
      </Container>
    );
  }

  inputText = () => {
    this.props.inputDocumentBody();
  }

  pasteText = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if(!text) return;
    const textArr = text.split('\n').filter(Boolean);
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    range.deleteContents();
    textArr.forEach((t, i) => {
      let node;
      if(i === 0) {
        node = document.createTextNode(t);
      } else {
        node = document.createElement('p');
        node.appendChild(document.createTextNode(t));
      }
      range.insertNode(node);
      range.setStartAfter(node.parentNode);
    });
    sel.empty();
    this.props.inputDocumentBody();
  }

  clickEditor = e => {
    this.props.clickEditor(e);
  }
}
