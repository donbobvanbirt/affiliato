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
  componentDidMount() {
    // firebaseAuth.currentUser.getToken()
    //   .then(token => {
    //     console.log('token:', token);
    //     return axios.get('/api/secret', {
    //       headers: {
    //         'x-auth-token': token
    //       }
    //     })
    //   })
    //   .then(res => {
    //     console.log('res:', res);
    //   })
    //   .catch(err => {
    //     console.log('err:', err);
    //   })
    console.log('this.props.checkProtectedRoute:', this.props.checkProtectedRoute());
  }

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Secret!</h1>
      </div>
    )
  }
}
