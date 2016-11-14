const admin = require("firebase-admin");
const path = require('path');

let configPath = path.join(__dirname, '../../firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(configPath),
  databaseURL: "https://test-169da.firebaseio.com"
});

module.exports = admin;
