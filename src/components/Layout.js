import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Navbar from './Navbar';

import SearchPage from './SearchPage';

export default class Layout extends Component {
  render () {
    return (
// <<<<<<< HEAD
      // <div>
      //   <h1>NAVBAR</h1>
      //   <SearchPage />
      // </div>
// =======
      <div className='container'>
        <Navbar />
        {this.props.children}
      </div>
// >>>>>>> john
    );
  }
}
