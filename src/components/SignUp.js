import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon} from "semantic-ui-react";
import * as CampaignActions from '../actions/CampaignActions';
import { browserHistory } from 'react-router';

import { signUpWithUserandPassword, signInWithGoogle } from '../actions/auth';


@connect(state => ({}), dispatch => ({
  googleSignIn() {
    dispatch(signInWithGoogle());
  },
  signUp(credentials) {
    dispatch(signUpWithUserandPassword(credentials));
  }
}))
export default class SignUp extends Component {
  submitSignUp = (e, credentials) => {
    e.preventDefault();
    this.props.signUp(credentials);

  }
  render() {
    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
        <Container class="login-form">
          <Header textAlign="center" as="h1" icon>
            <Icon name="user" />
            Login to Affiliato
          </Header>
          <Form onSubmit={this.submitSignUp}>
            <Form.Input label="Username" name="email" placeholder="Email" />
            <Form.Input label="Password" name="password" placeholder="Password" type='password'/>
            <Button fluid default type="submit">Sign Up</Button>
          </Form>
          <hr/>
          <p class='text-center or'>OR</p>
          <Button fluid primary onClick={() => {
            this.props.googleSignIn();
            browserHistory.push('/');
          }
          }><Icon name='google' size='large'></Icon>Sign In With Google</Button>
        </Container>
      </div>
    );
  }
}
