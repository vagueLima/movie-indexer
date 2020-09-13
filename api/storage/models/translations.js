const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let translationsSchema = Schema({
  movie_schema_id: { type: Schema.Types.ObjectId, default: undefined },
  id: {
    type: 'Number',
    required: true,
  },
  iso_3166_1: {
    type: 'String',
  },
  iso_639_1: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
  english_name: {
    type: 'String',
  },
  data: {
    homepage: {
      type: 'String',
    },
    overview: {
      type: 'String',
    },
    runtime: {
      type: 'Number',
    },
    tagline: {
      type: 'String',
    },
    title: {
      type: 'String',
    },
  },
});

var Translations = mongoose.model('Translations', translationsSchema);

module.exports = Translations;
