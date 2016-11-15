import axios from 'axios';

export function createCampaignSuccess(data) {
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}

export function createCampaign(campaign, userId){
  return (dispatch) => {
    axios.post(`/api/campaigns/`, campaign, {
      headers: { 'x-user': userId }
    })
    .then(res => res.data)
    .then(newCampaign => dispatch(createCampaignSuccess(newCampaign)))
    .catch(console.error);
  };
}

///
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

export function addedClick(data){
  return {
    type: 'UPDATE_CAMPAIGN',
    payload: data
  }
}

// export function createCampaign(data) {
//   return (dispatch) => {
//     axios.post('/api/campaign/', data)
//       .then(res => res.data)
//       .then(data2 => dispatch(retrieveCreatedCampaign(data2)))
//       .catch(console.error);
//   };
// }

export function fetchCampaigns() {
  return (dispatch) => {
    axios.get('/api/campaign/')
    .then(res => res.data)
    .then(campaigns => dispatch(receiveCampaigns(campaigns)))
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
///

export function getCampaign(id) {
  return (dispatch) => {
    axios.get(`/api/campaign/${id}`)
    .then(res => res.data)
    .then(data2 => dispatch(setCurrentCampaign(data2)))
    .catch(console.error);
  };
}

export function addClick(campaign) {
  return (dispatch) => {
    axios.put(`/api/campaign/${campaign._id}`, campaign)
    .then(res => res.data)
    .then(res2 => dispatch(addedClick(res2)))
  };
}
