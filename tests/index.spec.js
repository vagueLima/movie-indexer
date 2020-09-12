const assert = require('assert').strict;
const supertest = require('supertest');
require('dotenv').config({ path: '../.env' });
const app = require('../app');

describe('Tests for the api', function () {
  it('gets all movie data by search query', function (done) {
    supertest(app)
      .get('/movies')
      .query({ searchTerm: 'Avengers' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('Denies request with no query info', function (done) {
    supertest(app)
      .get('/movies')
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
