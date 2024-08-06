import { starSvg } from './starIcons.js';

const API_KEY = '5b2561cb57ffa8e6a9098e26cf7f9cbf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function preloadStarImages() {
  ['full', 'half', 'empty'].forEach(type => {
    const img = new Image();
    img.src = `/images/${type}Star.svg`;
  });
}

preloadStarImages();

const API = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  genres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
};

export async function fetchMoviesData(
  endpoints = ['trending', 'genres'],
  count = 3
) {
  try {
    const fetchPromises = endpoints.map(endpoint =>
      fetch(API[endpoint]).then(res => res.json())
    );

    const fetchedData = await Promise.all(fetchPromises);

    console.log('Fetched Data:', fetchedData);

    const dataMap = Object.fromEntries(
      endpoints.map((endpoint, index) => [endpoint, fetchedData[index]])
    );

    let genreMap = {};
    if (dataMap.genres) {
      genreMap = Object.fromEntries(
        dataMap.genres.genres.map(({ id, name }) => [id, name])
      );
    }

    const processMovies = (movies, count) =>
      movies.slice(0, count).map(movie => ({
        ...movie,
        genre_names: movie.genre_ids
          ? movie.genre_ids.map(id => genreMap[id]).join(', ')
          : '',
      }));

    const result = {};

    if (dataMap.trending) {
      result.trendingMovies = processMovies(dataMap.trending.results, count);
    }

    if (dataMap.upcoming) {
      result.upcomingMovies = processMovies(dataMap.upcoming.results, 1)[0];
    }

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

function truncateGenres(genres, maxCount = 2) {
  const genreArray = genres.split(', ');
  return genreArray.slice(0, maxCount).join(', ');
}

export function createStarRating(rating) {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starImg = type => starSvg[type];
  return `
    ${starImg('full').repeat(fullStars)}
    ${hasHalfStar ? starImg('half') : ''}
    ${starImg('empty').repeat(emptyStars)}
  `;
}

function createMovieElement(movie) {
  const {
    title,
    genre_names: genreNames,
    poster_path: posterPath,
    release_date: releaseDate,
    vote_average: rating,
  } = movie;

  const movieElement = document.createElement('div');
  movieElement.className = 'movie-head-poster';
  movieElement.style.backgroundImage = `url(${IMAGE_BASE_URL}${posterPath})`;

  const truncatedGenres = truncateGenres(genreNames);
  const releaseYear = new Date(releaseDate).getFullYear();
  const starRating = createStarRating(rating);

  movieElement.innerHTML = `
    <p class="movie-head-t-title">${title}</p>
    <div class="info-container">
      <p class="movie-head-t-info">${truncatedGenres} | ${releaseYear}</p>
      <span class="star-rating">${starRating}</span>
    </div>
  `;

  return movieElement;
}

function displayMovies(movies, htmlQuery = '#movie-container') {
  const movieContainer = document.querySelector(htmlQuery);
  movieContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();
  movies.forEach(movie => fragment.appendChild(createMovieElement(movie)));
  movieContainer.appendChild(fragment);
  console.log(`Added ${movies.length} movies to ${htmlQuery}`);
}

function updateUpcomingMovie(upcomingMovie) {
  if (!upcomingMovie) return;

  const {
    title,
    genre_names: genreNames,
    poster_path: posterPath,
    release_date: releaseDate,
    vote_average: rating,
    vote_count: voteCount,
    popularity,
    overview,
  } = upcomingMovie;

  const formattedDate = new Date(releaseDate)
    .toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  document.querySelectorAll('.upcoming-poster').forEach(el => {
    el.style.backgroundImage = `url(${IMAGE_BASE_URL}${posterPath})`;
  });

  document
    .querySelectorAll(
      '#upcoming-movie-title-mobile, #upcoming-movie-title-tablet, #upcoming-movie-title-pc'
    )
    .forEach(el => {
      el.textContent = title;
    });

  document
    .querySelectorAll(
      '#release-date-home-mobile, #release-date-home-tablet, #release-date-home-pc'
    )
    .forEach(el => {
      el.textContent = formattedDate;
      el.style.color = '#F87719';
    });

  document
    .querySelectorAll('#votes-home-mobile, #votes-home-tablet, #votes-home-pc')
    .forEach(el => {
      el.innerHTML = `
      <div class="votes-wrapper">
        <div class="votes-wrapper-info">${rating.toFixed(1)}</div>
        <span>/</span>
        <div class="votes-wrapper-info">${voteCount}</div>
      </div>
    `;
    });

  document
    .querySelectorAll(
      '#popularity-home-mobile, #popularity-home-tablet, #popularity-home-pc'
    )
    .forEach(el => {
      el.textContent = popularity.toFixed(1);
    });

  document
    .querySelectorAll('#genre-home-mobile, #genre-home-tablet, #genre-home-pc')
    .forEach(el => {
      el.textContent = truncateGenres(genreNames);
    });

  document.querySelectorAll('.about-home-info').forEach(el => {
    el.textContent = overview;
  });
}

export function initializeMovies(count = 3, htmlQuery = '#movie-container') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      console.log('Fetching movies...');
      const { trendingMovies, upcomingMovies } = await fetchMoviesData(
        ['trending', 'genres', 'upcoming'],
        count
      );
      console.log('Movies fetched:', trendingMovies);
      console.log('Displaying movies...');
      displayMovies(trendingMovies, htmlQuery);
      updateUpcomingMovie(upcomingMovies);
      console.log('Movies should be displayed now');
    } catch (error) {
      console.error('Failed to initialize:', error);
    }
  });
}


