
export default function (state = {}, action) {
  switch (action.type) {
    case 'CAMPAIGN_CREATE':
      return action.payload;
    case 'UPDATE_CAMPAIGN':
    case 'SET_CURRENT_CAMPAIGN':
      return action.payload;
    default:
      return state;
  }
}
