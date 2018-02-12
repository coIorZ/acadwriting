import React, { Component } from 'react';
import styled from 'styled-components';

import { Flex } from './index';

const Header = styled.div`
  display: grid;
  grid-template-columns: 12.5rem auto 12.5rem;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 5rem;
  color: #ffffff;
  background-color: #4abd92;
`;

const Logo = styled(Flex)`
  & > img {
    height: 5rem;
  }
`;

const Title = styled(Flex)`
  font-size: 1.5rem;
`;

const User = styled.div`

`;

const StyledHeader = () => (
  <Header>
    <Logo align>
      <img src={require('../images/NTU-logo-full-colour.png')}/>
    </Logo>
    <Title align>
      Evidence Based Academic Writing Assistant
    </Title>
    <User>
    </User>
  </Header>
);

const Placeholder = styled.div`
  height: 5rem;
`;

export default class WithHeader extends Component {
  render() {
    return (
      <div>
        <StyledHeader/>
        <Placeholder/>
        {this.props.children}
      </div>
    );
  }
}
