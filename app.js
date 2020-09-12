require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const router = require('./router');
const axios = require('axios');
const MOVIEDB_BEARER_TOKEN = process.env.BEARER_TOKEN;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(router);
app.set('port', process.env.PORT || 3000);

module.exports = app;
