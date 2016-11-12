import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Navbar from './Navbar';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <button onClick={() => browserHistory.push('/campaign-form')}>Create</button>
        <button onClick={() => browserHistory.push('/campaign-profile')}>Profile</button>
        {this.props.children}

        <div className='container'>
          <Navbar />
          <h1 className='text-center'>Redux Express</h1>
        </div>
      </div>
    );
  }
}
