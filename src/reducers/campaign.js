
export default function (state = {}, action) {
  switch (action.type) {
    case 'CAMPAIGN_CREATE':
    
      return action.payload;
    default:
      return state;
  }
}
