import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon} from "semantic-ui-react";
import * as CampaignActions from '../actions/CampaignActions';
import { browserHistory } from 'react-router';

@connect(state => ({}), dispatch => ({
  /*
  login(user) {
    dispatch(login(user));
  }
  */
}))
export default class CampaignForm extends Component {
  submitLogin = (e, values) => {
    e.preventDefault();
    console.log('values:', values);
  }
  render() {
    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
        <Container class="login-form">
          <Header textAlign="center" as="h1" icon>
            <Icon name="user" />
            Login to Affiliato
          </Header>
          <Form onSubmit={this.submitLogin}>
            <Form.Input label="Username" name="username" placeholder="Username" />
            <Form.Input label="Password" name="password" placeholder="Password" type='password'/>
            <Button fluid primary type="submit">Login</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
