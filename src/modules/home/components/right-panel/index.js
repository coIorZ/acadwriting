import React, { Component } from 'react';
import { connect } from '98k';
import styled, { css } from 'styled-components';

import Switcher from './switcher';
import Analysis from './analysis';
import Guide from './guide';

const Container = styled.div`
  display: grid;
  grid-template-rows: 3rem auto;
  box-shadow: -25px 0 56px 0 rgba(241, 242, 250, .4);
`;

class FunctionPanel extends Component {
  render() {
    const { tab } = this.props;

    return (
      <Container>
        <Switcher tab={tab} onSwitch={this.switchTab}/>
        {tab === 1 && <Guide/>}
        {tab === 2 && <Analysis/>}
      </Container>
    );
  }

  switchTab = payload => {
    this.props.dispatch({ type: 'home/saveRightPanelTab', payload });
  }
}

export default connect(({ home: { rightPanelTab } }) => ({
  tab: rightPanelTab,
}))(FunctionPanel);
