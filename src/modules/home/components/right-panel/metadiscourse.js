import React, { Component } from 'react';
import styled from 'styled-components';

import { sProps } from '../../../../lib/utils';

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
`;

const MdCodeGroup = styled.div`
  padding: 0 2rem;
`;

const StyledMdCode = styled.div`
  padding: .5rem;
  margin: .5rem 0;
`;

const MdCodeLabel = styled.div`
  cursor: pointer;
`;

const MdSubCodeGroup = styled.div`
  padding: 0 2rem;
`;

const StyledMdSubCode = styled.div`
  margin: .2rem 0;
`;

const MdSubCodeLabel = styled.div`
  cursor: pointer;
`;

const MdMarkerGroup = styled.div`
  padding: 0 2rem;
`;

const StyledMdMarker = styled.div`
  cursor: pointer;
`;

const MdMarker = ({ mdSubCodeId, mdMarkerId, mdMarkers, onClick }) => {
  return mdMarkers[mdMarkerId] ? (
    <StyledMdMarker onClick={onClick.bind(this, mdSubCodeId, mdMarkerId)}>{mdMarkers[mdMarkerId].marker}</StyledMdMarker>
  ) : <div>loding markers</div>;
};

class MdSubCode extends Component {
  state = {
    active: false,
  }

  componentDidMount() {
    if(this.props.currentMdSubCodeId == this.props.mdSubCodeId) {
      this.setState(() => ({
        active: true,
      }));
    }
  }

  render() {
    const {
      mdSubCodes, 
      mdSubCodeId,
      mdMarkers,
    } = this.props;

    const mdSubCode = mdSubCodes[mdSubCodeId];

    const { active } = this.state;

    return mdSubCode ? (
      <StyledMdSubCode>
        <MdSubCodeLabel onClick={this.toggleMdSubCode}>{mdSubCode.label}</MdSubCodeLabel>
        {active && (
          <MdMarkerGroup>
            {Object.keys(mdSubCodes).map(mdMarkerId => (
              <MdMarker key={mdMarkerId} mdMarkerId={mdMarkerId} mdMarkers={mdMarkers} onClick={this.onClickMdMarker}/>
            ))}
          </MdMarkerGroup>
        )}
      </StyledMdSubCode>
    ) : <div>loading mdSubCode...</div>;
  }

  toggleMdSubCode = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }

  onClickMdMarker = (mdSubCodeId, mdMarkerId) => {
    this.props.dispatch({ type: 'home/saveGuideFlag', payload: 2 });
    this.props.dispatch({ type: 'home/saveCurrentMdMarkerId', payload: mdMarkerId });
    this.props.dispatch({ type: 'home/saveCurrentMdSubCodeId', payload: mdSubCodeId });
    this.props.dispatch({ type: 'home/saveCurrentMdCodeId', payload: this.props.mdSubCodes[mdSubCodeId].mdCodeId });
  }
}

class MdCode extends Component {
  state = {
    active: false,
  }

  componentDidMount() {
    if(this.props.currentMdCodeId == this.props.mdCodeId) {
      this.setState(() => ({
        active: true,
      }));
    }
  }

  render() {
    const {
      mdCodeId,
      mdCodes,
    } = this.props;

    const mdCode = mdCodes[mdCodeId];

    const { active } = this.state;

    return mdCode ? (
      <StyledMdCode>
        <MdCodeLabel onClick={this.toggleMdCode}>{mdCode.label}</MdCodeLabel>
        {active && ( 
          <MdSubCodeGroup>
            {Object.keys(mdCode.mdSubCodes).map(mdSubCodeId => (
              <MdSubCode key={mdSubCodeId} mdSubCodeId={mdSubCodeId} {...this.props}/>
            ))}
          </MdSubCodeGroup>
        )} 
      </StyledMdCode>
    ) : <div>loading mdCode...</div>;
  }
  

  toggleMdCode = () => {
    this.setState(prev => ({
      active: !prev.active,
    }));
  }
}

export default class Metadiscourse extends Component {
  render() {
    const {
      mdCodes = {},
    } = this.props;
    
    return(
      <Container>
        <MdCodeGroup>
          {Object.keys(mdCodes).map(mdCodeId => (
            <MdCode key={mdCodeId} mdCodeId={mdCodeId} {...sProps(this.props, 'mdCodes', 'mdSubCodes', 'mdMarkers')}/>
          ))}
        </MdCodeGroup>
      </Container>
    );
  }
l}
