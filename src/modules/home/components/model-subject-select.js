import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
  font-size: 0.8rem;
`;

const Selection = ({ options = {}, onChange }) => (
  <div>
    <select onChange={onChange}>
      {Object.keys(options).map(k => (
        <option value={options[k].id} key={options[k].id}>{options[k].text}</option>
      ))}
    </select>
  </div>
);

export default class ModelSubjectSelect extends Component {
  render() {
    const {
      writingModels = {},
      subjectAreas = {},
    } = this.props;

    return (
      <Container>
        <Selection options={writingModels} onChange={this.changeModel}/>
        <Selection options={subjectAreas} onChange={this.changeSubject}/>
      </Container>
    );
  }

  changeModel = e => {
    this.props.setWritingModelId(e.target.value);
  }

  changeSubject = e => {
    this.props.setSubjecAreaId(e.target.value);
  }
}
