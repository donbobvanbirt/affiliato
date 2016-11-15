const initialState = {
  authenticated: false,
  user: {}
}

export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      let { uid, email, displayName, photoURL } = ( payload.auth || payload );
      return Object.assign({}, {
        authenticated: true,
        user: { uid, email, displayName, photoURL }
      })
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}
