import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  fetchWritingModels, fetchSubjectAreas,
} from '../ducks/actions';

import {
  getWritingModels, getSubjectAreas,
} from '../ducks/selectors';

import { Grid } from '../../../components';
import ModelSubjectSelect from '../components/model-subject-select';
import Document from '../components/document';

class Home extends Component {
  componentDidMount() {
    this.props.fetchWritingModels();
    this.props.fetchSubjectAreas();
  }

  render() {
    return (
      <Grid col='50% 50%'>
        <section>
          <ModelSubjectSelect {...this.props}/>
          <Document {...this.props}/>
        </section>
        <section>
        </section>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    writingModels : getWritingModels(state),
    subjectAreas  : getSubjectAreas(state),
  }),
  {
    fetchWritingModels, fetchSubjectAreas,
  },
)(Home);
