import React, { Component } from 'react';

import Rhetorical from './rhetorical.js';
import Sentences from './sentences.js';

export default class guide extends Component {
  render() {
    const { guideFlag, writingModelId } = this.props;

    if (guideFlag == 2) return (<Sentences {...this.props}/>);
    if (writingModelId == 1) return (<Rhetorical {...this.props}/>);
    return null;
  }
}
