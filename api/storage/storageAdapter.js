const Movies = require('./models/movies');
const Translations = require('./models/translations');

async function saveMovie(movieDetails) {
  const newMovie = new Movies({ ...movieDetails });
  return newMovie.save();
}
async function saveMovieTranslations(movieSchemaId, movieIDFromAPI, movieTranslations) {
  const movie_schema_id = movieSchemaId;
  return Promise.all(
    movieTranslations.map((translation) => {
      const newTranslationsRecord = new Translations({
        movie_schema_id,
        id: movieIDFromAPI,
        ...translation,
      });
      return newTranslationsRecord.save();
    })
  );
}

module.exports = { saveMovie, saveMovieTranslations };
