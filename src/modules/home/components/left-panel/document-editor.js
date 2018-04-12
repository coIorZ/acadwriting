import React, { Component } from 'react';
import { connect } from '98k';
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
  padding-bottom: 10rem;
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

const DocumentWrapper = styled.div`
  margin: auto auto 0;
  padding: 2rem 3rem .2rem;
  max-width: 45rem;
  width: 100%;
  height: calc(100vh - 11rem);
`;

class DocumentEditor extends Component {
  render() {
    const { document, sectionId, sections } = this.props;

    const section = sections[sectionId];
    const input = document.body[sectionId];

    // Here <Editor> is not managed by React, refer to lib/editor.js for details
    return (
      <DocumentWrapper>
        {section && (
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
            {(!input || input === '<p><br></p>') && <Placeholder>Type or paste your {section.label} here.</Placeholder>}
          </Container>
        )}
      </DocumentWrapper>
    );
  }

  inputText = () => {
    this.props.dispatch({ type: 'home/inputDocumentBody' });
  }

  pasteText = e => {
    this.props.dispatch({ type: 'home/pasteDocumentBody', payload: e });
  }

  clickEditor = e => {
    this.props.dispatch({ type: 'home/clickEditor', payload: e });
  }
}

export default connect(({ home: { document, sections, sectionId } }) => ({
  document, sections, sectionId,
}))(DocumentEditor);
