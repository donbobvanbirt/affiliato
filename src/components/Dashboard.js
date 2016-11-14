import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { submitPost } from '../actions/CampaignActions';

const camp = '582a0dd9c28eb63519734218';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    
  }

  submitForm = (e) => {
    e.preventDefault();
    // const { title, body } = this.state;
    // console.log('this.state:', this.state);
    this.props.addPost(this.state, camp);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
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
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost(post, camp) {
    dispatch(submitPost(post, camp));
  },
});

export default connect(null, mapDispatchToProps)(Dashboard);
