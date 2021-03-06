import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router';

import Navbar from './Navbar';

import SearchPage from './SearchPage';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>

    );
  }
}
