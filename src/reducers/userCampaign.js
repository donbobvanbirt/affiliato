
export default function (state = {}, { type, payload }) {
  switch (type) {
    case 'SIGN_OUT_SUCCESS':
      return {};
    case 'INIT_AUTH_SUCCESS':
      return payload.campaign;
    case 'SIGN_IN_SUCCESS':
      return payload.campaign;
    default:
      return state;
  }
}
