import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0.2rem;
  top: 30%;
`;

const Switch = styled.div`
  writing-mode: vertical-lr;
  margin-bottom: 2rem;
  opacity: ${p => p.active ? 1 : 0.3};
  cursor: pointer;
`;

export default class SectionSwitcher extends Component {
  render() {
    const section = this.props.document.section;

    return (
      <Container>
        <Switch 
          active={section === 1}
          onClick={this.setSection.bind(this, 1)}
        >
          Introduction
        </Switch>
        <Switch 
          active={section === 2}
          onClick={this.setSection.bind(this, 2)}
        >
          Leterature Review
        </Switch>
      </Container>
    );
  }

  setSection = val => {
    this.props.setDocumentSection(val);
  }
}
