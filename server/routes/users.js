const express = require('express');
const router = express.Router();
const path = require('path');

const User = require('../models/User');

// FIND USER BY UID
router.get('/uid/:uid', (req, res) => {
  User.findOne({ uid: req.params.uid })
  .then(user => res.send(user))
  .catch(err => res.send(null));
});

// FIND USER BY ID
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => res.send(user))
  .catch(err => res.send());
});


// GET ALL USERS
router.get('/', (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(400).send(err));
});

// ADD NEW USER
router.post('/', (req, res) => {
  User.create(req.body)
  .then(newUser => res.send(newUser))
  .catch(err => res.status(400).send(err));
});

// UPDATE USER
router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
  .then(updatedUser => res.send(updatedUser))
  .catch(err => res.status(400).send(err));
});

// DELETE USER
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id })
  .then(res.send('user deleted'))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
