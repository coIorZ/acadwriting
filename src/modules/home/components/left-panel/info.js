import React, { Component } from 'react';
import styled from 'styled-components';

import shouldUpdate from '../../../../lib/shouldUpdate';

const Container = styled.div`

`;

const Title = styled.div`

`;

const Content = styled.div`

`;

export default class Info extends Component {
  shouldComponentUpdate(nextProps) {
    return shouldUpdate([
      'sections', 'sectionId',
    ], this.props, nextProps);
  }

  render() {
    const { sections, sectionId } = this.props;
    const section = sections[sectionId];

    return !section ? null : (
      <Container>
        <Title>{section.label}</Title>
        <Content>{section.description.split('$$n$$').map((t, i) => (
          <p key={i}>{t}</p>
        ))}</Content>
      </Container>
    );
  } 
}
