import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Container, Header, Feed, Grid, Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import { submitPost, getCampaign } from '../actions/CampaignActions';

const camp = '582a0dd9c28eb63519734218';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.getCamp(camp);
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
    const campObj = this.props.campaign[0];
    let posts;
    let header;
    let profilePic;
    let storyImg;
    let title;
    let postFeed = 'You do not yet have any posts';

    if (campObj) {
      posts = campObj.posts.reverse();
      header = campObj.assets.header;
      profilePic = campObj.assets.profile;
      storyImg = campObj.assets.storyImg;
      title = campObj.title;
      postFeed = (
        <Feed>
          {posts.map((post, i) => {
            const { title, body, timestamp } = post;
            return (
              <Feed.Event
                key={i}
                icon="pencil"
                date={moment(timestamp).format('dddd MMM Do')}
                summary={title}
                extraText={body}
              />
            );
          })}

        </Feed>
      );
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
            </Grid.Column>
            <Grid.Column width={10}>
              <Image src={storyImg} fluid />
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h2">Your Affiliate Links:</Header>
            </Grid.Column>

          </Grid.Row>
        </Grid>

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
      </Container>
    );
  }
}

const mapStateToProps = state => ({ campaign: state.campaign });

const mapDispatchToProps = dispatch => ({
  addPost(post, camp) {
    dispatch(submitPost(post, camp));
  },
  getCamp(campaign) {
    dispatch(getCampaign(campaign));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
