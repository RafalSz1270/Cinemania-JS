import { starSvg } from './starIcons.js';

const API_KEY = '5b2561cb57ffa8e6a9098e26cf7f9cbf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const API = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  genres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
};

export async function fetchMoviesData(count = 3) {
  try {
    const [movieData, genreData] = await Promise.all([
      fetch(API.trending).then(res => res.json()),
      fetch(API.genres).then(res => res.json()),
    ]);

    const genreMap = Object.fromEntries(
      genreData.genres.map(({ id, name }) => [id, name])
    );

    return movieData.results.slice(0, count).map(movie => ({
      ...movie,
      genre_names: movie.genre_ids.map(id => genreMap[id]).join(', '),
    }));
  } catch (error) {
    console.error('Error fetching movies or genres:', error);
    return [];
  }
}

function truncateGenres(genres, maxLength) {
  return genres.split(', ').reduce((acc, genre) => {
    return acc.length + genre.length + 2 <= maxLength
      ? `${acc}, ${genre}`
      : acc;
  });
}

function createStarRating(rating) {
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

  const truncatedGenres = truncateGenres(genreNames, 15);
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
  const fragment = document.createDocumentFragment();
  movies.forEach(movie => fragment.appendChild(createMovieElement(movie)));
  movieContainer.innerHTML = '';
  movieContainer.appendChild(fragment);
}

export function initializeMovies(count = 3, htmlQuery = '#movie-container') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      console.log('Fetching movies...');
      const movies = await fetchMoviesData(count);
      console.log('Movies fetched:', movies);
      displayMovies(movies, htmlQuery);
      console.log('Movies should be displayed now');
    } catch (error) {
      console.error('Failed to initialize:', error);
    }
  });
}
