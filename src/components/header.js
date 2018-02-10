import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: grid;
  grid-template-columns: 200px auto 200px;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 80px;
  color: #ffffff;
  background-color: #4abd92;
`;

const Logo = styled.div`
  & > img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const User = styled.div`

`;

export default () => (
  <Header>
    <Logo>
      <img src={require('../images/NTU-logo-full-colour.png')}/>
    </Logo>
    <Title>
      Evidence Based Academic Writing Assistant
    </Title>
    <User>
    </User>
  </Header>
);
