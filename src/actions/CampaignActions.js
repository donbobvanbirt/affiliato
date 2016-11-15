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
