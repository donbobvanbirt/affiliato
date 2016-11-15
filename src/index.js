import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux';

import CustomRouter from './components/CustomRouter';
import { initAuth } from './actions/auth';
import Layout from './components/Layout';
import store from './store';

render(
  <h1>LOADING</h1>,
// =======
// import CampaignForm from './components/CampaignForm';
// import ClientPage from './components/ClientPage';
// import SearchPage from './components/SearchPage';
// import Home from './components/Home';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
//
// render(
//   <Provider store={store}>
//
//     <Router history={browserHistory}>
//       <Route path='/' component={Layout}>
//         <IndexRoute component={Home} />
//         <Route path='/createNewCampaign' component={CampaignForm} />
//         <Route path='/campaignProfile' component={ClientPage} />
//         <Route path='/search/:query' component={SearchPage} />
//         <Route path='/login' component={Login} />
//         <Route path='/dashboard' component={Dashboard} />
//       </Route>
//     </Router>
//   </Provider>,
// >>>>>>> 3d14f8fe1298ec735776d6a6608937045c4bdf6d
  document.getElementById('root')
);

initAuth(store.dispatch)
  .then(() => {
    render(
      <Provider store={store}>
        <CustomRouter/>
      </Provider>,
      document.getElementById('root')
    );
  })
