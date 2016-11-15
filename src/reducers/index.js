import { combineReducers } from 'redux';
import campaign from './campaign';
import auth from './auth';
import user from './user';


export default combineReducers({
  campaign,
  auth,
  user
});
