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
  const GET_STARTED_BTN = document.getElementById('get-started-button');

  // Funkcja do generowania gwiazdek na podstawie ratingu
  function generateStars(rating) {
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';

    let stars = '';
    const integerPart = Math.floor(rating);
    const decimalPart = rating - integerPart;

    // Dodaj pełne gwiazdki
    stars += fullStar.repeat(integerPart);

    // Dodaj połowiczną gwiazdkę, jeśli rating ma część dziesiętną większą niż 0
    if (decimalPart >= 0.5) {
      stars += halfStar;
    }

    // Dodaj puste gwiazdki, aby uzyskać pełne 5 gwiazdek
    stars += emptyStar.repeat(5 - integerPart - (decimalPart >= 0.5 ? 1 : 0));

    return stars;
  }

  // Fetch popular films from the API
  async function fetchPopularFilms() {
    try {
      const response = await fetch(
        `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular films:', error);
      return [];
    }
  }

  // Get a random film from the list
  function getRandomFilm(films) {
    return films[Math.floor(Math.random() * films.length)];
  }

  // Display default content when no films are found
  function renderDefaultContent() {
    HERO_CONTAINER.style.background =
      'url("../images/hero-background.png") no-repeat center center';
    HERO_CONTAINER.style.backgroundSize = 'cover';
    TITLE.innerText = 'Cinemania';
    DESCRIPTION.innerHTML = '<a href="/catalog">Get Started</a>';

    WATCH_TRAILER_BTN.classList.add('hidden');
    MORE_DETAILS_BTN.classList.add('hidden');
  }

  // Display film information
  function displayFilm(film) {
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

    // Display rating as stars
    const rating = film.vote_average / 2; // Przeskalowanie na 5-gwiazdkową skale
    document.getElementById('hero-rating').innerHTML = generateStars(rating);

    WATCH_TRAILER_BTN.classList.remove('hidden');
    MORE_DETAILS_BTN.classList.remove('hidden');
    MORE_DETAILS_BTN.onclick = () => openDetailsModal(film.id);
    WATCH_TRAILER_BTN.onclick = () => fetchTrailer(film.id);

    localStorage.setItem('currentFilm', JSON.stringify(film));
  }

  // Open film details modal
  async function openDetailsModal(filmId) {
    try {
      const response = await fetch(
        `${API_URL}/movie/${filmId}?api_key=${API_KEY}&language=en-US`
      );
      const film = await response.json();
      FILM_DETAILS.innerHTML = `
                <h2>${film.title}</h2>
                <p>${film.overview}</p>
            `;
      DETAILS_MODAL.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  }

  // Fetch and display film trailer
  async function fetchTrailer(filmId) {
    try {
      const response = await fetch(
        `${API_URL}/movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      const trailers = data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        const trailer = trailers[0];
        TRAILER_CONTAINER.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
                `;
        NO_TRAILER_MESSAGE.classList.add('hidden');
      } else {
        TRAILER_CONTAINER.innerHTML = '';
        NO_TRAILER_MESSAGE.classList.remove('hidden');
      }
      TRAILER_MODAL.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching trailer:', error);
      TRAILER_CONTAINER.innerHTML = '';
      NO_TRAILER_MESSAGE.classList.remove('hidden');
      TRAILER_MODAL.classList.remove('hidden');
    }
  }

  // Close modals
  CLOSE_DETAILS.onclick = () => {
    DETAILS_MODAL.classList.add('hidden');
  };
  CLOSE_TRAILER.onclick = () => {
    TRAILER_MODAL.classList.add('hidden');
  };

  window.onclick = event => {
    if (event.target === DETAILS_MODAL) {
      DETAILS_MODAL.classList.add('hidden');
    }
    if (event.target === TRAILER_MODAL) {
      TRAILER_MODAL.classList.add('hidden');
    }
  };

  // Redirect to catalog page on "Get Started" button click
  GET_STARTED_BTN.onclick = () => {
    window.location.href = '/catalog';
  };

  // Initial film fetch
  async function initializeHeroSection() {
    const films = await fetchPopularFilms();
    if (films.length === 0) {
      renderDefaultContent();
    } else {
      const randomFilm = getRandomFilm(films);
      displayFilm(randomFilm);
    }
  }

  initializeHeroSection();
});
