import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div``;

const MoveGroup = styled.div``;

const StyledMove = styled.div``;

const MoveLabel = styled.span``;

const StepGroup = styled.div``;

const StyledStep = styled.div``;

const StepLabel = styled.span``;

const MarkerGroup = styled.div``;

const StyledMarker = styled.div``;

const Marker = ({ markers, markerId, onClick }) => {
  return (
    <StyledMarker onClick={onClick.bind(this, markerId)}>{markers[markerId].label}</StyledMarker>
  );
};

class Step extends Component {
  render() {
    const {
      steps,
      stepId,
      markers,
    } = this.props;

    const step = steps[stepId];

    return (
      <StyledStep>
        <StepLabel>{step.label}</StepLabel>
        <MarkerGroup>
          {Object.keys(step.markers).map(markerId => (
            <Marker markerId={markerId} markers={markers} onClick={this.onClickMarker}/>
          ))}
        </MarkerGroup>
      </StyledStep>
    );
  }

  onClickMarker = id => {

  }
}

class Move extends Component {
  render() {
    const { 
      moveId,
      moves,
    } = this.props;

    const move = moves[moveId]

    return(
      <StyledMove>
        <MoveLabel>{move.label}</MoveLabel>
        <StepGroup>
          {Object.keys(move.steps).map(stepId => (
            <Step stepId={stepId} {...this.props}/>
          ))}
        </StepGroup>
      </StyledMove>
    );
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
