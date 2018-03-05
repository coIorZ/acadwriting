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
  ${p => p.matched && css`
    color: #f299a8;
  `}
`;

const StepGroup = styled.div`
  font-weight: 100;
  padding-left: 2rem;
`;

const StyledStep = styled.div`
  ${p => p.matched && css`
    color: #f299a8;
  `}
`;

const Step = ({ step, analysis }) => {
  const matches = analysis.steps[step.id];
  const len = matches && matches.length;
  return (
    <StyledStep matched={len}>{`${step.label}${len ? `(${len})` : ''}`}</StyledStep>
  );
};

const Move = ({ analysis, move, active, onClick }) => {
  const matches = analysis.moves[move.id];
  const len = matches && matches.length;
  return (
    <StyledMove>
      <MoveLabel matched={len} onClick={onClick}>{`${move.label}${len ? `(${len})` : ''}`}</MoveLabel>
      {active && (
        <StepGroup>
          {Object.keys(move.steps).map(stepId => (
            <Step analysis={analysis} step={move.steps[stepId]}/>
          ))}
        </StepGroup>
      )}
    </StyledMove>
  );
};

export default class Analysis extends Component {
  state = {
    activeMoveId : -1,
    activeStepId : -1,
  }

  render() {
    const {
      moves = {},
      analysis = {},
      document = {},
    } = this.props;

    const {
      activeMoveId,
    } = this.state;

    const sectionId = document.sectionId;
    const sectionAnalysis = analysis[sectionId];

    return !sectionAnalysis ? (
      <div>Click ANALYZE button to start analyzing</div>
    ) : (
      <Container>
        {Object.keys(moves).filter(moveId => moves[moveId].sectionId === sectionId).map(moveId => (
          <Move 
            analysis={sectionAnalysis}
            move={moves[moveId]}
            active={moveId === activeMoveId}
            onClick={this.toggleMove.bind(this, moveId)}
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
