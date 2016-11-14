import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as CampaignActions from '../actions/CampaignActions';

import FeaturedResults from './FeaturedResults';

@connect(state => ({
  campaigns: state.campaigns
}), dispatch => ({
  fetchCampaigns() {
    dispatch(CampaignActions.fetchCampaigns());
  },
}))
export default class Home extends Component {
  componentWillMount () {
    this.props.fetchCampaigns()
  }

  render () {
    let { campaigns } = this.props;
    // console.log('campaigns: ', campaigns);
    return (
      <div>
        <div className='homeImageContainer'>
          <Image className='homeImage' src='https://pbs.twimg.com/media/CxHD3jiUUAEeK4F.jpg' fluid />
          <h2 className='homeMessage'><span>Support your charity, family member, or friend without spending an extra penny. Affiliato is a way for you to shop as you normally do, but funnels a percentage of your online purchases to your chosen beneficiary! There's no need to sign in. Simply find the campaign you want to support and shop through their affiliate links!</span></h2>
          {/* <h2 className='homeMessage'><span><p className='x'>Support your charity, family member, or friend without spending an extra penny. Affiliato is a way for you to shop as you normally do, but funnels a percentage of your online purchases to your chosen beneficiary! There's no need to sign in. Simply find the campaign you want to support and shop through their affiliate links!</p></span></h2> */}
          {/* <button>Sign Up and Support!</button> */}
        </div>
          <FeaturedResults />
      </div>
    );
  }
}
