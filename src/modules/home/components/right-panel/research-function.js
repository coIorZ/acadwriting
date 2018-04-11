import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const RsTypeGroup = styled.div``;

const StyledRsType = styled.div``;

const RsTypeLabel = styled.span``;

const RsStepGroup = styled.div``;

const StyledRsStep = styled.div``;

const RsStepLabel = styled.div``;

const RsMarkerGroup = styled.div``;

const StyledRsMarker = styled.div``;

const RsMarker = ({ rsMarkers , rsMarkerId }) => {
  return rsMarkers[rsMarkerId] ? (
    <StyledRsMarker>{rsMarkers[rsMarkerId].label}</StyledRsMarker>
  ) : <div>loading rsMarker...</div>;
};

class RsStep extends Component {
  render() {
    const {
      rsSteps = {},
      rsStepId,
    } = this.props;

    const rsStep = rsSteps[rsStepId];

    return rsStep ? (
      <StyledRsStep>
        <RsStepLabel>{rsStep.label}</RsStepLabel>
        <RsMarkerGroup>
          {Object.keys(rsStep.rsMarkers).map(rsMarkerId => (
            <RsMarker key={rsMarkerId} rsMarkerId={rsMarkerId} {...this.props}/>
          ))}
        </RsMarkerGroup>
      </StyledRsStep>
    ) : <div>loading rsStep...</div>;
  }
}

class RsType extends Component {
  render() {
    const {
      rsTypes = {},
      rsTypeId,
    } = this.props;

    const rsType = rsTypes[rsTypeId];

    return rsType ? (
      <StyledRsType>
        <RsTypeLabel>{rsType.label}</RsTypeLabel>
        <RsStepGroup>
          {Object.keys(rsType.rsSteps).map(rsStepId => (
            <RsStep key={rsStepId} rsStepId={rsStepId} {...this.props}/>
          ))}
        </RsStepGroup>
      </StyledRsType>
    ) : <div>loading rsType...</div>;
  }
}

export default class Rsfunc extends Component {
  render() {
    const {
      rsTypes = {},
      sectionId,
    } = this.props;
    return (
      <Container>
        <RsTypeGroup>
          {Object.keys(rsTypes).filter(rsTypeId => rsTypes[rsTypeId].sectionId == sectionId).map(rsTypeId => (
            <RsType key={rsTypeId} rsTypeId={rsTypeId} {...this.props}/>
          ))}
        </RsTypeGroup>
      </Container>
    );
  }
}
