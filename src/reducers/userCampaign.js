
export default function (state = {}, { type, payload }) {
  switch (type) {
    case 'DELETED_CAPAIGN':
    case 'SIGN_OUT_SUCCESS':
      return {};
    case 'CAMPAIGN_CREATE':
    case 'UPDATE_CAMPAIGN':
    case 'CAMPAIGN_ADD_POST':
      return payload;
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      return payload.campaign;
    default:
      return state;
  }
}
