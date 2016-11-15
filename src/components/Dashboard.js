import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Container, Header, Feed } from 'semantic-ui-react';
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
    // const { posts } = this.props.campaign[0];
    const campObj = this.props.campaign[0];
    // console.log('this.props.campaign[0].posts:', this.props.campaign[0].posts);
    // console.log('campObj.posts', campObj.posts);
    let posts;
    // let posts = campObj.posts || null;

    let postFeed = 'You do not yet have any posts';

    if (campObj) {
      posts = campObj.posts.reverse();
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
