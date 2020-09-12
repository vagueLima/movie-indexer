const axios = require('axios');
const MOVIEDB_BEARER_TOKEN = process.env.BEARER_TOKEN;
const headers = { Authorization: `Bearer ${MOVIEDB_BEARER_TOKEN}` };
const { saveMovie, saveMovieTranslations } = require('./storageAdapter');
async function searchMovies(searchTerm) {
  const paramsToMovieDb = {
    query: searchTerm,
  };
  return axios.get('https://api.themoviedb.org/3/search/movie', {
    params: paramsToMovieDb,
    headers,
  });
}

async function getMovieDetails(movieId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    headers,
  });
}

async function getMovieTranslations(movieId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/translations`, {
    headers,
  });
}

async function getMovieDetailsAndTranslations(movieId) {
  let detailsRequestPromise = getMovieDetails(movieId);
  let translationsRequestPromise = getMovieTranslations(movieId);
  const [detailsRequest, translationsRequest] = await Promise.all([
    detailsRequestPromise,
    translationsRequestPromise,
  ]);
  const movieDetails = detailsRequest.data;
  const movieTranslations = translationsRequest.data.translations;
  try {
    const MovieRecord = await saveMovie(movieDetails);
    const movieTranslationsRecord = await saveMovieTranslations(
      MovieRecord._id,
      movieId,
      movieTranslations
    );
  } catch (err) {
    console.warn(`Couldnt persist some of the data!It's probably already in the database`);
  }

  return {
    id: movieId,
    details: movieDetails,
    translations: movieTranslations,
  };
}

module.exports = {
  searchMovies,
  getMovieDetails,
  getMovieTranslations,
  getMovieDetailsAndTranslations,
};
