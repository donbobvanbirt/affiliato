import React, { Component } from 'react';
// import { input } from "semantic-ui-react"
import SearchInputForm from './SearchInputForm';
import SearchResults from './SearchResults';
import { Container, Segment } from 'semantic-ui-react';

export default class SearchPage extends Component {
  render () {
    return (
      <Container className='searchPage'>
        {/* <div className='searchFilterContainer'> */}
        <Segment padded textAlign='center'>
          <SearchInputForm />
        </Segment>
        {/* </div> */}
        <div className='searchListContainer'>
          <SearchResults />
        </div>
      </Container>
    );
  }
}
