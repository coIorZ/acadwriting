import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 30%;
`;

const Switch = styled.div`
  writing-mode: vertical-lr;
  padding: 1rem 0.3rem 1rem .1rem;
  border: 1px solid #888;
  border-left: none;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
  opacity: 0.3;
  background-color: #fff;
  ${p => p.active && css`
    opacity: 1;
    background-color: #ccc;
  `}
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
