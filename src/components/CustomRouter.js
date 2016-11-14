import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { firebaseAuth } from '../firebase';

import Layout from './Layout';
import CampaignForm from './CampaignForm';
import ClientPage from './ClientPage';
import SearchPage from './SearchPage';
import Login from './Login';

import SignIn from './SignIn';
import Secret from './Secret';

function authCheck(nextState, transition) {
  console.log('nextState:', nextState);
  let user = firebaseAuth.currentUser;
  if (!user) {
    transition('/login');
  }
}

export default class CustomRouter extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <Route path='/createNewCampaign' component={CampaignForm} />
          <Route path='/campaignProfile' component={ClientPage} />
          <Route path='/search/:query' component={SearchPage} />
          <Route path='/login' component={Login} />
          <Route path='/secret' component={Secret}  onEnter={authCheck}/>
        </Route>
      </Router>
    );
  }
}
