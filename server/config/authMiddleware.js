const admin = require('./firebaseAdmin');

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  admin.auth().verifyIdToken(token || '')
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(400).send({ error: 'Must be authenticated!' });
    });
};
