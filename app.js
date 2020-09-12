require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const router = require('./router');

const MONGO_URL = process.env.MONGO_URL;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(router);
app.set('port', process.env.PORT || 3000);

module.exports = app;
