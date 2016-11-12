import React, { Component } from 'react';

import SearchPage from './SearchPage';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <h1>NAVBAR</h1>
        <SearchPage />
      </div>
    );
  }
}
