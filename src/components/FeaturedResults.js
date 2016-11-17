import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as CampaignActions from '../actions/CampaignActions';

import { Card, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect(state => ({
  campaigns: state.campaigns
}), dispatch => ({
  setCurrentCampaign(campaign) {
    dispatch(CampaignActions.setCurrentCampaign(campaign));
  },
}))
export default class FeaturedResults extends Component {
  // componentWillReceiveProps (nextProps) {
  //   console.log('this.props: ', this.props);
  //   console.log('nextProps: ', nextProps);
  // }

  directToCampaign (campaign) {
    console.log('campaign: ', campaign);
    this.props.setCurrentCampaign(campaign);
    browserHistory.push('/campaignProfile');
  }

  render () {
    let { campaigns } = this.props;
    console.log('this.props: ', this.props);
    console.log('campaigns 00: ', campaigns);
    let Campaigns = [];
    if (campaigns.length) {
      Campaigns =
        campaigns.map((campaign) => {
         return (
           <Card key={campaign._id}
             raised
             centered
             image={campaign.assets.profile}
             header={campaign.title}
             meta={campaign.type}
             onClick={this.directToCampaign.bind(this, campaign)}
             description={campaign.description}
             extra={(
               <a>
                 <Icon name="user" />
                 {campaign.supporters.length}
               </a>
             )}
           />
         );
        });
    }
    return (
      <Grid textAlign="center" className="featuredContainer">
      {/* <div className='centerMePlease'> */}
          {/* <Card.Group doubling> */}
          {/* <Card.Group stackable> */}

              {Campaigns}

          {/* </Card.Group> */}
      {/* </div> */}
      </Grid>

    );
  }
}
