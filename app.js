require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const MOVIEDB_BEARER_TOKEN = process.env.BEARER_TOKEN;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/movies', function (req, res) {
  const searchTerm = req.query.searchTerm;
  const paramsToMovieDb = {
    query: searchTerm,
  };
  const headers = { Authorization: `Bearer ${MOVIEDB_BEARER_TOKEN}` };
  axios
    .get('https://api.themoviedb.org/3/search/movie', {
      params: paramsToMovieDb,
      headers,
    })
    .then((response) => {
      const prunedMovieObject = response.data.results.map((movie) => ({
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
      }));
      res.status(200).json(prunedMovieObject);
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});
app.set('port', process.env.PORT || 3000);

module.exports = app;
