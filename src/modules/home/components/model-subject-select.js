import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 3rem;
  padding: .5rem 0;
  text-transform: uppercase;
  font-weight: 400;
  font-size: .9rem;
  box-shadow: 0 5px 15px 0 rgba(198,203,222,.45);
  cursor: pointer;
  user-select: none;
`;

export default class Selection extends Component {
  render() {
    const {
      functionPanelStatus = {},
      writingModels = {},
      subjectAreas = {},
    } = this.props;

    const options = functionPanelStatus.flag == 1 ? writingModels : subjectAreas;

    return (
      <Container>
        {Object.keys(options).map(k => {
          const { id, label } = options[k];
          return (
            <Option 
              key={id}
              onClick={this.onSelect.bind(this, id)}
            >
              {label}
            </Option>
          );
        })}
      </Container>
    );
  }

  onSelect = id => {
    const flag = this.props.functionPanelStatus.flag;
    if(flag == 1) this.props.setWritingModelId(id);
    if(flag == 2) this.props.setSubjecAreaId(id);
    this.props.setFunctionPanelFlag(-1);
  }
}
