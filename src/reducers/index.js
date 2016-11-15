import { combineReducers } from 'redux';
import campaign from './campaign';
import user from './user';


export default combineReducers({
  campaign,
  user
});
