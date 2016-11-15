import { combineReducers } from 'redux';
import campaign from './campaign';
import userCampaign from './userCampaign';
import user from './user';
import campaigns from './campaigns';
import filteredCampaigns from './filteredCampaigns';
import advSearchQuery from './advSearchQuery';

export default combineReducers({
  user,
  userCampaign,
  campaign,
  campaigns,
  advSearchQuery,
  filteredCampaigns
});
