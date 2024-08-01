import { fetchMoviesData } from './home.js';

export const initializeModal = async () => {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const toggleButton = document.getElementById('toggleLibrary');
  const movieContainer = document.querySelector('#movie-container');

  // Fetch movie data
  const movies = await fetchMoviesData();

  // Add click event listeners to movie posters
  movieContainer.addEventListener('click', event => {
    const moviePoster = event.target.closest('.movie-head-poster');
    if (moviePoster) {
      const index = Array.from(movieContainer.children).indexOf(moviePoster);
      openModal(movies[index]);
    }
  });

  function openModal(movie) {
    const modalContent = document.querySelector('.modal-body');
    modalContent.innerHTML = `
    <img class="modal-move-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
    <div>
      <h2>${movie.title}</h2>
        <table class="table-move-info">
          <tr>
              <td><strong>Vote / Votes</strong></td>
              <td>${movie.vote_average}/${movie.vote_count}</td>
          </tr>
          <tr>
              <td><strong>Popularity</strong></td>
              <td>${movie.popularity}</td>
          </tr>
          <tr>
              <td><strong>Genre</strong></td>
              <td>${movie.genre_names}</td>
          </tr>
          <tr>
              <td><strong>About</strong></td>
              <td></td>
          </tr>
          <tr>
            <td colspan="2">${movie.overview}</td>
          </tr>
        </table>
    </div>
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
    if (toggleButton.innerText === 'Add to my library') {
      toggleButton.innerText = 'Remove from my library';
    } else {
      toggleButton.innerText = 'Add to my library';
    }
  };
};
