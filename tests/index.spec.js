const assert = require('assert').strict;
const supertest = require('supertest');
require('dotenv').config({ path: '../.env' });
const app = require('../app');

describe('Tests for pipedriver and Bling integration', function () {
  it('gets only won deals', function (done) {
    supertest(app)
      .get('/movies')
      .query({ searchTerm: 'Avengers' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
