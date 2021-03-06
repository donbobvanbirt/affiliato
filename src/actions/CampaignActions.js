import axios from 'axios';

export function createCampaignSuccess(data) {
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}

export function createCampaign(campaign, userId) {
  return (dispatch) => {
    axios.post(`/api/campaigns/`, campaign, {
      headers: { 'x-user': userId },
    })
    .then(res => res.data)
    .then(newCampaign => dispatch(createCampaignSuccess(newCampaign)))
    .catch(console.error);
  };
}

export function receiveCampaigns(campaigns) {
  console.log('campaigns:', campaigns);
  return {
    type: 'RECEIVE_CAMPAIGNS',
    payload: campaigns,
  };
}

export function setCurrentCampaign(campaign) {
  console.log('current campaign:', campaign);
  return {
    type: 'SET_CURRENT_CAMPAIGN',
    payload: campaign,
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

export function editedCamp(data) {
  return {
    type: 'UPDATE_CAMPAIGN',
    payload: data,
  };
}

export function deletedCampaign(data) {
  return {
    type: 'DELETED_CAPAIGN',
    payload: data,
  };
}

// export function createCampaign(data) {
//   return (dispatch) => {
//     axios.post('/api/campaigns/', data)
//       .then(res => res.data)
//       .then(data2 => dispatch(retrieveCreatedCampaign(data2)))
//       .catch(console.error);
//   };
// }

export function fetchCampaigns() {
  return (dispatch) => {
    axios.get('/api/campaigns/')
    .then(res => res.data)
    .then(campaigns => dispatch(receiveCampaigns(campaigns)))
    .catch(console.error);
  };
}

export function submitPost(post, camp) {
  return (dispatch) => {
    axios.post(`/api/campaigns/post/${camp}`, post)
    .then(res => res.data)
    .then(data2 => dispatch(addedPost(data2)))
    .catch(console.error);
  };
}

export function getCampaign(id) {
  return (dispatch) => {
    axios.get(`/api/campaigns/${id}`)
    .then(res => res.data)
    .then(data2 => dispatch(setCurrentCampaign(data2)))
    .catch(console.error);
  };
}

export function addClick(campaign) {
  return (dispatch) => {
    axios.put(`/api/campaigns/${campaign._id}`, campaign)
    .then(res => res.data)
    .then(res2 => dispatch(editedCamp(res2)))
    .catch(console.error);
  };
}

export function editCampaign(campaign, id) {
  return (dispatch) => {
    axios.put(`/api/campaigns/${id}`, campaign)
    .then(res => res.data)
    .then(res2 => dispatch(editedCamp(res2)))
    .catch(console.error);
  };
}

export function removeCampaign(id) {
  return (dispatch) => {
    axios.delete(`/api/campaigns/${id}`)
    .then(res => dispatch(deletedCampaign(res.data)))
    // .then(fetchCampaigns())
    .catch(console.error);
  };
}
