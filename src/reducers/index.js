import { combineReducers } from 'redux';
import campaign from './campaign';
import auth from './auth';


export default combineReducers({
  campaign,
  auth
});
