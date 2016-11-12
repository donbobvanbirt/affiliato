import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

const options = [
  { text: 'All', value: 'all' },
  { text: 'Articles', value: 'articles' },
  { text: 'Products', value: 'products' }
];

export default class SearchInputForm extends Component {
  constructor () {
    super();
    this.state = {};
  }

  _grabSearchRequest (e, values) {
    e.preventDefault();
    console.log('values: ', values);
  }

  render () {
    // const { value } = this.state;
    return (
      <Form size='big' onSubmit={this._grabSearchRequest.bind(this)}>
        <Form.Group widths='equal'>
          <Form.Input label='Campaign' name='name' placeholder='Name of the campaign' />
          <Form.Input label='Username' name='username' placeholder='Username of the campaign holder' />
          <Form.Input label='Tags' name='tags' placeholder='Search by Tags' />
          <Form.Input label='Number of Supporters' name='supporters' placeholder='Search by number of Supporters' />
          <Form.Select label='Affiliates' name='affiliates' options={options} placeholder='Affiliates' />
          <Button basic color='black' icon='search' />
        </Form.Group>
        {/* <Form.Group inline>
          <label>Size</label>
          <Form.Radio label='Small' value='sm' checked={value === 'sm'} onChange={this.handleChange} />
          <Form.Radio label='Medium' value='md' checked={value === 'md'} onChange={this.handleChange} />
          <Form.Radio label='Large' value='lg' checked={value === 'lg'} onChange={this.handleChange} />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
      </Form>
    );
  }
}
