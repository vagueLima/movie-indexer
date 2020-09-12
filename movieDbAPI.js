const axios = require('axios');
const MOVIEDB_BEARER_TOKEN = process.env.BEARER_TOKEN;
const headers = { Authorization: `Bearer ${MOVIEDB_BEARER_TOKEN}` };

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
  return {
    id: movieId,
    details: detailsRequest.data,
    translations: translationsRequest.data.translations,
  };
}

module.exports = {
  searchMovies,
  getMovieDetails,
  getMovieTranslations,
  getMovieDetailsAndTranslations,
};
