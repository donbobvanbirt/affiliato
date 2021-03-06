const PORT = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
// const http = require('http');

const MONGODB_URI = 'mongodb://johnsalay:Elbrus123@ds061246.mlab.com:61246/johndb';
// const MONGODB_URI = 'mongodb://localhost/affiliatodb';

// MONGOOSE CONFIGURATION
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `MongoDB connected to ${MONGODB_URI}`);
}); //

const app = express();
const server = require('http').createServer(app);

server.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

require('./config/webpack')(app);

app.use('/api', require('./routes/api'));

app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});
