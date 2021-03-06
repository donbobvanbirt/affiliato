import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInWithGoogle, signOut } from '../actions/auth';


@connect(state => ({
  loggedIn: !!state.user._id,
  user: state.user
}), dispatch => ({
  signOut() {
    dispatch(signOut());
  },
  googleSignIn() {
    dispatch(signInWithGoogle());
  }
}))
export default class SignIn extends Component {
  constructor() {
    super();

    this._googleSignIn = this._googleSignIn.bind(this);
    this._signOut = this._signOut.bind(this);
  }

  _googleSignIn() {
    this.props.googleSignIn();
  }

  _signOut() {
    this.props.signOut();
  }

  render() {
    const { loggedIn, user } = this.props;

    return (
      <div>
        { loggedIn ?
          <button onClick={this._signOut}>Sign Out</button> :
          <button onClick={this._googleSignIn}>Google Sign In</button>
        }
        <div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    );
  }
}
