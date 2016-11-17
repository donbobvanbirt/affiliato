import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Container, Header, Feed, Grid, Image, List, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import PostsWidget from './PostsWidget';
import { submitPost, getCampaign, editCampaign, removeCampaign } from '../actions/CampaignActions';

let camp;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { open: false, deleteOpen: false };
  }
  submitForm = (e) => {
    e.preventDefault();
    this.props.addPost(this.state, camp);
  }
  submitEditForm = (e, values) => {
    e.preventDefault();
    let { editCamp, campaign } = this.props;
    let { title, description, header, profile, storyImg, moneyExplain, amazonURL, about, terms } = values;
    const campaignObj = {
      title,
      description,
      about,
      moneyExplain,
      affiliates: [{
        site: 'Amazon',
        url: amazonURL,
        clicks: 0,
      }],
      assets: {
        header,
        storyImg,
        profile,
      },
    };
    // console.log('campaignObj:', campaignObj);
    editCamp(campaignObj, campaign._id);
    this.setState({ open: false });
  }

  preview = () => {
    browserHistory.push(`campaignProfile/${this.props.campaign._id}`);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  show = () => this.setState({ open: true })

  hide = () => this.setState({ open: false })

  deleteModalShow = () => this.setState({ deleteOpen: true })

  hideDelete = () => this.setState({ deleteOpen: false })

  deleteCampaign = () => {
    let { removeCamp, campaign } = this.props;
    removeCamp(campaign._id);
    browserHistory.push('/');
  }

  render() {
    const campObj = this.props.campaign;
    const { open, deleteOpen } = this.state;

    let header;
    let profilePic;
    let storyImg;
    let title;
    let description;
    let moneyExplain;
    let about;
    let affiliateList = 'You do not yet have any affiliates';
    let postFeed = 'You do not yet have any posts';
    let affiliateLink;

    if (campObj) {
      camp = campObj._id;
    }

    if (campObj.posts) {
      header = campObj.assets.header;
      profilePic = campObj.assets.profile;
      storyImg = campObj.assets.storyImg;
      title = campObj.title;
      description = campObj.description;
      moneyExplain = campObj.moneyExplain;
      about = campObj.about;
      affiliateLink = campObj.affiliates[0].url;
      postFeed = (
        <PostsWidget campaign={campObj} />
      );
      if (campObj.affiliates.length) {
        affiliateList = (
          <List>
            {campObj.affiliates.map((affil, i) => {
              const { clicks, site, url } = affil;
              return (
                <List.Item key={i}>
                  <List.Icon name="linkify" />
                  <List.Content content={<a href={url} target="_blank" rel="noopener noreferrer">{site}</a>} />
                  <List.Description><Icon name="mouse pointer" /> {clicks} clicks</List.Description>
                </List.Item>
              );
            })}
          </List>
        );
      }
    }

    return (
      <Container>

        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src={header} fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={profilePic} fluid />
              <Header as="h2">{title}</Header>
              <Button basic onClick={this.preview} color="blue"><Icon name="mouse pointer" />Preview</Button>
              <Button basic onClick={this.show} color="green"><Icon name="edit" />Edit</Button>
              <hr />
              <Button basic onClick={this.deleteModalShow} color="red"><Icon name="remove" />Delete</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Image src={storyImg} fluid />
              <Header as="h2">Description:</Header>
              {description}
              <Header as="h2">About:</Header>
              {about}
              <Header as="h2">How do you plan to spend the money?</Header>
              {moneyExplain}
              <Header as="h2">Add Post:</Header>
              <Form onSubmit={this.submitForm}>
                <Form.Group widths="equal">
                  <Form.Field control={Input} label="Title" name="title" onChange={this.handleChange} placeholder="Title" />
                </Form.Group>
                <Form.Field control={TextArea} label="body" name="body" onChange={this.handleChange} placeholder="Start typing..." />
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>

              <Header as="h2">Your Posts:</Header>
              {postFeed}
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h2">Your Affiliate Links:</Header>
              {affiliateList}
            </Grid.Column>

          </Grid.Row>
        </Grid>

        <div>
          <Modal size="small" open={open} onClose={this.hide}>
            <Modal.Header>Edit {title}</Modal.Header>
            <Modal.Content>

              <Form onSubmit={this.submitEditForm} size="big">
                <Form.Group widths="equal">
                  <Form.Input label="Name" name="title" defaultValue={title} placeholder="Campaign Name" />
                  <Form.Input label="Profile Picture" defaultValue={profilePic} name="profile" placeholder="Link to Profile Pic" />
                  <Form.Input label="Header Picture" defaultValue={header} name="header" placeholder="Link to Header Pic" />
                </Form.Group>
                <Form.TextArea name="description" defaultValue={description} label="Campaign Description" placeholder="Explain your campaign. . ." rows="3" />
                <Form.TextArea name="about" defaultValue={about} label="Who are you?" placeholder="Who are you?" rows="3" />
                <Form.TextArea name="moneyExplain" defaultValue={moneyExplain} label="How are you going to spend the money?" placeholder="What are you going to spend the money on?" rows="3" />
                <Form.Group widths="equal">
                  <Form.Input label="Story Picture" defaultValue={storyImg} name="storyImg" placeholder="Link to Story Pic" />
                  <Form.Input label="Amazon Affiliate Link" defaultValue={affiliateLink} name="amazonURL" placeholder="Amazon Affiliate Link" />
                </Form.Group>
                <Form.Checkbox name="terms" label="I agree to the Terms and Conditions" />
                <Button fluid type="submit" primary content="Save Changes" />
              </Form>

            </Modal.Content>
            <Modal.Actions>
              <Button fluid onClick={this.hide} default>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </div>

        <div>
          <Modal basic size="small" open={deleteOpen}>
            <Header icon="warning" content="Delete this campaign?" />
            <Modal.Content>
              <p>Your campaign and its content cannot be recovered once deleted!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.hideDelete} floated="left" color="green" inverted><Icon name="checkmark" /> Cancel</Button>
              <Button onClick={this.deleteCampaign} basic floated="left" color="red" inverted><Icon name="remove" /> Delete</Button>
            </Modal.Actions>
          </Modal>
        </div>

      </Container>
    );
  }
}

const mapStateToProps = state => ({ campaign: state.userCampaign, userId: state.user._id });

const mapDispatchToProps = dispatch => ({
  addPost(post, camp) {
    dispatch(submitPost(post, camp));
  },
  getCamp(campaign) {
    dispatch(getCampaign(campaign));
  },
  editCamp(campaign, id) {
    dispatch(editCampaign(campaign, id));
  },
  removeCamp(campaign) {
    dispatch(removeCampaign(campaign));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
