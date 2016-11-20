const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  about: { type: String },
  moneyExplain: { type: String },
  affiliates: [{
    site: { type: String, required: true },
    url: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
  }],
  supporters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{
    title: { type: String, required: true },
    body: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  }],
  assets: {
    header: { type: String, required: true },
    storyImg: { type: String, required: true },
    profile: { type: String, required: true },
  },
  timestamp: { type: Date, required: true, default: Date.now },
  twitterHandle: { type: String },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
