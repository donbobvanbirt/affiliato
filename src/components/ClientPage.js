import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Header, Grid, Image, Card, Input, Statistic, Segment } from 'semantic-ui-react';
import * as CampaignActions from '../actions/CampaignActions';

import PostsWidget from './PostsWidget';
import Tweets from './Tweets';

@connect(state => ({
  campaign: state.campaign[0],
}), dispatch => ({
  trackClick(campaign) {
    dispatch(CampaignActions.addClick(campaign));
  },
  setCampaign(campaign) {
    dispatch(CampaignActions.getCampaign(campaign));
  },
}))

export default class ClientPage extends Component {

  trackClick() {
    let { campaign, trackClick } = this.props;
    campaign.affiliates[0].clicks++;
    trackClick(campaign);
  }

  componentWillMount() {
    let { id } = this.props.params;
    this.props.setCampaign(id);
  }

  render() {
    let { campaign } = this.props;
    console.log('campaign', campaign);
    const { Label, Value } = Statistic;
    let who;
    let money;
    let amazonLink;
    let headerImg;
    let profileImg;
    let storyPic;
    let linkClicks = 0;
    let campTitle;
    let campDescription;
    let postWidget;
    let tweetList = '';

    if (campaign) {
      const amazon = campaign.affiliates[0];
      headerImg = campaign.assets.header;
      profileImg = campaign.assets.profile;
      storyPic = campaign.assets.storyImg;
      linkClicks = campaign.affiliates[0].clicks;
      campTitle = campaign.title;
      campDescription = campaign.description;
      postWidget = <PostsWidget campaign={campaign} />;
      if (campaign.twitterHandle) {
        tweetList = (
          <Tweets twitterUserName={campaign.twitterHandle} />
        )
      }
      if (amazon) {
        amazonLink = amazon.url;
      }
      if (campaign.about) {
        who = (
          <Container>
            <Header as="h2" attached="top">
              Who am I?
            </Header>
            <Segment size="huge" attached>
              {campaign.about}
            </Segment>
          </Container>
      );
      }
      if (campaign.moneyExplain) {
        money = (
          <Container>
            <Header as="h2" attached="top">
              What am I going to spend it on?
            </Header>
            <Segment size="huge" attached>
              {campaign.moneyExplain}
            </Segment>
          </Container>
        );
      }
    }
    return (
      <Container className="campaign-form">
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src={headerImg} height="1px" fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Image src={profileImg} shape="circular" />
              <Statistic>
                <Value value={linkClicks} />
                <Label label="Clicks" />
              </Statistic>
            </Grid.Column>
            <Grid.Column width={8}>
              <Container>
                <Image src={storyPic} />
                <Header as="h2" attached="top">
                  {campTitle}
                </Header>
                <Segment size="huge" attached>
                  {campDescription}
                </Segment>
              </Container>
              {who}
              {money}
              <Container>
                <Header as='h2' attached='top'>
                  Recent Posts
                </Header>
                {postWidget}
              </Container>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card className="affiliateCard">
                <Card.Content>
                  <Image floated="right" size="mini" src="http://www.turnerduckworth.com/media/filer_public/86/18/86187bcc-752a-46f4-94d8-0ce54b98cd46/td-amazon-smile-logo-01-large.jpg" />
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
                    <div className="ui two buttons">
                      <Button className="affiliateButton" basic fluid size="big" color="teal" onClick={() => this.trackClick()}>Direct Link</Button>
                    </div>
                  </Card.Content>
                </Container>
              </Card>
              <div id="tweetWidget"></div>
              {tweetList}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
