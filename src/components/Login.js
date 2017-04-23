import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon} from "semantic-ui-react";
import * as CampaignActions from '../actions/CampaignActions';
import { browserHistory } from 'react-router';

import { signInWithGoogle } from '../actions/auth';


@connect(state => ({}), dispatch => ({
  googleSignIn() {
    dispatch(signInWithGoogle());
  }
}))
export default class CampaignForm extends Component {
  submitLogin = (e, values) => {
    e.preventDefault();
    console.log('values:', values);
    // action to check auth(values);
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
            <Button fluid default type="submit">Login</Button>
          </Form>
          <hr/>
          <Button fluid primary onClick={() => {
            this.props.googleSignIn();
            browserHistory.push('/');
          }
          }><Icon name='google' size='large'></Icon>Sign In With Google</Button>
<<<<<<< HEAD
=======
          <p class='text-center or'>OR</p>
          <Button fluid primary onClick={() => {
            browserHistory.push('/signUp');
          }
          }><Icon name='email' color='red' size='large'></Icon>Sign Up With Email</Button>
>>>>>>> 472bca59187508fa92c9009d1d8fe780975fc331
        </Container>
      </div>
    );
  }
}
