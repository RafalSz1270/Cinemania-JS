import { initializeModal } from './modalOpen.js';
import { initializeMovies } from './home.js';
import { initializeCatalog } from './catalog.js';

initializeModal();
initializeMovies(3, '#movie-container');

// initializeMovies(9, '.test');
initializeCatalog();
