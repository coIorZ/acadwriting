import React, { Component } from 'react';
import { connect } from '98k';

import OverviewAnalysis from './overview-analysis';
import SentenceAnalysis from './sentence-analysis';

class Analysis extends Component {
  render() {
    const { flag } = this.props;

    if(flag === 1) return <OverviewAnalysis/>;
    if(flag === 2) return <SentenceAnalysis/>;
    return null;
  }
}

export default connect(({ home: { analysisFlag } }) => ({
  flag: analysisFlag,
}))(Analysis);
