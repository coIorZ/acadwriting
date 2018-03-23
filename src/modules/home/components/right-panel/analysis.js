import React, { Component } from 'react';

import OverviewAnalysis from './overview-analysis';
import SentenceAnalysis from './sentence-analysis';

export default class Analysis extends Component {
  render() {
    const {
      analysisFlag: flag,
    } = this.props;

    if(flag === 1) return <OverviewAnalysis {...this.props}/>;
    if(flag === 2) return <SentenceAnalysis {...this.props}/>;
    return null;
  }
}
