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
    const { label, description } = this.props.section;

    return (
      <Container>
        <Title>{label}</Title>
        <Content>{description.split('$$n$$').map(t => (
          <p>{t}</p>
        ))}</Content>
      </Container>
    );
  } 
}
