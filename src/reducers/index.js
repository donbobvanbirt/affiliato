import { combineReducers } from 'redux';
import campaign from './campaign';
import campaigns from './campaigns';

export default combineReducers({
  campaign,
  campaigns
});
