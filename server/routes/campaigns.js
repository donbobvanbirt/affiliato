const express = require('express');

const router = express.Router();

const Campaign = require('../models/Campaign');
const User = require('../models/User');

// ADD AFFILIATE LINK
router.put('/affiliate/:id', (req, res) => {
  const { id } = req.params;
  Campaign.findOneAndUpdate(
    { _id: id },
    { $push: { affiliates: req.body } },
    { safe: true, upsert: true, new: true }
  )
  .then(updatedCampaign => res.send(updatedCampaign))
  .catch(err => res.status(400).send(err));
});

// REMOVE AFFILIATE LINK
router.delete('/affiliate/:id/:affiliateName', (req, res) => {
  const { id, affiliateName } = req.params;
  Campaign.findOneAndUpdate(
    { _id: id },
    { $pull: { affiliates: { site: affiliateName } } },
    { new: true }
  )
  .then(updatedCampaign => res.send(updatedCampaign))
  .catch(err => res.status(400).send(err));
});

// ADD CLICKS //
router.put('/click/:id/:affiliateName', (req, res) => {
  const { id, affiliateName } = req.params;
  Campaign.findOneAndUpdate(
    { _id: id, 'affiliates.site': affiliateName },
    { $inc: { 'affiliates.$.clicks': 1 } },
    { new: true }
  )
  .then(updatedCampaign => res.send(updatedCampaign))
  .catch(err => res.status(400).send(err));
});

// GET CAMPAIGN
router.get('/:id', (req, res) => {
  Campaign.find({ _id: req.params.id })
  .then(campaign => res.send(campaign))
  .catch(err => res.status(400).send(err));
});

// GET ALL CAMPAIGNS
router.get('/', (req, res) => {
  Campaign.find()
  .then(campaigns => res.send(campaigns))
  .catch(err => res.status(400).send(err));
});

// ADD NEW CAMPAIGN
router.post('/', (req, res) => {
  const { user } = req.body;
  let addedCampaign;
  Campaign.create(req.body)
  .then((newCampaign) => {
    const campaignId = newCampaign._id;
    addedCampaign = newCampaign;
    return User.findOneAndUpdate(
      { _id: user },
      { $push: { campaign: campaignId } },
      { safe: true, upsert: true, new: true }
    );
  })
  .then(() => res.send(addedCampaign))
  .catch(err => res.status(400).send(err));
});

// UPDATE CAMPAIGNS
router.put('/:id', (req, res) => {
  Campaign.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true })
  .then(updatedCampaign => res.send(updatedCampaign))
  .catch(err => res.status(400).send(err));
});

// DELETE CAMPAIGN
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Campaign.remove({ _id: id })
  // return id;
  .then(() => {
    return User.findOneAndUpdate(
      { campaign: id },
      { $pull: { campaign: id } },
      { new: true });
  })
  .then(user => res.send(user))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
