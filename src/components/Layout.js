import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <button onClick={() => browserHistory.push('/campaign-form')}>Create</button>
        <button onClick={() => browserHistory.push('/campaign-profile')}>Profile</button>
        {this.props.children}
      </div>
    );
  }
}
