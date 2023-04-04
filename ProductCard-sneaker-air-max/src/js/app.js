const $nav_toggle = document.querySelector('#nav-toggle');
const $nav_menu = document.querySelector('#nav-menu');

$nav_toggle.addEventListener('click', () => {
  $nav_menu.classList.toggle('show');
});
