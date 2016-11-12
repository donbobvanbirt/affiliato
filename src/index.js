import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import Layout from './components/Layout';
import CampaignForm from './components/CampaignForm';
import ClientPage from './components/ClientPage';

render(
  <Provider store={store}>

    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <Route path='/campaign-form' component={CampaignForm} />
        <Route path='/campaign-profile' component={ClientPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);


/*
ROUTES TO CREATE:
/createNewCampaign
/dashboard
/logout
/login
/register
/
*/
