import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Header, Grid, Image, Card, Input, Statistic, Segment, Icon } from 'semantic-ui-react';
import * as CampaignActions from '../actions/CampaignActions';

import PostsWidget from './PostsWidget';
import Tweets from './Tweets';
import style from '../css/app.css';

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
    campaign.affiliates[0].clicks += 1;
    document.open(`${campaign.affiliates[0].url}`, 'Affiliate Link', "location=yes,resizable=yes,scrollbars=yes,status=yes");
    trackClick(campaign);
  }

  componentWillMount() {
    let { id } = this.props.params;
    this.props.setCampaign(id);
  }

  tweet() {
    let { campaign } = this.props;
    const status = `Support me on Affiliato. https://affiliato.com/campaignprofile/${campaign._id}`;
    document.open(`http://twitter.com/home?status=${status}`, "Share on Twitter", "location=yes,resizable=yes,scrollbars=yes,status=yes");
  }


  render() {
    let { campaign } = this.props;
    console.log('campaign', campaign);
    // const { Label, Value } = Statistic;
    let who;
    let money;
    let amazonLink;
    let headerImg;
    let profileImg;
    let storyPic;
    // let linkClicks = 0;
    let campTitle;
    let campDescription;
    let postWidget;
    let tweetList = '';

    if (campaign) {
      const amazon = campaign.affiliates[0];
      headerImg = campaign.assets.header;
      profileImg = campaign.assets.profile;
      storyPic = campaign.assets.storyImg;
      // linkClicks = campaign.affiliates[0].clicks;
      campTitle = campaign.title;
      campDescription = campaign.description;
      postWidget = <PostsWidget campaign={campaign} />;
      if (campaign.twitterHandle) {
        console.log('campaign.twitterHandle:', campaign.twitterHandle)
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
    const style = {
      background: `url(${headerImg}) no-repeat center center fixed`,
    };
    return (
      // <div className="campaignProf">
      //   <div className="header-Prof" style={style}></div>
      //   <div className="">
      //     <Image src={profileImg} className="marginzero" shape="circular" />
      //     <h3>Share this campaign on Twitter</h3>
      //     <Button color="twitter" onClick={this.tweet.bind(this)}>
      //       <Icon name="twitter" /> Tweet It
      //     </Button>
      //   </div>
      //
      // </div>
      <div className="wrapper">
        <header className="header header-Prof" style={style}></header>
        <article className="main">
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
        </article>
        <aside className="aside aside-1">
          <Image className="prof-img" size="medium" src={profileImg}></Image>
          <h3>Share this campaign on Twitter</h3>
          <Button color="twitter" onClick={this.tweet.bind(this)}>
            <Icon name="twitter" /> Tweet It
          </Button>
        </aside>
        <aside className="aside aside-2">
          <div className="flexCenter">
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
          </div>
        </aside>
        <footer className="footer">Footer</footer>
      </div>
      /* <Container className="paddingzero">

        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column className='paddingzero' width={16}>
              <Image src={headerImg} height="1px" fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Image src={profileImg} className="marginzero" shape="circular" />
              <h3>Share this campaign on Twitter</h3>
              <Button color="twitter" onClick={this.tweet.bind(this)}>
                <Icon name="twitter" /> Tweet It
              </Button>

            </Grid.Column>
            <Grid.Column width={8} className='whitebg'>
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
      </Container> */
    );
  }
}
