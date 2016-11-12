import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class SearchPage extends Component {
  constructor () {
    super();
    this.state = {};
    // this._grabSearchRequest = this._grabSearchRequest.bind(this);
  }

  // _grabSearchRequest (e, { value }) {
  //   this.setState({ value });
  //   console.log('Sanity:');
  // }

  render () {
    //  let { users } = this.props;
    // let { campaigns } = users;
    const campaigns = [
      {
        type: 'personal',
        name: 'Elliot Baker',
        _id: 1,
        img: 'http://semantic-ui.com/images/avatar/large/elliot.jpg',
        story: 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
        supporters: 162
      },
      {
        type: 'cause',
        name: 'Free California',
        _id: 2,
        img: 'http://semantic-ui.com/images/avatar/large/elliot.jpg',
        story: 'Free California! California is a state that can flourish without the supervision of the government. Make California Great Again.',
        supporters: 3842
      },
      {
        type: 'organization',
        name: 'San Francisco Zoo',
        _id: 3,
        img: 'http://semantic-ui.com/images/avatar/large/elliot.jpg',
        story: 'The San Francisco Zoo on market street has been a steadfast landmark holding a great historical importance to this city. The costs to maintain the animals and wildlife near a couple of million dollars each month. We aim to keep our doors open free at no cost to the public.',
        supporters: 20391
      },
      {
        type: 'personal',
        name: 'Teenage Jesus',
        _id: 4,
        img: 'http://semantic-ui.com/images/avatar/large/elliot.jpg',
        story: 'Teenage Jesus can\'t afford his carpenting lessons.',
        supporters: 55
      }
    ];
    return (
      <Card.Group itemsPerRow={4}>
      {
        campaigns.map((campaign) => {
          return (
            <Card key={campaign._id}
              raised
              image={campaign.img}
              header={campaign.name}
              meta={campaign.type}
              description={campaign.story}
              extra={(
                <a>
                  <Icon name='user' />
                  {campaign.supporters}
                </a>
              )}
            />
          );
        })
      }
      </Card.Group>
    );
  }
}

//  TODO Add Loading segment when running search algo
  // <Segment loading>
  //   <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
  // </Segment>
