import React, { Component } from 'react';

import { sProps } from '../../../../lib/utils';
import Rhetorical from './rhetorical.js';
import Rsfunc from './research-function.js';
import Sentences from './sentences.js';
import Metadiscourse from './metadiscourse.js';

export default class Guide extends Component {
  render() {
    const { guideFlag, writingModelId } = this.props;

    if (guideFlag == 2) return (<Sentences {...sProps(this.props, 'sentences', 'sectionId', 'subjectAreaId', 'moves', 'currentMoveId', 'steps', 'currentStepId', 'markers', 'currentMarkerId')}/>);
    if (writingModelId == 1) return (<Rhetorical {...sProps(this.props, 'moves', 'steps', 'markers', 'sentences', 'currentMoveId', 'currentStepId', 'sectionId')}/>);
    if (writingModelId == 2) return (<Rsfunc {...sProps}/>);
    if (writingModelId == 3) return (<Metadiscourse {...sProps(this.props, 'mdCodes', 'mdSubCodes', 'mdMarkers', 'currentMdCodeId', 'currentMdSubCodeId', 'setCurrentMdMarkerId')}/>);
    return null;
  }
}
