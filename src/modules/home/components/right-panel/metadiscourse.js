import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div``;

const MdCodeGroup = styled.div``;

const StyledMdCode = styled.div``;

const MdCodeLabel = styled.div``;

const MdSubCodeGroup = styled.div``;

const StyledMdSubCode = styled.div``;

const MdSubCodeLabel = styled.div``;

const MdMarkerGroup = styled.div``;

const StyledMdMarker = styled.div``;

const MdMarker = ({ mdMarkerId, mdMarkers }) => {
  return mdMarkers[mdMarkerId] ? (
    <StyledMdMarker>{mdMarkers[mdMarkerId].marker}</StyledMdMarker>
  ) : <div>loding markers</div>;
};

class MdSubCode extends Component {
  render() {
    const {
      mdSubCodes, 
      mdSubCodeId,
      mdMarkers,
    } = this.props;

    const mdSubCode = mdSubCodes[mdSubCodeId];

    return(
      <StyledMdSubCode>
        <MdSubCodeLabel>{mdSubCode.label}</MdSubCodeLabel>
        <MdMarkerGroup>
          {Object.keys(mdSubCodes).map(mdMarkerId => (
            <MdMarker mdMarkerId={mdMarkerId} mdMarkers={mdMarkers}/>
          ))}
        </MdMarkerGroup>
      </StyledMdSubCode>
    );
  }
}

class MdCode extends Component {
  render() {
    const {
      mdCodeId,
      mdCodes,
    } = this.props;

    const mdCode = mdCodes[mdCodeId];

    return(
      <StyledMdCode>
        <MdCodeLabel>{mdCode.label}</MdCodeLabel>
        <MdSubCodeGroup>
          {Object.keys(mdCode.mdSubCodes).map(mdSubCodeId => (
            <MdSubCode mdSubCodeId={mdSubCodeId} {...this.props}/>
          ))}
        </MdSubCodeGroup>
      </StyledMdCode>
    );
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
            <MdCode mdCodeId={mdCodeId} {...this.props}/>
          ))}
        </MdCodeGroup>
      </Container>
    );
  }
l}
