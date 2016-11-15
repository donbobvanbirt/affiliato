import React from 'react'
import { Card, Icon, Container, Image } from 'semantic-ui-react'

const extra = (
  <a>
    <Icon name='comment outline' />
    Nov. 18th 3:40pm
  </a>
)

const PostsWidget = (props) => (
  <Container>
    {console.log('props:', props)}

    <Image src={props.profile} shape="circular"/>
    <Card
      header='Elliot Baker'
      meta='Save our Trees'
      description='This will be actual post.'
      extra={extra}
      fluid
    />
  </Container>
)

export default PostsWidget;
