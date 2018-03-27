import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div``;

const MoveGroup = styled.div``;

const StyledMove = styled.div`
  cursor: pointer;
`;

const MoveLabel = styled.span`
`;

const StepGroup = styled.div`
  padding-left: 1rem;
`;

const StyledStep = styled.div`
  cursor: pointer;
`;

const StepLabel = styled.span`
`;

const MarkerGroup = styled.div`
  padding-left: 1rem;
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
              <Marker stepId={stepId} markerId={markerId} markers={markers} onClick={this.onClickMarker}/>
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
    this.props.setGuideFlag(2);
    this.props.setCurrentMarkerId(markerId);
    this.props.setCurrentMoveId(this.props.steps[stepId].moveId);
    this.props.setCurrentStepId(stepId);
    if(!this.props.sentences[markerId]) {
      this.props.fetchSentencesByMarkerId(markerId);
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
              <Step stepId={stepId} {...this.props}/>
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

export default class Rhetorical extends Component {
  render() {
    const {
      moves = {},
      sectionId,
    } = this.props;

    return (
      <Container>
        <MoveGroup>
          {Object.keys(moves).filter(moveId => moves[moveId].sectionId == sectionId).map(moveId => ( 
            <Move moveId={moveId} {...this.props}/>
          ))}
        </MoveGroup>
      </Container>
    );
  }
}
