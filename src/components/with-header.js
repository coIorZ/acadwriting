import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: grid;
  grid-template-columns: 12.4rem auto 12.4rem;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 4rem;
  color: #ffffff;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    height: 4rem;
  }
`;

//const Title = styled.div`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //font-size: 1.4rem;
//`;

const User = styled.div`

`;

const StyledHeader = () => (
  <Header>
    <Logo>
      <img src={require('../images/NTU-logo-full-colour.png')}/>
    </Logo>
    <User>
    </User>
  </Header>
);

export default class WithHeader extends Component {
  render() {
    return (
      <div>
        <StyledHeader/>
        {this.props.children}
      </div>
    );
  }
}
