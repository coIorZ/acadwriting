import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 45%; 
`;

const StyledSwitch = styled.div`
  margin: .5rem 0;
  padding: .3rem .5rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f6ff;
  }
`;

const Switch = ({ label, onClick }) => (
  <StyledSwitch onClick={onClick}>{label}</StyledSwitch>
);

export default class Switcher extends Component {
  render() {
    return (
      <Container>
        <Switch label='guide' onClick={this.showPanel.bind(this, 1)}/>
        <Switch label='analysis' onClick={this.showPanel.bind(this, 2)}/>
      </Container>
    );
  }

  showPanel = val => {
    this.props.setRightPanelFlag(val);
  }
}
