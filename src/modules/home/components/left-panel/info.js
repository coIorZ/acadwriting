import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Title = styled.div`

`;

const Content = styled.div`

`;

export default class Info extends Component {
  render() {
    const { sections, infoFlag } = this.props;
    const section = sections[infoFlag] || {};

    return (
      <Container>
        <Title>{section.label}</Title>
        <Content>{section.description}</Content>
      </Container>
    );
  } 
}
