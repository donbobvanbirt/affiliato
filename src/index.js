import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux';

import CustomRouter from './components/CustomRouter';
import { initAuth } from './actions/auth';
import Layout from './components/Layout';
import store from './store';

render(
  <h1>LOADING</h1>,
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
