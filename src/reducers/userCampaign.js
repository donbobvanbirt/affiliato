
export default function (state = {}, { type, payload }) {
  switch (type) {
    case 'SIGN_OUT_SUCCESS':
      return {};
    case 'CAMPAIGN_CREATE':
    case 'UPDATE_CAMPAIGN':
      return payload;
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      return payload.campaign;
    default:
      return state;
  }
}
