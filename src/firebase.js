import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAFBIK4eK0Ap2_6zYNlYlXrOhV255Oi-0Q",
  authDomain: "test-169da.firebaseapp.com",
  databaseURL: "https://test-169da.firebaseio.com",
  storageBucket: "test-169da.appspot.com",
  messagingSenderId: "1016109341005"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
