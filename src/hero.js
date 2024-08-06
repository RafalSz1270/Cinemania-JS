document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '9d709850c7590845ffb60644b29d6f51'; 
    const API_URL = 'https://api.themoviedb.org/3';
    const HERO_CONTAINER = document.querySelector('.hero');
    const TITLE = document.querySelector('.hero-title');
    const DESCRIPTION = document.querySelector('.hero-film-description');
    const MORE_DETAILS_BTN = document.querySelector('.right-hero-button');
    const WATCH_TRAILER_BTN = document.querySelector('.watch-trailer-button');
    const DETAILS_MODAL = document.getElementById('details-modal');
    const TRAILER_MODAL = document.getElementById('trailer-modal');
    const FILM_DETAILS = document.getElementById('film-details');
    const TRAILER_CONTAINER = document.getElementById('trailer-container');
    const NO_TRAILER_MESSAGE = document.getElementById('no-trailer-message');
    const CLOSE_DETAILS = document.getElementById('close-details');
    const CLOSE_TRAILER = document.getElementById('close-trailer');
    const GET_STARTED_BTN = document.querySelector('.left-hero-button'); 

    // Fetch popular film and display it
    async function fetchPopularFilm() {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        const films = data.results;
        if (films.length === 0) {
          renderDefaultContent();
          return;
        }

        const randomFilm = films[Math.floor(Math.random() * films.length)];
        displayFilm(randomFilm);
      } catch (error) {
        console.error('Error fetching popular films:', error);
        renderDefaultContent();
      }
    }

    // Display default content when no films are found
    function renderDefaultContent() {
      HERO_CONTAINER.style.background = 'url("../images/hero-background.png") no-repeat center center';
      HERO_CONTAINER.style.backgroundSize = 'cover';
      TITLE.innerText = 'Cinemania';
      DESCRIPTION.innerHTML = '<a href="/catalog">Get Started</a>';
      WATCH_TRAILER_BTN.classList.add('hidden');
      MORE_DETAILS_BTN.classList.add('hidden');
    }

    // Display film details
    async function displayFilm(film) {
      TITLE.innerText = film.title;
      DESCRIPTION.innerText = film.overview;
      HERO_CONTAINER.style.backgroundImage = `linear-gradient(
        to right,
        black 15%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0) 60%,
        transparent 100%
      ), url('https://image.tmdb.org/t/p/original${film.backdrop_path}')`;
      WATCH_TRAILER_BTN.classList.remove('hidden');
      MORE_DETAILS_BTN.classList.remove('hidden');
      MORE_DETAILS_BTN.onclick = () => openDetailsModal(film.id);
      WATCH_TRAILER_BTN.onclick = () => fetchTrailer(film.id);

      localStorage.setItem('currentFilm', JSON.stringify(film));
    }

    // Redirect to catalog page on "Get Started" button click
    GET_STARTED_BTN.onclick = () => {
        window.location.href = '/catalog';
    };

    // Open film details modal
    async function openDetailsModal(filmId) {
      try {
        const response = await fetch(`${API_URL}/movie/${filmId}?api_key=${API_KEY}&language=en-US`);
        const film = await response.json();
        FILM_DETAILS.innerHTML = `
          <h2>${film.title}</h2>
          <p>${film.overview}</p>
        `;
        DETAILS_MODAL.style.display = 'block';
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    }

    // Fetch and display film trailer
    async function fetchTrailer(filmId) {
      try {
        const response = await fetch(`${API_URL}/movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        const trailers = data.results.filter(video => video.type === 'Trailer');
        if (trailers.length > 0) {
          const trailer = trailers[0];
          TRAILER_CONTAINER.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
          `;
          NO_TRAILER_MESSAGE.style.display = 'none';
          TRAILER_MODAL.style.display = 'block';
        } else {
          NO_TRAILER_MESSAGE.style.display = 'block';
          TRAILER_CONTAINER.innerHTML = '';
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        NO_TRAILER_MESSAGE.style.display = 'block';
      }
    }

    // Close modals
    CLOSE_DETAILS.onclick = () => {
      DETAILS_MODAL.style.display = 'none';
    };
    CLOSE_TRAILER.onclick = () => {
      TRAILER_MODAL.style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target === DETAILS_MODAL) {
        DETAILS_MODAL.style.display = 'none';
      }
      if (event.target === TRAILER_MODAL) {
        TRAILER_MODAL.style.display = 'none';
      }
    };

    // Show buttons when "Get Started" is clicked
    GET_STARTED_BTN.addEventListener('click', function() {
      WATCH_TRAILER_BTN.classList.remove('hidden');
      MORE_DETAILS_BTN.classList.remove('hidden');
    });

    // Initial film fetch
    fetchPopularFilm();
});
