import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: -25px 0 56px 0 rgba(241, 242, 250, .4);
`;

const StyledItem = styled.div`
  display: flex;
  margin: .5rem;
  padding: 0 .5rem;
  min-height: 2rem;
  color: #60657b;
  text-align: left;
  white-space: normal;
  line-height: 1.2rem;
  transition: background-color .2s;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f6ff;
  }
`;

const ItemLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: .04625rem;
  font-weight: 400;
  font-size: .6875rem; 
  user-select: none;
`;

const SidebarItem = ({ label, onClick }) => (
  <StyledItem onClick={onClick}>
    <ItemLabel>{label}</ItemLabel>
  </StyledItem>
);

export default class Sidebar extends Component {
  render() {
    return (
      <Container>
        <SidebarItem 
          label='models'
          onClick={this.showWritingModels}
        />
        <SidebarItem 
          label='subjects'
          onClick={this.showSubjectAreas}
        />
        <SidebarItem 
          label='analyze'
          onClick={this.analyze}
        />
      </Container>
    );
  }

  showWritingModels = () => {
    this.props.setFunctionPanelActive(true);
    this.props.setFunctionPanelFlag(1);
  }

  showSubjectAreas = () => {
    this.props.setFunctionPanelActive(true);
    this.props.setFunctionPanelFlag(2);
  }

  analyze = () => {
    this.props.setFunctionPanelActive(true);
    this.props.startAnalysis();
  }
}
