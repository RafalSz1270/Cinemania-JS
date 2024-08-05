import { fetchMoviesData } from './home.js';

export const initializeModal = async () => {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');
  const movieInfo = document.querySelector('.movie-info');
  const modalBody = document.querySelector('.modal-body');
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
    clearModalContent();

    // Create and add movie info elements
    const title = document.createElement('h2');
    title.textContent = movie.title;
    movieInfo.insertBefore(title, toggleButton);

    const table = document.createElement('table');
    table.className = 'table-move-info';
    table.innerHTML = `
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
    `;
    movieInfo.insertBefore(table, toggleButton);

    // Add movie poster
    const posterImg = document.createElement('img');
    posterImg.className = 'modal-move-poster';
    posterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    posterImg.alt = `${movie.title} Poster`;
    modalBody.insertBefore(posterImg, movieInfo);

    modal.style.display = 'block';
  }

  function clearModalContent() {
    // Remove all children of movieInfo except the toggleButton
    while (movieInfo.firstChild !== toggleButton) {
      movieInfo.removeChild(movieInfo.firstChild);
    }

    // Remove all children of modalBody except movieInfo
    while (modalBody.firstChild !== movieInfo) {
      modalBody.removeChild(modalBody.firstChild);
    }
  }

  // Close the modal
  span.onclick = function () {
    modal.style.display = 'none';
    clearModalContent();
  };

  // Close the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      clearModalContent();
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
