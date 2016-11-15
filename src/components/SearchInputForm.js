import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as SearchActions from '../actions/SearchActions';

const options = [
  { text: 'Amazon', value: 'Amazon' },
  { text: 'GoogleExpress', value: 'GoogleExpress' },
  { text: 'Netflix', value: 'Netflix' }
];

@connect(state => ({
  campaigns: state.campaigns
}), dispatch => ({
  // send(advSearchQuery) {
  //   dispatch(SearchActions.sendAdvSearchQuery(advSearchQuery));
  // },
  send(filteredCampaigns) {
    dispatch(SearchActions.sendFilteredCampaigns(filteredCampaigns));
  },
}))

//  TODO change username serach input to something else
export default class SearchInputForm extends Component {
  constructor () {
    super();
    this.state = {};
  }

  _grabSearchRequest (e, values) {
    e.preventDefault();
    let { campaigns } = this.props;

    // SETTING only asked queries
    let keys = Object.keys(values);
    let advSearchQuery = {};
    keys.forEach((key) => {
      //  HACK take out key !== affiliates to implement affiliates search
      if (values[key] !== '' && key !== 'affiliates') {
        console.log('Sanity:');
        advSearchQuery[key] = values[key];
      }
    });

    // Filtering according to the set queries
    let advKeys = Object.keys(advSearchQuery);
    // console.log('advKeys: ', advKeys);
    let filteredCampaigns = campaigns.filter((campaign) => {
      let res = false;
      advKeys.forEach(key => {
        // console.log('key: ', key);
        // console.log('campaign: ', campaign);
        // console.log('campaign[key]: ', campaign[key]);
        // console.log('advSearchQuery[key]: ', advSearchQuery[key]);
        if (campaign[key] === advSearchQuery[key]) {
          res = true;
        }
      })
      if (res === true) {
        return campaign;
      }
    })
    // console.log('filteredCampaigns: ', filteredCampaigns);
    this.props.send(filteredCampaigns);
  }

  render () {
    // const { value } = this.state;
    return (
      <Form size="big" onSubmit={this._grabSearchRequest.bind(this)}>
        <Form.Group widths="equal">
          <Form.Input label="Campaign" name="title" placeholder="Name of the campaign" />
          <Form.Input label="Username" name="username" placeholder="Search Users" />
          <Form.Input label="Tags" name="tags" placeholder="Search by Tags" />
          {/* <Form.Input label="Number of Supporters" name="supporters" placeholder="Search by number of Supporters" /> */}
          <Form.Select label="Affiliates" name="affiliates" options={options} placeholder="Affiliates" />
          <Button className="advancedSearchButton" basic color="black" icon="search" />
        </Form.Group>
        {/* <Form.Group inline>
          <label>Size</label>
          <Form.Radio label='Small' value='sm' checked={value === 'sm'} onChange={this.handleChange} />
          <Form.Radio label='Medium' value='md' checked={value === 'md'} onChange={this.handleChange} />
          <Form.Radio label='Large' value='lg' checked={value === 'lg'} onChange={this.handleChange} />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
      </Form>
    );
  }
}
