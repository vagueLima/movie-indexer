# MovieIndexer

Integration to retrieve the available translations for movies from [The Movie Database API](<[https://www.themoviedb.org/](https://www.themoviedb.org/)>).

## How To Run

### Requirements:

- Node
- NPM
- Docker-Compose
- A Mongo instance.

Once you've cloned this repo, go into its folder and run:

     npm install.

With that done, you need to create an ENV file with your Mongo Connection String and your BEARER_TOKEN from the Movie Database API. **A layout for the ENV file its provided in .ENV.MODEL.**
Duplicate this file, populate it with the correct values and rename it to .env

**IMPORTANT** - This API uses the Bearer token to authenticate with the Movie Database API, not the api_key!The token its available in the same page that the API key ([settings/api](https://www.themoviedb.org/settings/api)), under the name of **API Read Access Token (v4 auth)**

    docker-compose up

This will start the API in the port 3000.

## Endpoint

### (GET) /movies

Search for Movies based on a search term, and returns the movie details and its available translations. It also saves said movies and translations in two mongo collections.

Parameter: searchTerm -> Term to search for in the Movie Database.
returns: Array of movie Objects, with its details and available translations
