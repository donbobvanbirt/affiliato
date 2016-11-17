import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as CampaignActions from '../actions/CampaignActions';

import FeaturedResults from './FeaturedResults';

@connect(state => ({
  campaigns: state.campaigns,
}), dispatch => ({
  fetchCampaigns() {
    dispatch(CampaignActions.fetchCampaigns());
  },
}))
export default class Home extends Component {
  componentWillMount() {
    this.props.fetchCampaigns();
  }

  render() {
    // let { campaigns } = this.props;
    return (
      <div className="ui container center aligned">
        <div className="homeImageContainer">
          <Image className="homeImage" src="https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200" fluid />
          {/* <Image className="homeImage" src="http://i.imgur.com/xp8EwZx.png" fluid /> */}
          {/* <Image className="homeImage" src="http://images.nationalgeographic.com/wpf/media-live/photos/000/004/cache/african-elephant_435_600x450.jpg" fluid /> */}
          <h2 className="homeMessage"><span>Support your charity, family member, or friend without spending an extra penny. Affiliato is a way for you to shop as you normally do, but funnels a percentage of your online purchases to your chosen beneficiary. There's no need to sign in. Simply find the campaign you want to support and shop through their affiliate links!<br />- Affiliato Staff</span></h2>
        </div>
        <Container>
          {/* <img src="assets/images/exploreText.png" alt="exploreText" /> */}
        </Container>
        <FeaturedResults />
      </div>
    );
  }
}
