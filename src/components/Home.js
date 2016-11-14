import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { Image } from 'semantic-ui-react';

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <Image src='../../public/assets/images/johnsboat.jpg' fluid />
      </div>
    );
  }
}
