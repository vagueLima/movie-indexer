const express = require('express');
const router = express.Router();
const axios = require('axios');
const MOVIEDB_BEARER_TOKEN = process.env.BEARER_TOKEN;

router.get('/movies', function (req, res) {
  const searchTerm = req.query.searchTerm;
  if (!searchTerm) {
    res.status(400).send('No query to search for the movies was detected');
    return;
  }
  const paramsToMovieDb = {
    query: searchTerm,
  };
  const headers = { Authorization: `Bearer ${MOVIEDB_BEARER_TOKEN}` };
  axios
    .get('https://api.themoviedb.org/3/search/movie', {
      params: paramsToMovieDb,
      headers,
    })
    .then(async (response) => {
      const moviesId = response.data.results.map((movie) => movie.id);
      const allMoviesData = moviesId.map(async (movieId) => {
        let detailsRequest = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers,
        });

        let translationsRequest = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/translations`,
          {
            headers,
          }
        );
        await Promise.all([detailsRequest, translationsRequest]);
        return {
          id: movieId,
          details: detailsRequest.data,
          translations: translationsRequest.data,
        };
      });
      const movieAwnser = await Promise.all(allMoviesData);
      res.status(200).json(movieAwnser);
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});

module.exports = router;
