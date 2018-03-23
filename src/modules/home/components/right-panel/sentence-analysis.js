import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { LinkButton } from '../../../../components/button';

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  padding: 1rem;
`;

const MatchGroup = styled.div`
  margin: 1rem 0;
`;

const StyledMatch = styled.div`
  margin: 1rem 0;
`;

class Match extends Component {
  render() {
    const {
      matched,
      moves,
      markers,
    } = this.props;

    const { markerId, stepId, moveId } = matched;

    return (
      <StyledMatch>
        <div>move: {moves[moveId].label}</div>
        <div>step: {moves[moveId].steps[stepId].label}</div>
        <div>pattern: {markers[markerId].label}</div>
      </StyledMatch>
    );
  }
}

export default class SentenceAnalysis extends Component {
  render() {
    const {
      analysisSentenceId,
      analysis,
      sectionId,
    } = this.props;

    const matches = analysis[sectionId].sentences[analysisSentenceId];

    return (
      <Container>
        <LinkButton onClick={this.back}>Back to overview</LinkButton>
        {
          matches && matches.length ?
            <MatchGroup>
              {matches.map((match, index) => (
                <Match 
                  key={index}
                  matched={match} 
                  {...this.props}
                />
              ))}
            </MatchGroup>
            : <div>No matches</div>
        }
      </Container>
    );
  }

  back = () => {
    this.props.setAnalysisFlag(1);
  }
}
