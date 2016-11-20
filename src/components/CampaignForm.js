import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form, Header, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

import { createCampaign } from '../actions/CampaignActions';

@connect(state => ({
  campaign: state.campaign,
  userId: state.user._id,
}), dispatch => ({
  createCampaign(campaignObj, userId) {
    dispatch(createCampaign(campaignObj, userId));
  },
}))
export default class CampaignForm extends Component {
  handleSubmit = (e, values) => {
    e.preventDefault();
    let { createCampaign, userId } = this.props;
    let { title, description, header, profile, storyImg, moneyExplain, amazonURL, about, terms, twitterHandle } = values;

    if (title && description && amazonURL) {
      if (!header) { header = 'https://stormideaswus.blob.core.windows.net/headerjunction/2014/91/6d2380c6-00e3-4f58-a911-c8aa98afa460.jpg' };
      if (!storyImg) { storyImg = 'https://stormideaswus.blob.core.windows.net/headerjunction/2014/91/d63adef3-99cf-411a-b2e3-e99a3e8e82e9.jpg' };
      if (!profile) { profile = 'http://www.sessionlogs.com/media/icons/defaultIcon.png' };
      const campaignObj = {
        title,
        description,
        about,
        moneyExplain,
        twitterHandle,
        affiliates: [{
          site: 'Amazon',
          url: amazonURL,
          clicks: 0,
        }],
        assets: {
          header,
          storyImg,
          profile,
        },
      };
      createCampaign(campaignObj, userId);
      browserHistory.push('/dashboard');
    } else {
      alert('Please complete all required fields');
    }
  }
  render() {
    const { campaign } = this.props;
    return (
      <Container className="campaign-form">
        <Header textAlign="center" as="h2" icon>
          <Icon name="newspaper" />
          Create Campaign
          <Header.Subheader>
            Include compelling images and descriptions of your story.
          </Header.Subheader>
        </Header>
        <Form onSubmit={this.handleSubmit.bind(this)} size="big">
          <Form.Group widths="equal">
            <Form.Input label="Name" name="title" placeholder="Campaign Name" required />

            <Form.Input label="Profile Picture" name="profile" placeholder="Link to Profile Pic" />
            <Form.Input label="Header Picture" name="header" placeholder="Link to Header Pic" />
          </Form.Group>
          <Form.TextArea name="description" label="Campaign Description" placeholder="Explain your campaign. . ." rows="3" required />
          <Form.TextArea name="about" label="Who are you?" placeholder="Who are you?" rows="3" />
          <Form.TextArea name="moneyExplain" label="How are you going to spend the money?" placeholder="What are you going to spend the money on?" rows="3" />
          <Form.Group widths="equal">
            <Form.Input label="Story Picture" name="storyImg" placeholder="Link to Story Pic" />
            <Form.Input label="Twitter Username" name="twitterHandle" placeholder="Twitter Username" />
            <Form.Input label="Amazon Affiliate Link" name="amazonURL" placeholder="Amazon Affiliate Link" required />
          </Form.Group>
          <Form.Checkbox name="terms" label="I agree to the Terms and Conditions" />
          <Button fluid size="big" primary type="submit">Create Campaign</Button>
        </Form>
      </Container>
    );
  }
}
