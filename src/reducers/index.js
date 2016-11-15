import { combineReducers } from 'redux';
import campaign from './campaign';
import campaigns from './campaigns';
import filteredCampaigns from './filteredCampaigns';
import advSearchQuery from './advSearchQuery';

export default combineReducers({
  campaign,
  campaigns,
  advSearchQuery,
  filteredCampaigns
});
