import React, { Component } from 'react';
import { connect } from '98k';

import { sProps } from '../../../../lib/utils';
import Rhetorical from './rhetorical.js';
import Rsfunc from './research-function.js';
import Sentences from './sentences.js';
import Metadiscourse from './metadiscourse.js';

class Guide extends Component {
  render() {
    const { guideFlag, writingModelId } = this.props;

    if (guideFlag == 2) return <Sentences/>;
    if (writingModelId == 1) return <Rhetorical/>;
    if (writingModelId == 2) return <Rsfunc {...sProps}/>;
    if (writingModelId == 3) return <Metadiscourse/>;
    return null;
  }
}

export default connect(({ home: { guideFlag, writingModelId } }) => ({
  guideFlag, writingModelId,
}))(Guide);
