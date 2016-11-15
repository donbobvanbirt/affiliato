const initialState = {
  username: undefined,
  uid: undefined,
  email: undefined,
  name: {
    first: undefined,
    last: undefined
  },
  profilePic: undefined,
  campaign: [undefined]
}

export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      let { user } = payload;
      return Object.assign({}, state, user);
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}
