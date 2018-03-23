import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  border-bottom:  1px solid #f4f5f7;
  display:  flex;
  flex-wrap: wrap;
  align-items: flex-end;
  padding-left : 1rem; 
  font-size: 1rem;
  text-transform: capitalize;
`;

const SwitchContainer = styled.div`
  margin-bottom:  -1px; 
  cursor: pointer;
`;

const StyledSwitch = styled.div`
  color: #495057;
  background-color: transparent;
  border: 1px solid transparent;
  padding: .5rem 1rem;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  ${p => p.active && css`
    border-color: #dee2e6 #dee2e6 #fff;
    background-color: #fff;
  `}
`;

const Switch = ({ label, onClick, active }) => (
  <SwitchContainer onClick={onClick}>
    <StyledSwitch active={active}>{label}</StyledSwitch>
  </SwitchContainer>
);

export default class Switcher extends Component {
  render() {
    const { rightPanelTab: tab } = this.props;
    return (
      <Container>
        <Switch 
          label='guide' 
          onClick={this.showPanel.bind(this, 1)}
          active={tab === 1}
        />
        <Switch 
          label='analysis' 
          onClick={this.showPanel.bind(this, 2)}
          active={tab === 2}
        />
      </Container>
    );
  }

  showPanel = val => {
    this.props.setRightPanelTab(val);
  }
}
