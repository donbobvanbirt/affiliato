import axios from 'axios';

export function createCampaignSuccess(data) {
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}

export function createCampaign(campaign, userId){
  console.log('campaign:', campaign);
  let body = { campaign, userId };
  return (dispatch) => {
    axios.post(`/api/campaigns/`, body)
    .then(res => res.data)
    .then(newCampaign => dispatch(createCampaignSuccess(newCampaign)))
    .catch(console.error);
  };
}


// { campaign: {
//   title: 'aaaaab',
//   description: 'gyft',
//   about: 'jcghkvjlbn',
//   moneyExplain: ';ohugyftcgjhvj',
//   affiliates: [ [Object] ],
//   assets: {
//     header: 'tcfyvubi',
//     storyImg: 'bigyucfxnm bhj.k',
//     profile: 'ytdrx'
//   }
// }
//
// }
