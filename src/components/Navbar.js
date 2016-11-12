import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Segment, Input, Form } from 'semantic-ui-react';

@connect(state=> ({
  user: state.user
}), dispatch => ({
  /*
  search(q) {
    dispatch(search(q));
  }
  */
}))
export default class MenuExampleInvertedSegment extends Component {
  constructor() {
      super();

      this.state = {
        active: 'home'
      }

      this.handleItemClick = this.handleItemClick.bind(this);
      this.search = this.search.bind(this);
    }

  handleItemClick(name, path) {
    this.setState({ active: name });
    browserHistory.push(path);
  }

  search(e, formInput) {
    e.preventDefault();
    // let query = e.target.value;
    let { query } = formInput;
    console.log('serializedForm:', `/search/${encodeURI(query)}`);
    // call action to search(query);
    // |||||||||||||||||||||||||
    // @#$%^&*()_(*(^&%$))
    browserHistory.push(`/search/${encodeURI(query)}`);
  }

  render() {
    console.log('this.state.active:', this.state.active);
    const { active } = this.state;
    const { user } = this.props;

    return (
      <Segment className='orangeColor' size='large' attached>
        {!user?
          <Menu className='orangeColor mainNav' size='large' inverted secondary>
            <Menu.Item name='home' active={active === 'home'} onClick={() => {
              this.handleItemClick('home', '/');
            }} />
            <Menu.Item name='Create New Campaign' active={active === 'createNewCamp'} onClick={() => {
              this.handleItemClick('createNewCamp', '/createNewCampaign');
              }} />
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
                  this.handleItemClick('logOut', '/');
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
