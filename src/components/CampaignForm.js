import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon} from "semantic-ui-react";
import * as CampaignActions from '../actions/CampaignActions';

@connect(state => ({
  campaign: state.campaign,
}), dispatch => ({
  handler(data) {
    dispatch(CampaignActions.createCampaign(data));
  },
}))

export default class CampaignForm extends Component {
  handleSubmit(e, values) {
    let { handler } = this.props;
    e.preventDefault();
    handler(values);
  }
  render() {
    let { campaign } = this.props;
    return (
      <Container className="campaign-form">
        <Header textAlign="center" as="h2" icon>
          <Icon name="newspaper" />
          Create Campaign
          <Header.Subheader>
            Include compelling images and descriptions of your story.
          </Header.Subheader>
        </Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Input label="Name" name="title" placeholder="Campaign Name" />
            <Form.Input label="Profile Picture" name="profile" placeholder="Link to Profile Pic" />
            <Form.Input label="Header Picture" name="header" placeholder="Link to Header Pic" />
          </Form.Group>
          <Form.TextArea name="campaignDescription" label="Campaign Description" placeholder="Explain your campaign. . ." rows="3" />
          <Form.TextArea name="who" label="Who are you?" placeholder="Who are you?" rows="3" />
          <Form.TextArea name="money" label="How are you going to spend the money?" placeholder="What are you going to spend the money on?" rows="3" />
          <Form.Group widths="equal">
            <Form.Input label="Story Picture" name="storyImg" placeholder="Link to Story Pic" />
            <Form.Input label="Amazon Affiliate Link" name="amazonURL" placeholder="Amazon Affiliate Link" />
          </Form.Group>
          <Form.Checkbox name="terms" label="I agree to the Terms and Conditions" />
          <Button fluid primary type="submit">Create Campaign</Button>
        </Form>
      </Container>
    );
  }
}
