import React, { Component } from 'react';

import Rhetorical from './rhetorical.js';


export default class guide extends Component {
  render() {
    return (<Rhetorical {...this.props}/>); 
  }
}
