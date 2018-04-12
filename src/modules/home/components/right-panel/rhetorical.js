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
`;

const MoveLabel = styled.span`
  cursor: pointer;
`;

const StepGroup = styled.div`
  padding-left: 2rem;
`;

const StyledStep = styled.div`
  margin: .2rem 0;
`;

const StepLabel = styled.span`
  cursor: pointer;
`;

const MarkerGroup = styled.div`
  padding-left: 2rem;
`;

const StyledMarker = styled.div`
  cursor: pointer;
`;

const Marker = ({ markers, stepId, markerId, onClick }) => {
  return markers[markerId] ? (
    <StyledMarker onClick={onClick.bind(this, stepId, markerId)}>{markers[markerId].label}</StyledMarker>
  ) : <div>loading marker...</div>;
};

class Step extends Component {
  state = {
    active: false,
  }

  componentDidMount() {
    if(this.props.currentStepId == this.props.stepId) {
      this.setState(() => ({
        active: true,
      }));
    }
  }

  render() {
    const {
      steps = {},
      markers = {},
      stepId,
    } = this.props;

    const step = steps[stepId];

    const { active } = this.state;

    return step ? (
      <StyledStep>
        <StepLabel onClick={this.toggleStep}>{step.label}</StepLabel>
        {active && (
          <MarkerGroup>
            {Object.keys(step.markers).map(markerId => (
              <Marker key={markerId} stepId={stepId} markerId={markerId} markers={markers} onClick={this.onClickMarker}/>
            ))}
          </MarkerGroup>
        )}
      </StyledStep>
    ) : <div>loading step...</div>;
  }

  toggleStep = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }

  onClickMarker = (stepId, markerId) => {
    this.props.dispatch({ type: 'home/saveGuideFlag', payload: 2 });
    this.props.dispatch({ type: 'home/saveCurrentMarkerId', payload: markerId });
    this.props.dispatch({ type: 'home/saveCurrentMoveId', payload: this.props.steps[stepId].moveId });
    this.props.dispatch({ type: 'home/saveCurrentStepId', payload: stepId });
    if(!this.props.sentences[markerId]) {
      this.props.dispatch({ type: 'home/fetchSentencesByMarkerId', payload: markerId });
    }
  }
}

class Move extends Component {
  state = {
    active: false,
  }

  componentDidMount() {
    if(this.props.currentMoveId == this.props.moveId) {
      this.setState(() => ({
        active: true,
      }));
    }
  }

  render() {
    const { 
      moveId,
      moves,
    } = this.props;

    const move = moves[moveId];

    const { active } = this.state;

    return move ? (
      <StyledMove>
        <MoveLabel onClick={this.toggleMove}>{move.label}</MoveLabel>
        {active && ( 
          <StepGroup>
            {Object.keys(move.steps).map(stepId => (
              <Step key={stepId} stepId={stepId} {...this.props}/>
            ))}
          </StepGroup>
        )}
      </StyledMove>
    ) : <div>loading move...</div>;
  }

  toggleMove = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }
}

class Rhetorical extends Component {
  render() {
    const {
      moves = {},
      sectionId,
    } = this.props;

    return (
      <Container>
        <MoveGroup>
          {Object.keys(moves).filter(moveId => moves[moveId].sectionId == sectionId).map(moveId => ( 
            <Move key={moveId} moveId={moveId} {...this.props}/>
          ))}
        </MoveGroup>
      </Container>
    );
  }
}

export default connect(({ home: { moves, steps, markers, sentences, currentMoveId, currentStepId, sectionId } }) => ({
  moves, steps, markers, sentences, currentMoveId, currentStepId, sectionId, 
}))(Rhetorical);
