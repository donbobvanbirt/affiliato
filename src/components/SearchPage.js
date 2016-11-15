import React, { Component } from 'react';
// import { input } from "semantic-ui-react"
import SearchInputForm from './SearchInputForm';
import SearchResults from './SearchResults';
import { Container, Segment } from 'semantic-ui-react';

export default class SearchPage extends Component {
  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    let query = this.props.params.query;
    this.setState({
      query
    });
  }

  render () {
    let { query } = this.state;
    return (
      <Container className='searchPage'>
        {/* <div className='searchFilterContainer'> */}
        <Segment padded textAlign='center'>
          <SearchInputForm />
        </Segment>
        {/* </div> */}
        <div className='searchListContainer'>
          <SearchResults query={query} />
        </div>
      </Container>
    );
  }
}
