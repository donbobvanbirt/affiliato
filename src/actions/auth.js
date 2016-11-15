import firebase from 'firebase';
import axios from 'axios';

import { firebaseAuth } from '../firebase';

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

function authenticate(provider) {
  let resultHolder;
  let dbUserHolder;
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => {
        resultHolder = result;
        let { uid } = result.user;
        return axios.get(`/api/users/uid/${uid}`)
      })
      .then(user => {
        if (user.data) {
          return user.data;
        } else {
          let { email, displayName, photoURL, uid } = resultHolder.user;
          let newUserObj = {
            uid,
            username: displayName,
            email,
            name: {
              first: displayName.split(' ')[0],
              last: displayName.split(' ')[1]
            },
            profilePic: photoURL
          };
          return axios.post(`/api/users`, newUserObj)
        }
      })
      .then(dbUser => {
        dbUserHolder = dbUser;
        if (dbUser.campaign.length) {
          return axios.get(`/api/campaigns/${dbUser.campaign[0]}`)
        } else {
          return null;
        }
      })
      .then(campaign => {
        if (campaign) {
          campaign = campaign.data[0];
        }
        dispatch(signInSuccess(resultHolder, dbUserHolder, campaign))
      })
      .catch(err => dispatch(signInError(err)))
  }
}

function signInSuccess(result, dbUser, campaign) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: {
      auth: result.user,
      user: dbUser,
      campaign
    }
  }
}

function initAuthSuccess(user, dbUser, campaign) {
  console.log('initAuthSuccess campaign:', campaign);
  return {
    type: 'INIT_AUTH_SUCCESS',
    payload: {
      auth: user,
      user: dbUser,
      campaign
    }
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
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          let dbUserHolder;
          axios.get(`/api/users/uid/${user.uid}`)
            .then(dbUser => {
              dbUser = dbUser.data;
              dbUserHolder = dbUser;
              if (dbUser.campaign && dbUser.campaign.length) {
                return axios.get(`/api/campaigns/${dbUser.data.campaign[0]}`)
              } else {
                return null;
              }
            })
            .then(campaign => {
              if (campaign) {
                campaign = campaign.data[0];
              }
              dispatch(initAuthSuccess(user, dbUserHolder, campaign));
            })
        }
        unsub();
        resolve();
      },
      error => {
        resolve();
      }
    )

  })
}

export function checkProtectedRoute() {
  firebaseAuth.currentUser.getToken()
    .then(token => {
      return axios.get('/api/secret', {
        headers: {
          'x-auth-token': token
        }
      })
    })
    .then(res => {
      return res.data;
    })
    .then(data=> data)
    .catch(err => {
      console.log('err:', err);
    })
}
