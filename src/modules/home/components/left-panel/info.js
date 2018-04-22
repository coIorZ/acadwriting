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
    const { sections, sectionId } = this.props;
    const section = sections[sectionId];

    return !section ? null : (
      <Container style={{ padding: '25px', borderRadius: '40px' }}>
        <Title style={{ fontFamily: 'FANTASY', fontSize: '30px' }}>{section.label}</Title>
        <Content >{section.description.split('$$n$$').map((t, i) => (
          <p key={i}>{t}</p>
        ))}</Content>
      </Container>
    );
  }
}
