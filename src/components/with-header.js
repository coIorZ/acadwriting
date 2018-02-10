import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './header';

const Placeholder = styled.div`
  height: 80px;
`;

export default class WithHeader extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Placeholder/>
        {this.props.children}
      </div>
    );
  }
}
