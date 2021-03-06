import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// import { Menu, Segment, Input, Form } from 'semantic-ui-react';
import { Navbar }
import { signOut } from '../actions/auth';

@connect(state=> ({
  loggedIn: !!state.user._id,
  user: state.user
}), dispatch => ({
  signOut() {
    dispatch(signOut());
  }
  /*
  search(q) {
    dispatch(search(q));
  }
  */
}))
export default class Navbar extends Component {
  constructor() {
      super();

      this.state = {
        active: 'home'
      }

    }

  handleItemClick = (name, path) => {
    this.setState({ active: name });
    browserHistory.push(path);
  }

  search = (e, formInput) => {
    e.preventDefault();
    let { query } = formInput;
    console.log('query: ', query);
    console.log('serializedForm:', `/search/${encodeURI(query)}`);
    // call action to search(query);
    // |||||||||||||||||||||||||
    // @#$%^&*()_(*(^&%$))
    browserHistory.push(`/search/${encodeURI(query)}`);
  }

  render() {
    const { active } = this.state;
    const { user } = this.props;

    return (
      <Segment className='orangeColor' size='huge' attached>
        {this.props.loggedIn?
          <Menu className='orangeColor mainNav' size='huge' inverted secondary>
            <Menu.Item name='home' active={active === 'home'} onClick={() => {
              this.handleItemClick('home', '/');
            }} />
            <Menu.Item name='Create New Campaign' active={active === 'createNewCamp'} onClick={() => {
              this.handleItemClick('createNewCamp', '/createNewCampaign');
            }} />
            <Menu.Item className='navbarLogo'>
              <img src='assets/images/affiliatoLogoTransparent.png' />
              {/* <Menu.Item src='../../public/assets/images/affiliatoLogo.png' /> */}
            </Menu.Item>
              <Menu.Menu position='right'>

                <Menu.Item>
                  {/* <Form> */}
                  <Form onSubmit={this.search.bind(this)}>
                    <Form.Field>
                      <Input name='query' icon='search' id='searchInput' icon={{ name: 'search', link: true}} placeholder='Search' />
                      {/* <Input name='query' icon='search' id='searchInput' icon={{ name: 'search', link: true}} placeholder='Search' onClick={this.search.bind(this)} /> */}
                    </Form.Field>
                  </Form>
                </Menu.Item>

                <Menu.Item name='Dashboard' active={active === 'dashboard'} onClick={() => {
                  this.handleItemClick('dashboard', '/dashboard');
                }} />
                <Menu.Item name='Log Out' active={active === 'logOut'} onClick={() => {
                  this.props.signOut();
                  browserHistory.push('/login');
                }} />
              </Menu.Menu>
            </Menu>
            :
            <Menu className='orangeColor mainNav' size='huge' inverted secondary>
              <Menu.Item name='home' active={active === 'home'} onClick={() => {
                this.handleItemClick('home', '/');
              }} />
              <Menu.Item name='Create New Campaign' active={active === 'createNewCamp'} onClick={() => {
                this.handleItemClick('createNewCamp', '/login');
              }} />
              <Menu.Menu position='right'>
                <Menu.Item name='Sign Up' active={active === 'signUp'} onClick={() => {
                  this.handleItemClick('signUp', '/register');
                }} />
                <Menu.Item name='Log In' active={active === 'logIn'} onClick={() => {
                  this.handleItemClick('logIn', '/login');
                }} />
              </Menu.Menu>
            </Menu>
          }
      </Segment>
    )
  }
}
