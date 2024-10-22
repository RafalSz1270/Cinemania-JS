const navLinks = document.querySelectorAll('.nav_list');
const mobNavLinks = document.querySelectorAll('.mobile-nav-list');
const currentUrl = window.location.href;

navLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

mobNavLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ====================================================================

const menuButton = document.getElementById('menu');
const modal = document.getElementById('modal');
const backdrop = document.getElementById('backdrop');

menuButton.addEventListener('click', function() {
  modal.classList.add('open');
  backdrop.style.display = 'block';
});

backdrop.addEventListener('click', function(event) {
  if (event.target === backdrop) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});

document.addEventListener('click', function(event) {
  if (!modal.contains(event.target) && event.target !== menuButton) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});
// =============================================================================

const body = document.querySelector('body');
const toggle = document.querySelector('.toggle');
const logoText = document.querySelector('.logo_text');
const savedTheme = localStorage.getItem('theme');


if (savedTheme === 'light') {
  enableLightTheme();
} else {
  enableDarkTheme();
}

toggle.addEventListener('click', () => {
  if (body.classList.contains('white')) {
    enableDarkTheme();
    localStorage.setItem('theme', 'dark');
  } else {
    enableLightTheme();
    localStorage.setItem('theme', 'light');
  }
});

function enableLightTheme() {
  body.classList.add('white');
  toggle.classList.add('active');
  document.documentElement.style.setProperty('--primary-background-color', '#111111');
  document.documentElement.style.setProperty('--primary-text-color', '#282828');
  document.documentElement.style.setProperty('--grey-color', '#595959');
  document.documentElement.style.setProperty('--white-input-color', '#595959');
  document.documentElement.style.setProperty('--arrow-color', '#595959');
  setBackdropColor('light');
}

function enableDarkTheme() {
  body.classList.remove('white');
  toggle.classList.remove('active');
  document.documentElement.style.setProperty('--secondary-background-color', '#ffffff');
  document.documentElement.style.setProperty('--primary-text-color', '#ffffff');
  document.documentElement.style.setProperty('--grey-color', '#b7b7b7');
  document.documentElement.style.setProperty('--white-input-color', '#ffffff');
  document.documentElement.style.setProperty('--arrow-color', '#f8f8f8');
  setBackdropColor('dark');
}

function setBackdropColor(theme) {
  const backdrop = document.getElementById('backdrop');
  if (theme === 'light') {
    backdrop.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  } else {
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  }
}

// ============================Team-Modal==================================================
const footerBtn = document.querySelector('.footer-btn');
const backdropModal = document.querySelector('.backdrop-team-modal');
const closeBtn = document.querySelector('.close-btn');
function openModal() {
  backdropModal.classList.remove('is-hidden');
  document.addEventListener('keydown', closeModalOnEscape);
  backdropModal.addEventListener('click', closeModalOnClickOutside);
}
function closeModal() {
  backdropModal.classList.add('is-hidden');
  document.removeEventListener('keydown', closeModalOnEscape);
  backdropModal.removeEventListener('click', closeModalOnClickOutside);
}
function closeModalOnEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
function closeModalOnClickOutside(event) {
  if (event.target === backdropModal) {
    closeModal();
  }
}
footerBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);