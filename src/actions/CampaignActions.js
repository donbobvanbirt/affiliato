import axios from 'axios';

export function retrieveCreatedCampaign(data) {
  console.log('data:', data);
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}

export function createCampaign(data){
  return (dispatch) => {
    axios.post(`/api/campaign/`, data)
    .then(res => res.data)
    .then(data2 => dispatch(retrieveCreatedCampaign(data2)))
    .catch(console.error);
  };
}
