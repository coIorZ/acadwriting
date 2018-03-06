import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  overflow: auto;
`;

export default class SentenceAnalysis extends Component {
  render() {
    const {
      analysisSentenceId,
      analysis,
    } = this.props;

    const sentences = analysis.sentences;

    return (
      <Container>

      </Container>
    );
  }
}
