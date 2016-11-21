import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { firebaseAuth } from '../firebase';

import Layout from './Layout';
import CampaignForm from './CampaignForm';
import ClientPage from './ClientPage';
import SearchPage from './SearchPage';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import SignUp from './SignUp';

// import SignIn from './SignIn';
import Secret from './Secret';

function authCheck(nextState, transition) {
  const user = firebaseAuth.currentUser;
  if (!user) {
    transition('/login');
  }
}

export default class CustomRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/createNewCampaign" component={CampaignForm} onEnter={authCheck} />
          <Route path="/campaignProfile/:id" component={ClientPage} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} onEnter={authCheck} />
          <Route path="/dashboard" component={Dashboard} onEnter={authCheck} />
        </Route>
      </Router>
    );
  }
}
