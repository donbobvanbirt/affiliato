import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Button, Form ,Header, Icon, Grid, Image, Card, Input, Statistic , Segment} from "semantic-ui-react";
import * as CampaignActions from '../actions/CampaignActions';

@connect(state => ({
  campaign: state.campaign,
}), dispatch => ({
  trackClick(campaign){
    dispatch(CampaignActions.addClick(campaign));
  }
}))

export default class ClientPage extends Component {

  trackClick() {
    let { campaign, trackClick } = this.props;
    campaign.affiliates[0].clicks++;
    trackClick(campaign)
  }

  render() {
    let { campaign } = this.props;
    let { Label, Value } = Statistic;
    let who;
    let money;
    let amazonLink;
    let amazon = campaign.affiliates[0];
    if(amazon) {
      amazonLink = amazon.url
    }
    if(campaign.about) {
      who = <Container>
        <Header as='h2' attached='top'>
          Who am I?
        </Header>
        <Segment size='huge' attached>
          {campaign.about}
        </Segment>
      </Container>
    }
    if(campaign.moneyExplain) {
      money = <Container>
        <Header as='h2' attached='top'>
          What am I going to spend it on?
        </Header>
        <Segment size='huge' attached>
          {campaign.moneyExplain}
        </Segment>
      </Container>
    }
    return (
      <Container className="campaign-form">
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src={campaign.assets ? campaign.assets.header : ''} height='1px' fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Image src={campaign.assets ? campaign.assets.profile : ''} shape="circular"/>
              <Statistic>
                <Value value={campaign.affiliates[0].clicks} />
                <Label label='Clicks' />
              </Statistic>
            </Grid.Column>
            <Grid.Column width={8}>
              <Container>
                <Image src={campaign.assets ? campaign.assets.storyImg : ''} />
                <Header as='h2' attached='top'>
                  {campaign.title}
                </Header>
                <Segment size='huge' attached>
                  {campaign.description}
                </Segment>
              </Container>
              {who}
              {money}
            </Grid.Column>
            <Grid.Column width={5}>
              <Card className='affiliateCard'>
                <Card.Content>
                  <Image floated='right' size='mini' src='http://www.turnerduckworth.com/media/filer_public/86/18/86187bcc-752a-46f4-94d8-0ce54b98cd46/td-amazon-smile-logo-01-large.jpg' />
                  <Card.Header>
                    Amazon Online Store
                  </Card.Header>
                  <Card.Meta>
                    Affiliate Link
                  </Card.Meta>
                  <Card.Description>
                    <Input
                      action={{ color: 'teal', labelPosition: 'right', icon: 'copy' }}
                      defaultValue={amazonLink}
                    />
                  </Card.Description>
                </Card.Content>
                <Container>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button className="affiliateButton" basic fluid size="big" color='teal' onClick={this.trackClick.bind(this)}>Direct Link</Button>
                    </div>
                  </Card.Content>
                </Container>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
