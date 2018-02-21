import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas, getSections,
  getDocument, getSection,
  getFunctionPanelActive,
  getWritingModelId, getSubjectAreaId,
} from '../ducks/selectors';

import WritingPanel from '../components/writing-panel';
import FunctionPanel from '../components/function-panel';

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
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
    sections            : getSections(state),
    section             : getSection(state),
    document            : getDocument(state),
    functionPanelActive : getFunctionPanelActive(state),
    writingModelId      : getWritingModelId(state),
    subjectAreaId       : getSubjectAreaId(state),
  }),
  actions,
)(Home);
