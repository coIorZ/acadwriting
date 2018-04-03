import React, { Component } from 'react';

import { sProps } from '../../../../lib/utils';
import OverviewAnalysis from './overview-analysis';
import SentenceAnalysis from './sentence-analysis';

export default class Analysis extends Component {
  render() {
    const {
      analysisFlag: flag,
    } = this.props;

    if(flag === 1) return <OverviewAnalysis {...sProps(this.props, 'moves', 'steps', 'analysis', 'sectionId')}/>;
    if(flag === 2) return <SentenceAnalysis {...sProps(this.props, 'moves', 'steps', 'markers', 'analysis', 'sectionId', 'analysisSentenceId')}/>;
    return null;
  }
}
