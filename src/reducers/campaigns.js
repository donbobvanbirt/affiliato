
export default function (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CAMPAIGNS':
      return action.payload;
    default:
      return state;
  }
}
