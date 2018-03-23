import React, { Component } from 'react';
import styled from 'styled-components'; 

const Container = styled.div`

`;

const Title = styled.div`

`;

const Structure = styled.div`

`;

export default class RhetoricalStructure extends Component {
  render() {
    const { label } = this.props.section;
    return (
      <Container>
        <Title>{label}</Title>
      </Container>
    );
  }
}
