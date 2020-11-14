const axios = require('axios');

class MovieScrapper {
  constructor(imdbLink) {
    this.imdbLink = imdbLink;
  }

  async getMovieData() {
    let movieData = {};
    if (process.env.MOVIE_SCRAPPER === 'OMDB') {
      if (!process.env.OMDB_APIKEY || process.env.OMDB_APIKEY === '')
        return movieData;
      movieData = await this.getOmdbData();
    } else if (process.env.MOVIE_SCRAPPER === 'IMDB') {
      return movieData;
    } else {
      return movieData;
    }
    return movieData;
  }

  async getOmdbData() {
    const imdbId = MovieScrapper.getMovieID(this.imdbLink);
    // imdbId = 'tt0208094';
    const axRes = await axios({
      method: 'GET',
      url: `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_APIKEY}`
    });
    // const imdbLink = `https://www.imdb.com/title/${imdbId}`;
    const { imdbLink } = this;
    const status = 'Search';
    if (
      !axRes.data.Title ||
      axRes.data.Title === '' ||
      axRes.data.Title === 'N/A'
    ) {
      return '';
    }
    const title = axRes.data.Title;
    let releaseDate;
    if (
      !axRes.data.Released ||
      axRes.data.Released === '' ||
      axRes.data.Released === 'N/A' ||
      axRes.data.Released === NaN
    ) {
      releaseDate = undefined;
    } else {
      releaseDate = axRes.data.Released;
    }
    let ratingsAverage;
    if (
      !axRes.data.imdbRating ||
      axRes.data.imdbRating === '' ||
      axRes.data.imdbRating === 'N/A' ||
      axRes.data.imdbRating === NaN
    ) {
      ratingsAverage = undefined;
    } else {
      ratingsAverage = axRes.data.imdbRating;
    }
    let ratingsQuantity;
    if (
      !axRes.data.imdbVotes ||
      axRes.data.imdbVotes === '' ||
      axRes.data.imdbVotes === 'N/A' ||
      axRes.data.imdbVotes === NaN
    ) {
      ratingsQuantity = undefined;
    } else {
      ratingsQuantity = axRes.data.imdbVotes.replace(',', '') * 1;
    }
    let duration;
    if (
      !axRes.data.Runtime ||
      axRes.data.Runtime === '' ||
      axRes.data.Runtime === 'N/A' ||
      axRes.data.Runtime === NaN
    ) {
      duration = undefined;
    } else {
      duration = axRes.data.Runtime.replace('min', '').trim() * 1;
    }
    let plot;
    if (
      !axRes.data.Plot ||
      axRes.data.Plot === '' ||
      axRes.data.Plot === 'N/A' ||
      axRes.data.Plot === NaN
    ) {
      plot = undefined;
    } else {
      plot = axRes.data.Plot;
    }
    let mpaa;
    if (
      !axRes.data.Rated ||
      axRes.data.Rated === '' ||
      axRes.data.Rated === 'N/A' ||
      axRes.data.Rated === NaN
    ) {
      mpaa = undefined;
    } else {
      mpaa = axRes.data.Rated;
    }
    let geners;
    if (
      !axRes.data.Genre ||
      axRes.data.Genre === '' ||
      axRes.data.Genre === 'N/A' ||
      axRes.data.Genre === NaN
    ) {
      geners = undefined;
    } else {
      geners = axRes.data.Genre.split(',');
    }
    let poster;
    if (
      !axRes.data.Poster ||
      axRes.data.Poster === '' ||
      axRes.data.Poster === 'N/A' ||
      axRes.data.Poster === NaN
    ) {
      poster = undefined;
    } else {
      poster = axRes.data.Poster;
    }

    return {
      status,
      title,
      imdbLink,
      releaseDate,
      ratingsAverage,
      ratingsQuantity,
      duration,
      plot,
      mpaa,
      geners,
      poster
    };
  }

  static getMovieID(imdbUrl) {
    let movieId = imdbUrl;
    if (
      imdbUrl.startsWith('https://www.imdb.com/title/') ||
      imdbUrl.startsWith('http://www.imdb.com/title/')
    ) {
      movieId = imdbUrl
        .replace('https://www.imdb.com/title/', '')
        .replace('http://www.imdb.com/title/', '');
      if (movieId.slice(-1) === '/') {
        movieId = movieId.slice(0, -1);
      }
    }

    if (movieId.includes('/')) {
      return '';
    }

    if (!movieId.startsWith('tt')) {
      return '';
    }

    return movieId;
  }
}

module.exports = MovieScrapper;
