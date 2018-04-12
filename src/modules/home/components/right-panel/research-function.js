import React, { Component } from 'react';
import { connect } from '98k';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
`;

const RsTypeGroup = styled.div`
  padding: 0 2rem;
`;

const StyledRsType = styled.div`
  padding: .5rem;
  margin: .5rem 0;
`;

const RsTypeLabel = styled.span`
  cursor: pointer;
`;

const RsStepGroup = styled.div`
  padding-left: 2rem;
`;

const StyledRsStep = styled.div`
  margin: .2rem 0;
`;

const RsStepLabel = styled.div`
  cursor: pointer;
`;

const RsMarkerGroup = styled.div`
  padding-left: 2rem;
`;

const StyledRsMarker = styled.div`
  cursor: pointer;
`;

const RsMarker = ({ rsMarkers, rsStepId, rsMarkerId, onClick }) => {
  return rsMarkers[rsMarkerId] ? (
    <StyledRsMarker onClick={onClick.bind(this, rsStepId, rsMarkerId)}>{rsMarkers[rsMarkerId].label}</StyledRsMarker>
  ) : <div>loading rsMarker...</div>;
};

class RsStep extends Component {
  state = {
    active: false,
  }

  render() {
    const {
      rsSteps = {},
      rsStepId,
      rsMarkers,
    } = this.props;

    const rsStep = rsSteps[rsStepId];

    const { active } = this.state;

    return rsStep ? (
      <StyledRsStep>
        <RsStepLabel onClick={this.toggleStep}>{rsStep.label}</RsStepLabel>
        {active && (
          <RsMarkerGroup>
            {Object.keys(rsStep.rsMarkers).map(rsMarkerId => (
              <RsMarker key={rsMarkerId} rsMarkers={rsMarkers} rsStepId={rsStepId} rsMarkerId={rsMarkerId} onClick={this.onClickMarker}/>
            ))}
          </RsMarkerGroup>
        )}
      </StyledRsStep>
    ) : <div>loading rsStep...</div>;
  }

  toggleStep = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
    const { rsSteps, rsStepId } = this.props;
    if(!Object.keys(rsSteps[rsStepId].rsMarkers).length) {
      this.props.dispatch({ type: 'home/saveGuideFlag', payload: 2 });
      this.props.dispatch({ type: 'home/saveCurrentRsTypeId', payload: this.props.rsSteps[rsStepId].rsTypeId });
      this.props.dispatch({ type: 'home/saveCurrentRsStepId', payload: rsStepId });
      this.props.dispatch({ type: 'home/saveCurrentRsMarkerId', payload: -1 });
      if(!this.props.rsSentences.step[rsStepId]) {
        this.props.dispatch({ type: 'home/fetchRsSentencesByStepId', payload: rsStepId });
      }
    }
  }

  onClickMarker = (rsStepId, rsMarkerId) => {
    this.props.dispatch({ type: 'home/saveGuideFlag', payload: 2 });
    this.props.dispatch({ type: 'home/saveCurrentRsMarkerId', payload: rsMarkerId });
    this.props.dispatch({ type: 'home/saveCurrentRsTypeId', payload: this.props.rsSteps[rsStepId].rsTypeId });
    this.props.dispatch({ type: 'home/saveCurrentRsStepId', payload: rsStepId });
    if(!this.props.rsSentences.marker[rsMarkerId]) {
      this.props.dispatch({ 
        type    : 'home/fetchRsSentencesByMarker',
        payload : { 
          stepId   : rsStepId, 
          markerId : rsMarkerId,
          marker   : this.props.rsMarkers[rsMarkerId].label, 
        }, 
      });
    }
  }
}

class RsType extends Component {
  state = {
    active: false,
  }

  componentDidMount() {
    if(this.props.currentRsTypeId == this.props.rsTypeId) {
      this.setState(() => ({
        active: true,
      }));
    }
  }

  render() {
    const {
      rsTypes = {},
      rsTypeId,
    } = this.props;

    const rsType = rsTypes[rsTypeId];

    const { active } = this.state;

    return rsType ? (
      <StyledRsType>
        <RsTypeLabel onClick={this.toggleType}>{rsType.label}</RsTypeLabel>
        {active && (
          <RsStepGroup>
            {Object.keys(rsType.rsSteps).map(rsStepId => (
              <RsStep key={rsStepId} rsStepId={rsStepId} {...this.props}/>
            ))}
          </RsStepGroup>
        )}
      </StyledRsType>
    ) : <div>loading rsType...</div>;
  }

  toggleType = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }
}

class Rsfunc extends Component {
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

export default connect(({ home: { rsTypes, rsSteps, rsMarkers, currentRsTypeId, currentRsStepId, currentRsMarkerId, sectionId, rsSentences } }) => ({
  rsTypes, rsSteps, rsMarkers, currentRsTypeId, currentRsStepId, currentRsMarkerId, sectionId, rsSentences,
}))(Rsfunc);
