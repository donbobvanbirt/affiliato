import axios from 'axios';

export function retrieveCreatedCampaign (data) {
  console.log('data:', data);
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data
  };
}

export function receiveCampaigns (campaigns) {
  console.log('campaigns:', campaigns);
  return {
    type: 'RECEIVE_CAMPAIGNS',
    payload: campaigns
  };
}

export function setCurrentCampaign (campaign) {
  return {
    type: 'SET_CURRENT_CAMPAIGN',
    payload: campaign
  }
}

export function createCampaign(data){
  return (dispatch) => {
    axios.post(`/api/campaign/`, data)
      .then((res) => res.data)
      .then((data2) => dispatch(retrieveCreatedCampaign(data2)))
      .catch(console.error);
  };
}

export function fetchCampaigns(){
  return (dispatch) => {
    axios.get('/api/campaign/')
    .then(res => res.data)
    .then(campaigns => dispatch(receiveCampaigns(campaigns)))
    .catch(console.error);
  };
}
