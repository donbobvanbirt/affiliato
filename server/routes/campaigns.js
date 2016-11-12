const express = require('express');

const router = express.Router();

const Campaign = require('../models/Campaign');

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
  Campaign.create(req.body)
  .then(newCampaign => res.send(newCampaign))
  .catch(err => res.status(400).send(err));
});

// UPDATE CAMPAIGNS
router.put('/:id', (req, res) => {
  Campaign.findOneAndUpdate({ _id: req.params.id }, { $push: req.body }, { new: true })
  .then(updatedCampaign => res.send(updatedCampaign))
  .catch(err => res.status(400).send(err));
});

// DELETE CAMPAIGN
router.delete('/:id', (req, res) => {
  Campaign.remove({ _id: req.params.id })
  .then(res.send('Campaign deleted'))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
