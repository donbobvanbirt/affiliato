export function createCampaign(data) {
  return {
    type: 'CAMPAIGN_CREATE',
    payload: data,
  };
}
