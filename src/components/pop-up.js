import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(100, 107, 131, .4);
`;

const Pop = styled.div`
  background-color: #fff;
  width: 50%;
  height: 80%;
  z-index: 1;
  border-radius: 3px;
  box-shadow: 0 0 20px 0 rgba(76,85,101,.16);
  overflow: auto;
}
`;


export default class PopUp extends Component {
  render() {
    return (
      <Container>
        <Mask onClick={this.props.onClickMask}/>
        <Pop>
          {this.props.children}
        </Pop>
      </Container>
    );
  }
}
