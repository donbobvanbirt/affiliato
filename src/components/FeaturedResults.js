import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as CampaignActions from '../actions/CampaignActions';

import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect(state => ({
  campaigns: state.campaigns
}), dispatch => ({
  setCampaign(campaign) {
    dispatch(CampaignActions.getCampaign(campaign));
  },
}))
export default class FeaturedResults extends Component {
  // componentWillReceiveProps (nextProps) {
  //   console.log('this.props: ', this.props);
  //   console.log('nextProps: ', nextProps);
  // }

  directToCampaign(id) {
    browserHistory.push(`/campaignProfile/${id}`);
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
             image={campaign.assets.profile}
             header={campaign.title}
             meta={campaign.type}
             onClick={() => this.directToCampaign(campaign._id)}
            //  onClick={this.directToCampaign.bind(this, campaign)}
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
