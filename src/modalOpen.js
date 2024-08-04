import { fetchMoviesData } from './home.js';

export const initializeModal = async () => {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const toggleButton = document.getElementById('toggleLibrary');
  const movieContainer = document.querySelector('#movie-container');

  // Fetch movie data
  const { trendingMovies } = await fetchMoviesData(['trending', 'genres'], 3);

  // Add click event listeners to movie posters
  movieContainer.addEventListener('click', event => {
    const moviePoster = event.target.closest('.movie-head-poster');
    if (moviePoster) {
      const index = Array.from(movieContainer.children).indexOf(moviePoster);
      openModal(trendingMovies[index]);
    }
  });

  function openModal(movie) {
    if (!movie) return;
    const modalContent = document.querySelector('.modal-body');
    modalContent.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
      <h2>${movie.title}</h2>
      <p><strong>Vote / Votes</strong> ${movie.vote_average}/${movie.vote_count}</p>
      <p><strong>Popularity</strong> ${movie.popularity}</p>
      <p><strong>Genre</strong> ${movie.genre_names}</p>
      <p><strong>About</strong> ${movie.overview}</p>
    `;
    modal.style.display = 'block';
  }

  // Close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // Close the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Toggle add/remove from library
  toggleButton.onclick = function () {
    if (toggleButton.innerText === 'Dodaj do My library') {
      toggleButton.innerText = 'Usuń z My library';
    } else {
      toggleButton.innerText = 'Dodaj do My library';
    }
  };
};
