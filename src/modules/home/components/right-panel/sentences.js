import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div``;

export default class Sentences extends Component {
  render() {
    const {
      sentences,
      markerId,
    } = this.props;

    const sentencesByMarkerId = sentences[markerId];

    return sentencesByMarkerId ? (
      <Container>
        {Object.keys(sentencesByMarkerId).map(sentenceId => {
          const sentence = sentencesByMarkerId[sentenceId];
          return <div>{sentence.text}</div>;
        })}
      </Container>
    ) : <div>loading sentences...</div>;
  }
}
