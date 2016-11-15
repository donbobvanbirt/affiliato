let initialState = {};

export default function (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_FILTERED_CAMPAIGNS':
      return action.payload;
    case 'RESET_FILTERED_CAMPAIGNS':
      return initialState;
    default:
      return state;
  }
}
