const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
  description: { type: String, required: true },
  about: { type: String },
  moneyExplain: { type: String },
  affiliates: [{
    site: { type: String, required: true },
    url: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 }
  }],
  supporters: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  assets: {
    header: { type: String, required: true },
    storyImg: { type: String, required: true },
    profile: { type: String, required: true }
  },
  timestamp: { type: Date, required: true, default: Date.now }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
