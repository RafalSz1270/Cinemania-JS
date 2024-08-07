import axios from 'axios';
import { starSvg } from './starIcons.js';

const API_KEY = '5b2561cb57ffa8e6a9098e26cf7f9cbf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Preładowanie obrazów gwiazdek
function preloadStarImages() {
  ['full', 'half', 'empty'].forEach(type => {
    const img = new Image();
    img.src = `/images/${type}Star.svg`;
  });
}

preloadStarImages();

// Endpointy API
const API = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  genres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
};

// Pobieranie danych filmów
export async function fetchMoviesData(
  endpoints = ['trending', 'genres'],
  count = 20,
  page = 1
) {
  try {
    const fetchPromises = endpoints.map(endpoint =>
      fetch(`${API[endpoint]}&page=${page}`).then(res => res.json())
    );

    const fetchedData = await Promise.all(fetchPromises);

    console.log('Pobrane dane:', fetchedData);

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

    const result = {
      totalPages: dataMap.trending ? dataMap.trending.total_pages : 1,
      currentPage: page,
    };

    if (dataMap.trending) {
      result.trendingMovies = processMovies(dataMap.trending.results, count);
    }

    if (dataMap.upcoming) {
      result.upcomingMovies = processMovies(dataMap.upcoming.results, 1)[0];
    }

    return result;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    return {};
  }
}

// Skracanie listy gatunków
function truncateGenres(genres, maxCount = 3) {
  const genreArray = genres.split(', ');
  return genreArray.slice(0, maxCount).join(', ');
}

// Tworzenie oceny gwiazdkowej
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

// Tworzenie elementu filmu
function createMovieElement(movie) {
  const {
    title,
    genre_names: genreNames,
    poster_path: posterPath,
    release_date: releaseDate,
    vote_average: rating,
  } = movie;

  const movieElement = document.createElement('div');
  movieElement.className = 'catalog-movie-head-poster';
  movieElement.style.backgroundImage = `url(${IMAGE_BASE_URL}${posterPath})`;

  const truncatedGenres = truncateGenres(genreNames);
  const releaseYear = new Date(releaseDate).getFullYear();
  const starRating = createStarRating(rating);

  movieElement.innerHTML = `
    <p class="catalog-movie-head-t-title">${title}</p>
    <div class="catalog-info-container">
      <p class="catalog-movie-head-t-info">${truncatedGenres} | ${releaseYear}</p>
      <span class="catalog-star-rating">${starRating}</span>
    </div>
  `;

  return movieElement;
}

// Wyświetlanie filmów
function displayMovies(movies, totalPages, currentPage) {
  const movieContainer = document.querySelector('#catalog-film-list');
  movieContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();
  movies.forEach(movie => fragment.appendChild(createMovieElement(movie)));
  movieContainer.appendChild(fragment);
  console.log(`Dodane ${movies.length} filmy do ${'#catalog-film-list'}`);

  const paginationContainer = document.querySelector('#pagination-container');
  paginationContainer.innerHTML = createPagination(totalPages, currentPage);
}

// Inicjalizacja filmów
export function initializeCatalog(
  count = 20,
  htmlQuery = '#catalog-film-list'
) {
  document.addEventListener('DOMContentLoaded', async () => {
    let currentPage = 1;
    const loadPage = async page => {
      try {
        console.log('pobieranie danych...');
        const { trendingMovies, totalPages } = await fetchMoviesData(
          ['trending', 'genres'],
          count,
          page
        );
        console.log('Pobrane filmy:', trendingMovies);
        console.log('Wyswietlanie filmow...');
        displayMovies(trendingMovies, totalPages, page);
        console.log('Filmy powinny byc wyswietlone');
      } catch (error) {
        console.error('Nie udało sie zainicjowac:', error);
      }
    };

    await loadPage(currentPage);

    document.addEventListener('click', async e => {
      if (e.target.id === 'next-page') {
        currentPage++;
        await loadPage(currentPage);
      } else if (e.target.id === 'prev-page') {
        currentPage--;
        await loadPage(currentPage);
      } else if (e.target.classList.contains('page-button')) {
        currentPage = parseInt(e.target.dataset.page);
        await loadPage(currentPage);
      }
    });
  });
}

function createPagination(totalPages, currentPage) {
  let paginationHTML = '';

  if (currentPage > 1) {
    paginationHTML += `<button id="prev-page">Previous page</button>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<button id="next-page">Next page</button>`;
  }

  return paginationHTML;
}
