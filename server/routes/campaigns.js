const express = require('express');

const router = express.Router();

const Campaign = require('../models/Campaign');
const User = require('../models/User');

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
  // console.log('user:', user);
  Campaign.create(req.body)
  .then((newCampaign) => {
    const campaignId = newCampaign._id;
    addedCampaign = newCampaign;
    return User.findOneAndUpdate(
      { _id: user },
      { $push: { campaign: campaignId } },
      { safe: true, upsert: true }
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
