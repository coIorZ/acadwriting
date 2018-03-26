import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const PageBtn = styled.span`
 display: inline-block;
 padding: 1rem;
 border: 1px solid black;
`;

export default class Pagination extends Component {
  render() {
    const {
      length = 1,
      onClick,
    } = this.props;

    return (
      <Container>
        {[...Array(length).keys()].map(k => (
          <PageBtn key={k} onClick={onClick.bind(this, k)}>{k + 1}</PageBtn>
        ))}
      </Container>
    );
  }
}
