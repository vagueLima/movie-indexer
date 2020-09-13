const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moviesSchema = Schema({
  adult: {
    type: 'Boolean',
  },
  backdrop_path: {
    type: 'Mixed',
  },
  belongs_to_collection: {
    type: 'Mixed',
  },
  budget: {
    type: 'Number',
  },
  genres: {
    type: ['Mixed'],
  },
  homepage: {
    type: 'String',
  },
  id: {
    type: 'Number',
    unique: true,
  },
  imdb_id: {
    type: 'String',
  },
  original_language: {
    type: 'String',
  },
  original_title: {
    type: 'String',
  },
  overview: {
    type: 'String',
  },
  popularity: {
    type: 'Number',
  },
  poster_path: {
    type: 'String',
  },
  production_companies: {
    type: ['Mixed'],
  },
  production_countries: {
    type: ['Mixed'],
  },
  release_date: {
    type: 'Date',
  },
  revenue: {
    type: 'Number',
  },
  runtime: {
    type: 'Number',
  },
  spoken_languages: {
    type: ['Mixed'],
  },
  status: {
    type: 'String',
  },
  tagline: {
    type: 'String',
  },
  title: {
    type: 'String',
  },
  video: {
    type: 'Boolean',
  },
  vote_average: {
    type: 'Number',
  },
  vote_count: {
    type: 'Number',
  },
});

var Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;
