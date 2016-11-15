import firebase from 'firebase';
import axios from 'axios';

import { firebaseAuth } from '../firebase';

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

function authenticate(provider) {
  let resultHolder;
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => {
        resultHolder = result;
        console.log('resultHolder:', resultHolder);
        let { uid } = result.user;
        return axios.get(`/api/users/uid/${uid}`)
      })
      .then(user => {
        if (user.data) {
          console.log('user.data:', user.data);
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
        dispatch(signInSuccess(resultHolder, dbUser))
      })
      .catch(err => dispatch(signInError(err)))
  }
}

function signInSuccess(result, dbUser) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: {
      auth: result.user,
      user: dbUser
    }
  }
}

function initAuthSuccess(user, dbUser) {
  return {
    type: 'INIT_AUTH_SUCCESS',
    payload: {
      auth: user,
      user: dbUser
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
  console.log('err:', err);
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

// function authenticate(provider) {
//   let resultHolder;
//   return dispatch => {
//     firebaseAuth.signInWithPopup(provider)
//       .then(result => {
//         resultHolder = result;
//         console.log('resultHolder:', resultHolder);
//         let { uid } = result.user;
//         return axios.get(`/api/users/uid/${uid}`)
//       })
//       .then(user => {
//         if (user.data) {
//           console.log('user.data:', user.data);
//           return user.data;
//         } else {
//           let { email, displayName, photoURL, uid } = resultHolder.user;
//           let newUserObj = {
//             uid,
//             username: displayName,
//             email,
//             name: {
//               first: displayName.split(' ')[0],
//               last: displayName.split(' ')[1]
//             },
//             profilePic: photoURL
//           };
//           return axios.post(`/api/users`, newUserObj)
//         }
//       })
//       .then(dbUser => {
//         dispatch(signInSuccess(resultHolder, dbUser))
//       })
//       .catch(err => dispatch(signInError(err)))
//   }
// }

export function initAuth(dispatch) {
  console.log('INITAUTH');
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          axios.get(`/api/users/uid/${user.uid}`)
            .then(dbUser => {
              dispatch(initAuthSuccess(user, dbUser.data));
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
