import axios from 'axios';

export function retrieveCreatedCampaign(data) {
  console.log('data:', data);
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}

export function addedPost(data) {
  console.log('data:', data);
  return {
    type: 'CAMPAIGN_ADD_POST',
    payload: data,
  };
}

export function receiveCampaign(data) {
  console.log('data:', data);
  return {
    type: 'CAMPAIGN_RECEIVED',
    payload: data,
  };
}

export function createCampaign(data) {
  return (dispatch) => {
    axios.post(`/api/campaign/`, data)
    .then(res => res.data)
    .then(data2 => dispatch(retrieveCreatedCampaign(data2)))
    .catch(console.error);
  };
}

export function submitPost(post, camp) {
  return (dispatch) => {
    axios.post(`/api/campaign/post/${camp}`, post)
    .then(res => res.data)
    .then(data2 => dispatch(addedPost(data2)))
    .catch(console.error);
  };
}

export function getCampaign(id) {
  return (dispatch) => {
    axios.get(`/api/campaign/${id}`)
    .then(res => res.data)
    .then(data2 => dispatch(getCampaign(data2)))
    .catch(console.error);
  };
}
