const express = require('express');
const router = express.Router();
const { searchMovies, getMovieDetailsAndTranslations } = require('../movieDbAPI');

router.get('/movies', function (req, res) {
  const searchTerm = req.query.searchTerm;
  if (!searchTerm) {
    res.status(400).send('No query to search for the movies was detected');
    return;
  }
  searchMovies(searchTerm)
    .then(async (response) => {
      const moviesId = response.data.results.map((movie) => movie.id);
      const allMoviesDataPromisses = moviesId.map(async (movieId) => {
        return getMovieDetailsAndTranslations(movieId);
      });
      const allMoviesData = await Promise.all(allMoviesDataPromisses);
      res.status(200).json(allMoviesData);
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});

module.exports = router;
