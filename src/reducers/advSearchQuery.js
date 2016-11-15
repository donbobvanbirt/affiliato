
export default function (state = {}, action) {
  switch (action.type) {
    case 'NEW_ADV_SEARCH':
      return action.payload;
    default:
      return state;
  }
}
