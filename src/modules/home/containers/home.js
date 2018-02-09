import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';

class App extends Component {
  render() {
    return (
      <Header/>
    );
  }
}

export default connect(state => (state))(App);
