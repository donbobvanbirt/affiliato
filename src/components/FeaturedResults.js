import React, { Component } from 'react';
import { browserHistory } from 'react-router';
// import { Container } from 'semantic-ui-react'
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect(state => ({
  campaigns: state.campaigns
}), dispatch => ({
  fetchCampaigns() {
    dispatch(CampaignActions.fetchCampaigns());
  },
}))
export default class FeaturedResults extends Component {
  // componentWillReceiveProps (nextProps) {
  //   console.log('this.props: ', this.props);
  //   console.log('nextProps: ', nextProps);
  // }

  render () {
    let { campaigns } = this.props;
    console.log('this.props: ', this.props);
    console.log('campaigns 00: ', campaigns);
    let Campaigns = [];
    if (campaigns.length) {
      Campaigns =
        campaigns.map((campaign) => {
         console.log('campaign: ', campaign);
         return (
           <Card key={campaign._id}
             raised
             image={campaign.assets.profile}
             header={campaign.title}
             meta={campaign.type}
             description={campaign.description}
             extra={(
               <a>
                 <Icon name='user' />
                 {campaign.supporters.length}
               </a>
             )}
           />
         );
       })
    }
    return (
      <div>
        <Card.Group>
          {Campaigns}
        </Card.Group>
      </div>

    );
  }
}
