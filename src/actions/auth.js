import firebase from 'firebase';
import axios from 'axios';

import { firebaseAuth } from '../firebase';

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(err => dispatch(signInError(err)))
  }
}

function signInSuccess(result) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: result.user
  }
}

function initAuthSuccess(user) {
  return {
    type: 'INIT_AUTH_SUCCESS',
    payload: user
  }
}

function signOutSuccess() {
  return {
    type: 'SIGN_OUT_SUCCESS'
  }
}

function initAuthError(err) {
  return {
    type: 'INIT_AUTH_ERROR',
    payload: err
  }
}

function signInError(err) {
  return {
    type: 'SIGN_IN_ERROR',
    payload: err
  }
}

export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  }
}

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {

    // onAuthStateChanged returns a function that lets you unsub from it
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          dispatch(initAuthSuccess(user));
          // makes this only happen one time
        }
        unsub();
        resolve();
      },
      error => {
        // dispatch(initAuthError(error));
        // reject(error);
        resolve();
      }
    )

  })
}

export function checkProtectedRoute() {
  firebaseAuth.currentUser.getToken()
    .then(token => {
      console.log('token:', token);
      return axios.get('/api/secret', {
        headers: {
          'x-auth-token': token
        }
      })
    })
    .then(res => {
      console.log('res:', res);
      return res.data;
    })
    .then(data=> data)
    .catch(err => {
      console.log('err:', err);
    })
}
