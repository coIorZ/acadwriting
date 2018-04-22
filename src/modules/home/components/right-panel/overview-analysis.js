import React, { Component } from 'react';
import { connect } from '98k';
import styled, { css } from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
`;

const MoveGroup = styled.div`
  padding: 0 2rem;
`;

const StyledMove = styled.div`
  padding: .5rem;
  margin: .5rem 0;
  font-weight: 500;
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
  margin: .2rem 0;
  cursor: pointer;
  ${p => p.matched && css`
    color: #f299a8;
  `}
`;

const Step = ({ step, analysis, onClick }) => {
  const matches = analysis.steps[step.id];
  const len = matches && matches.length;
  return (
    <StyledStep matched={len} onClick={onClick.bind(this, step.id)}>{`${step.label}${step.important ? '' : '(optional)'}${len ? `(${len})` : ''}`}</StyledStep>
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
      steps = {},
      onClickStep,
    } = this.props;

    const { active } = this.state;

    const mandotorySteps = [], optionalSteps = [];
    Object.keys(move.steps).forEach(stepId => {
      const step = steps[stepId];
      if (step.important) {
        mandotorySteps.push(step);
      } else {
        optionalSteps.push(step);
      }
    });

    const matches = analysis.moves[move.id];
    const len = matches && matches.length;

    return (
      <StyledMove active={active}>
        <MoveLabel matched={len} onClick={this.toggleMove}>{`${move.label}${len ? `(${len})` : ''}`}</MoveLabel>
        {active && (
          <StepGroup>
            {mandotorySteps.map(step => (
              <Step
                key={step.id}
                analysis={analysis}
                step={step}
                onClick={onClickStep}
              />
            ))}
            {optionalSteps.map(step => (
              <Step
                key={step.id}
                analysis={analysis}
                step={step}
                onClick={onClickStep}
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

class OverviewAnalysis extends Component {
  render() {
    const {
      moves = {},
      steps = {},
      analysis = {},
      sectionId,
    } = this.props;

    const sectionAnalysis = analysis[sectionId];

    return !sectionAnalysis ? (
      <div>
        <h2
          style={{
            border: '1px solid#xxeff5', textAlign: 'center', color: '#999', display: 'block',
            fontFamily: 'Baskerville, Baskerville Old,Hoefler Text,Face,Garamond, Times New Roman,serif',
            fontWeight: '400',
            letterSpacing: '3px',
            textIndent: '4px',
            fontSize: '1em',
            padding: '2.5em 0 3em'
          }}>Click <span style={{cursor: 'pointer'}} onClick={this.startAnalysis}>ANALYZE</span> Button To Start Analyzing</h2>
      </div >
    ) : (
        <Container>
          <MoveGroup>
            {Object.keys(moves).filter(moveId => moves[moveId].sectionId === sectionId).map(moveId => (
              <Move
                key={moveId}
                analysis={sectionAnalysis}
                steps={steps}
                move={moves[moveId]}
                onClickStep={this.clickStep}
              />
            ))}
          </MoveGroup>
        </Container>
      );
  }

  toggleMove = id => {
    this.setState(({ activeMoveId }) => {
      if (activeMoveId === id) return {
        activeMoveId: -1,
      };
      return {
        activeMoveId: id,
      };
    });
  }
  startAnalysis = () =>{
    this.props.dispatch({ type: 'home/startAnalysis' });
  }

  clickStep = id => {
    this.props.dispatch({ type: 'home/clickAnalysisStep', payload: id });
  }
}

export default connect(({ home: { moves, steps, analysis, sectionId } }) => ({
  moves, steps, analysis, sectionId,
}))(OverviewAnalysis);
