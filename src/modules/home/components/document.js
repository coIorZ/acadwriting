import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  margin: 1rem 0;
  width: 95%;
  outline: none;
  border: none;
  background: transparent;
  line-height: normal;
  font-weight: 700;
  font-size: 1.5rem;
`;

export default class Document extends Component {
  render() {
    return (
      <div>
        <Title placeholder='Type your title'/>
      </div>
    );
  }
}
