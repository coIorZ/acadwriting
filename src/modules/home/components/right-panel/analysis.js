import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  overflow: auto;
`;

const StyledMove = styled.div`
  margin: .5rem 0;
  font-weight: 700;
`;

const MoveLabel = styled.div`
  cursor: pointer;
  ${p => p.matched && css`
    color: #f299a8;
  `}
`;

const StepGroup = styled.div`
  font-weight: 100;
  padding-left: 2rem;
`;

const StyledStep = styled.div`
  cursor: pointer;
  ${p => p.matched && css`
    color: #f299a8;
  `}
`;

const Step = ({ step, analysis }) => {
  const matches = analysis.steps[step.id];
  const len = matches && matches.length;
  return (
    <StyledStep matched={len}>{`${step.label}${step.important ? '' : '(optional)'}${len ? `(${len})` : ''}`}</StyledStep>
  );
};

class Move extends Component {
  state = {
    active: false,
  }

  render() {
    const {
      analysis = {},
      move = {},
    } = this.props;

    const { active } = this.state;

    const matches = analysis.moves[move.id];
    const len = matches && matches.length;

    return (
      <StyledMove>
        <MoveLabel matched={len} onClick={this.toggleMove}>{`${move.label}${len ? `(${len})` : ''}`}</MoveLabel>
        {active && (
          <StepGroup>
            {Object.keys(move.steps).map(stepId => (
              <Step 
                key={stepId}
                analysis={analysis} 
                step={move.steps[stepId]}
              />
            ))}
          </StepGroup>
        )}
      </StyledMove>
    );
  }

  toggleMove = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }
}

export default class Analysis extends Component {
  render() {
    const {
      moves = {},
      analysis = {},
      sectionId,
    } = this.props;

    const sectionAnalysis = analysis[sectionId];

    return !sectionAnalysis ? (
      <div>Click ANALYZE button to start analyzing</div>
    ) : (
      <Container>
        {Object.keys(moves).filter(moveId => moves[moveId].sectionId === sectionId).map(moveId => (
          <Move 
            key={moveId}
            analysis={sectionAnalysis}
            move={moves[moveId]}
          />
        ))}
      </Container>
    );
  }

  toggleMove = id => {
    this.setState(({ activeMoveId }) => {
      if(activeMoveId === id) return {
        activeMoveId: -1,
      };
      return {
        activeMoveId: id,
      };
    });
  }
}
