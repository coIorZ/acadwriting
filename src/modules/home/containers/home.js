import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas,
  getDocument,
  getFunctionPanelActive,
} from '../ducks/selectors';

import WritingPanel from '../components/writing-panel';
import FunctionPanel from '../components/function-panel';

const Container = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 4rem);
`;

class Home extends Component {
  componentDidMount() {
    this.props.fetchWritingModels();
    this.props.fetchSubjectAreas();
  }

  render() {
    return (
      <Container>
        <WritingPanel {...this.props}/>
        <FunctionPanel {...this.props}/>
      </Container>
    );
  }
}

export default connect(
  state => ({
    writingModels       : getWritingModels(state),
    subjectAreas        : getSubjectAreas(state),
    document            : getDocument(state),
    functionPanelActive : getFunctionPanelActive(state),
  }),
  actions,
)(Home);
