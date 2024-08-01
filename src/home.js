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
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
};

async function fetchMoviesData() {
  try {
    const [movieData, genreData, upcomingData] = await Promise.all([
      fetch(API.trending).then(res => res.json()),
      fetch(API.genres).then(res => res.json()),
      fetch(API.upcoming).then(res => res.json())
    ]);

    console.log('Movie Data:', movieData);
    console.log('Genre Data:', genreData);
    console.log('Upcoming Data:', upcomingData);

    const genreMap = Object.fromEntries(
      genreData.genres.map(({ id, name }) => [id, name])
    );

    const trendingMovies = movieData.results.slice(0, 3).map(movie => ({
      ...movie,
      genre_names: movie.genre_ids.map(id => genreMap[id]).join(', ')
    }));

    const upcomingMovies = upcomingData.results.slice(0, 1).map(movie => ({
      ...movie,
      genre_names: movie.genre_ids.map(id => genreMap[id]).join(', ')
    }))[0];

    return { trendingMovies, upcomingMovies };
  } catch (error) {
    console.error('Error fetching movies or genres:', error);
    return { trendingMovies: [], upcomingMovies: null };
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
    vote_average: rating
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

function displayMovies(movies) {
  const movieContainer = document.querySelector('#movie-container');
  const fragment = document.createDocumentFragment();
  movies.forEach(movie => fragment.appendChild(createMovieElement(movie)));
  movieContainer.innerHTML = '';
  movieContainer.appendChild(fragment);
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
    overview
  } = upcomingMovie;

  document.querySelector('.upcoming-poster').style.backgroundImage = `url(${IMAGE_BASE_URL}${posterPath})`;
  document.querySelectorAll('#upcoming-movie-title').forEach(el => el.textContent = title);
  document.querySelectorAll('#release-date-home').forEach(el => el.textContent = new Date(releaseDate).toLocaleDateString());
  document.querySelectorAll('#votes-home').forEach(el => el.textContent = `${rating.toFixed(1)} / ${voteCount}`);
  document.querySelectorAll('#popularity-home').forEach(el => el.textContent = popularity.toFixed(1));
  document.querySelectorAll('#genre-home').forEach(el => el.textContent = genreNames);
  document.querySelectorAll('.about-home-info').forEach(el => el.textContent = overview);
}

async function init() {
  try {
    const { trendingMovies, upcomingMovie } = await fetchMoviesData();
    displayMovies(trendingMovies);
    updateUpcomingMovie(upcomingMovie);
  } catch (error) {
    console.error('Failed to initialize:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);