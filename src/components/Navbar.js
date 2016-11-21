import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Segment, Input, Form } from 'semantic-ui-react';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { signOut } from '../actions/auth';

@connect(state => ({
  loggedIn: !!state.user._id,
  user: state.user,
}), dispatch => ({
  signOut() {
    dispatch(signOut());
  },
  /*
  search(q) {
    dispatch(search(q));
  }
  */
}))
export default class Navbar1 extends Component {
  constructor() {
    super();

    this.state = {
      active: 'home',
      burger: 'burgerContainer',
    };
    // this._toggleBurger = this._toggleBurger.bind(this);
  }

  handleItemClick = (name, path) => {
    this.setState({ active: name });
    browserHistory.push(path);
  }

  search = (e, formInput) => {
    e.preventDefault();
    const { query } = formInput;
    console.log('serializedForm:', `/search/${encodeURI(query)}`);
    // call action to search(query);
    // |||||||||||||||||||||||||
    // @#$%^&*()_(*(^&%$))
    browserHistory.push(`/search/${encodeURI(query)}`);
  }

  _toggleBurger() {
    let { burger } = this.state;
    console.log('burger: ', burger);
    burger === 'burgerContainer' ? burger = 'burgerContainer change' : burger = 'burgerContainer';
    this.setState({
      burger,
    });
  }

  render() {
    const { active, burger } = this.state;

    let Dropdown = '';
    if (burger === 'burgerContainer change') {
      this.props.loggedIn?
      Dropdown = (
        <ul className="topnav responsive" id="myTopnav">
          <Link className="burgerLink" to="/">Home</Link>
          <Link className="burgerLink" to="/createNewCampaign">Create a Campaign</Link>
          <Link className="burgerLink" to="/search">Search</Link>
          <Link className="burgerLink" to="/dashboard">Dashboard</Link>
          <Link
            className="burgerLink" to="/login" onClick={() => {
              this._toggleBurger();
              this.props.signOut();
              // browserHistory.push('/login');
            }}
          >Log Out</Link>
        </ul>
    )
    :
    Dropdown = (
      <ul className="topnav responsive" id="myTopnav">
        <Link className="burgerLink" to="/">Home</Link>
        <Link className="burgerLink" to="/login">Create a Campaign</Link>
        <Link className="burgerLink" to="/search">Search</Link>
        <Link
          className="burgerLink" to="/login" onClick={() => {
            this._toggleBurger();
            this.props.signOut();
            // browserHistory.push('/login');
          }}
        >Log In</Link>
      </ul>
  );
    }

    return (
      <div>
        <Segment className="orangeColor" size="huge" attached>
          {
            this.props.loggedIn?
              <Menu className="orangeColor mainNav" size="huge" inverted secondary>
                <Menu.Item
                  className="navHome" name="home" active={active === 'home'} onClick={() => {
                    this.handleItemClick('home', '/');
                  }}
                />
                <Menu.Item
                  className="navNewCampaign" name="Create A Campaign" active={active === 'createNewCamp'} onClick={() => {
                    this.handleItemClick('createNewCamp', '/createNewCampaign');
                  }}
                />
                <Menu.Item className="navbarLogo">
                  <img src="assets/images/affiliatoLogoTransparent.png" alt="Affiliato Logo" />
                  {/* <Menu.Item src="../../public/assets/images/affiliatoLogo.png" /> */}
                </Menu.Item>
                <Menu.Menu position="right">

                  <Menu.Item>
                    {/* <Form> */}
                    <Form className="navSearchForm" onSubmit={this.search.bind(this)}>
                      <Form.Field>
                        <Input name="query" id="searchInput" icon={{ name: 'search', link: true}} placeholder="Search" />
                        {/* <Input name="query" icon="search" id="searchInput" icon={{ name: "search", link: true}} placeholder="Search" onClick={this.search.bind(this)} /> */}
                      </Form.Field>
                    </Form>
                  </Menu.Item>

                  <Menu.Item
                    className="navDashboard" name="Dashboard" active={active === 'dashboard'} onClick={() => {
                      this.handleItemClick('dashboard', '/dashboard');
                    }}
                  />
                  <Menu.Item
                    className="navLogout" name="Log Out" active={active === 'logOut'} onClick={() => {
                      this.props.signOut();
                      browserHistory.push('/login');
                    }}
                  />
                  <Menu.Item>
                    <div className={burger} onClick={() => this._toggleBurger()}>
                      <div className="bar1" />
                      <div className="bar2" />
                      <div className="bar3" />
                    </div>
                  </Menu.Item>
                </Menu.Menu>

              </Menu>
              :
              <Menu className="orangeColor mainNav" size="huge" inverted secondary>
                <Menu.Item
                  name="home" active={active === 'home'} onClick={() => {
                    this.handleItemClick('home', '/');
                  }}
                />
                <Menu.Item
                  name="Create New Campaign" active={active === 'createNewCamp'} onClick={() => {
                    this.handleItemClick('createNewCamp', '/login');
                  }}
                />
                <Menu.Menu position="right">
                  <Menu.Item>
                    {/* <Form> */}
                    <Form className="navSearchForm" onSubmit={this.search.bind(this)}>
                      <Form.Field>
                        <Input name="query" id="searchInput" icon={{ name: 'search', link: true}} placeholder="Search" />
                      </Form.Field>
                    </Form>
                  </Menu.Item>
                  {/* <Menu.Item
                    name="Sign Up" active={active === 'signUp'} onClick={() => {
                      this.handleItemClick('signUp', '/register');
                    }}
                  /> */}
                  <Menu.Item
                    name="Log In" active={active === 'logIn'} onClick={() => {
                      this.handleItemClick('logIn', '/login');
                    }}
                  />
                </Menu.Menu>
                <Menu.Item>
                  <div className={burger} onClick={() => this._toggleBurger()}>
                    <div className="bar1" />
                    <div className="bar2" />
                    <div className="bar3" />
                  </div>
                </Menu.Item>
              </Menu>
            }
        </Segment>
        { Dropdown }
      </div>
    );
  }
}
