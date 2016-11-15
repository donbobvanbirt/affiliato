
export function sendAdvSearchQuery (query) {
  console.log('query:', query);
  return {
    type: 'NEW_ADV_SEARCH',
    payload: query
  };
}

export function sendFilteredCampaigns (filteredCampaigns) {
  console.log('filteredCampaigns in SearchActions:', filteredCampaigns);
  return {
    type: 'RECEIVE_FILTERED_CAMPAIGNS',
    payload: filteredCampaigns
  };
}

export function resetFilteredCampaigns () {
  return {
    type: 'RESET_FILTERED_CAMPAIGNS'
  };
}
