import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon} from "semantic-ui-react";
import { createCampaign } from '../actions/CampaignActions';
import { browserHistory } from 'react-router';

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
    let { title, description, header, profile, storyImg, moneyExplain, amazonURL, about, terms } = values;
    const campaignObj = {
      title,
      description,
      about,
      moneyExplain,
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
  }
  render() {
    return (
      <Container className="campaign-form">
        <Header textAlign="center" as="h2" icon>
          <Icon name="newspaper" />
          Create Campaign
          <Header.Subheader>
            Include compelling images and descriptions of your story.
          </Header.Subheader>
        </Header>
        <Form onSubmit={() => this.handleSubmit()} size="big">
          <Form.Group widths="equal">
            <Form.Input label="Name" name="title" placeholder="Campaign Name" />
            <Form.Input label="Profile Picture" name="profile" placeholder="Link to Profile Pic" />
            <Form.Input label="Header Picture" name="header" placeholder="Link to Header Pic" />
          </Form.Group>
          <Form.TextArea name="description" label="Campaign Description" placeholder="Explain your campaign. . ." rows="3" />
          <Form.TextArea name="about" label="Who are you?" placeholder="Who are you?" rows="3" />
          <Form.TextArea name="moneyExplain" label="How are you going to spend the money?" placeholder="What are you going to spend the money on?" rows="3" />
          <Form.Group widths="equal">
            <Form.Input label="Story Picture" name="storyImg" placeholder="Link to Story Pic" />
            <Form.Input label="Amazon Affiliate Link" name="amazonURL" placeholder="Amazon Affiliate Link" />
          </Form.Group>
          <Form.Checkbox name="terms" label="I agree to the Terms and Conditions" />
          <Button fluid size="big" primary type="submit">Create Campaign</Button>
        </Form>
      </Container>
    );
  }
}
