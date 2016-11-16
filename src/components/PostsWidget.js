import React from 'react'
import { Card, Icon, Container, Image } from 'semantic-ui-react'

const extra = (props) => (
  <a>
    <Icon name='comment outline' />
    {props.timestamp}
  </a>
);

const PostsWidget = (props) => (
  <Container>
    {console.log('props:', props)}

    <Image src={props.campaign.assets ? props.campaign.assets.profile : ''} shape="circular"/>
    {props.campaign.posts.map((cur, i) => <Card key={i}
      header={cur.title}
      description={cur.body}
      extra={extra(cur)}
      fluid
                                          />)}

  </Container>
  )

  export default PostsWidget;
