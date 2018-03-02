import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  font-size: .9rem;
  padding: .5rem 0 .5rem 2rem;
  height: 4rem;
`;

const StyledFilter = styled.div`
  display: grid;
  grid-template-columns: 8rem auto;
  margin-bottom: .7rem;
`;

const FilterLabel = styled.span`
  font-weight: 700;
`;
const FilterItemGroup = styled.span`
`;
const FilterItem = styled.span`
  margin-right: 1rem;
  cursor: pointer;
  ${p => p.active && css`
    color: #4c7af1;
    font-weight: 700;
  `}
`;

const Filter = ({ label = '', items = {}, activeId = -1, onClick }) => (
  <StyledFilter>
    <FilterLabel>{label}</FilterLabel>
    <FilterItemGroup>
      {Object.keys(items).map(key => {
        const { id, label } = items[key];
        return (
          <FilterItem 
            key={id}
            active={id === activeId}
            onClick={onClick.bind(this, id)}
          >
            {label}
          </FilterItem>
        );
      })}
    </FilterItemGroup>
  </StyledFilter>
);

export default class ModelSubjectFilter extends Component {
  render() {
    const {
      writingModels = {},
      writingModelId = -1,
      subjectAreas = {},
      subjectAreaId = -1,
    } = this.props;

    return (
      <Container>
        <Filter 
          label='Writing Model:' 
          items={writingModels} 
          activeId={writingModelId}
          onClick={this.clickModelItem}
        />
        <Filter 
          label='Subject Area:' 
          items={subjectAreas} 
          activeId={subjectAreaId}
          onClick={this.clickSubjectItem}
        />
      </Container>
    );
  }

  clickModelItem = id => {
    this.props.setWritingModelId(id);
  }
  
  clickSubjectItem = id => {
    this.props.setSubjectAreaId(id);
  }
}
