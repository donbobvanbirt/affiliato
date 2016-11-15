import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkProtectedRoute } from '../actions/auth';


@connect(state => ({
}), dispatch => ({
  checkProtectedRoute() {
    (checkProtectedRoute());
  }
}))
export default class Secret extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Secret!</h1>
      </div>
    )
  }
}
