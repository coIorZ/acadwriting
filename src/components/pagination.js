import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: .5rem 0;
`;

const PageBtn = styled.span`
 display: inline-block;
 padding: 0 .2rem;
 margin: .3rem;
 cursor: pointer;
 border-bottom: 1px solid transparent;
 ${p => p.active && css`
    color: #4c7af1;
    font-weight: 700;
    border-bottom: 1px solid #4c7af1;
 `}
`;

export default class Pagination extends Component {
  state = {
    currentIndex: 0,
  }

  render() {
    const {
      length = 1,
    } = this.props;

    const { currentIndex } = this.state;

    return (
      <Container>
        {[...Array(length).keys()].map(k => (
          <PageBtn 
            key={k} 
            active={k === currentIndex}
            onClick={this.clickPage.bind(this, k)}
          >
            {k + 1}
          </PageBtn>
        ))}
      </Container>
    );
  }

  clickPage = k => {
    this.setState(() => ({
      currentIndex: k,
    }));
    this.props.onClick(k);
  }
}
