import React from 'react';
import { Card, Icon, Container, Image } from 'semantic-ui-react';
import moment from 'moment'

const extra = props => (
  <a>
    <Icon name="comment outline" />
    {moment(props.timestamp).format('h:mm:ss a, MMM D Y')}
  </a>
);

const PostsWidget = props => (
  <Container>

    {props.campaign.posts.map((cur, i) =>
      <Card
        key={i}
        header={cur.title}
        description={cur.body}
        extra={extra(cur)}
        className="posts"
        fluid
      />)}

  </Container>
);

export default PostsWidget;
