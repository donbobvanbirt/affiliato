import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Container, Header, Feed, Grid, Image, List, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import PostsWidget from './PostsWidget';
import { submitPost, getCampaign } from '../actions/CampaignActions';

let camp;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.addPost(this.state, camp);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const campObj = this.props.campaign;
    camp = campObj._id;

    let header;
    let profilePic;
    let storyImg;
    let title;
    let affiliateList = 'You do not yet have any affiliates';
    let postFeed = 'You do not yet have any posts';

    if (campObj.posts) {
      // posts = campObj.posts.reverse();
      header = campObj.assets.header;
      profilePic = campObj.assets.profile;
      storyImg = campObj.assets.storyImg;
      title = campObj.title;
      postFeed = (
        <PostsWidget campaign={campObj} />
      );
      if (campObj.affiliates.length) {
        affiliateList = (
          <List>
            {campObj.affiliates.map((affil, i) => {
              const { clicks, site, url } = affil;
              return (
                <List.Item key={i}>
                  <List.Icon name="linkify" />
                  <List.Content content={<a href={url} target="_blank" rel="noopener noreferrer">{site}</a>} />
                  <List.Description><Icon name="mouse pointer" /> {clicks} clicks</List.Description>
                </List.Item>
              );
            })}
          </List>
        );
      }
    }

    return (
      <Container>

        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src={header} fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={profilePic} fluid />
              <Header as="h2">{title}</Header>
              <Button primary>Edit Campaign</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Image src={storyImg} fluid />
              <Header as="h2">Add Post:</Header>
              <Form onSubmit={this.submitForm}>
                <Form.Group widths="equal">
                  <Form.Field control={Input} label="Title" name="title" onChange={this.handleChange} placeholder="Title" />
                </Form.Group>
                <Form.Field control={TextArea} label="body" name="body" onChange={this.handleChange} placeholder="Start typing..." />
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>

              <Header as="h2">Your Posts:</Header>
              {postFeed}
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h2">Your Affiliate Links:</Header>
              {affiliateList}
            </Grid.Column>

          </Grid.Row>
        </Grid>


      </Container>
    );
  }
}

const mapStateToProps = state => ({ campaign: state.userCampaign });

const mapDispatchToProps = dispatch => ({
  addPost(post, camp) {
    dispatch(submitPost(post, camp));
  },
  getCamp(campaign) {
    dispatch(getCampaign(campaign));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
