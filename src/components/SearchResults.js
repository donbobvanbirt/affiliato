import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as SearchActions from '../actions/SearchActions';

@connect(state => ({
  advSearchQuery: state.advSearchQuery,
  campaigns: state.campaigns,
  filteredCampaigns: state.filteredCampaigns,
}), dispatch => ({
  resetFilter() {
    dispatch(SearchActions.resetFilteredCampaigns());
  },
}))

// TODO Allow to search again with the Search NavBar

// TODO add route for /search
export default class SearchResults extends Component {
  constructor() {
    super();
    this.state = {};
    // this._grabSearchRequest = this._grabSearchRequest.bind(this);
  }

  componentWillMount() {
    const { query, campaigns } = this.props;
    // console.log('query in Results: ', query);
    // console.log('campaigns: ', campaigns);
    if (campaigns.length) {
      let navbarSearch = campaigns.filter((campaign) => {
        if (campaign.title === query) {
          console.log('Sanity:Caught Query');
          return campaign;
        }
      });
      // console.log('navbarSearch: ', navbarSearch);
      this.setState({
        navbarSearch
      });
    }
  }

  componentWillUnmount() {
    console.log('Sanity:unmounted');
    this.props.resetFilter();
  }

// TODO Allow to search again with the Search NavBar
  // componentDidUpdate () {
  //   let { query, campaigns } = this.props;
  //   console.log('query in Results: ', query);
  //   console.log('campaigns: ', campaigns);
  //   let navbarSearch = campaigns.filter((campaign) => {
  //     if (campaign.title === query) {
  //       console.log('Sanity:Caught Query');
  //       return campaign;
  //     }
  //   });
  //   console.log('navbarSearch: ', navbarSearch);
  //   this.setState({
  //     navbarSearch
  //   })
  // }

  render() {
    let { campaigns, advSearchQuery, filteredCampaigns } = this.props;
    const { navbarSearch } = this.state;
    // console.log('this.props: ', this.props);
    // console.log('advSearchQuery: ', advSearchQuery);
    // console.log('all campaigns: ', campaigns);
    // console.log('navbarSearch: ', navbarSearch);
    console.log('filteredCampaigns in SearchResults: ', filteredCampaigns);
    let search;
    filteredCampaigns.length ? search = filteredCampaigns : search = navbarSearch;
    console.log('search: ', search);
    let Campaigns = [];
    if (campaigns.length) {
      Campaigns =
        search.map((campaign) => {
        //  console.log('campaign: ', campaign);
         return (
           <Card key={campaign._id}
             raised
             image={campaign.assets.profile}
             header={campaign.title}
             meta={campaign.type}
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

//  TODO Add Loading segment when running search algo
  // <Segment loading>
  //   <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
  // </Segment>
