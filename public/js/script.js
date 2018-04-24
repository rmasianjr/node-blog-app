const burger = document.querySelector('.navbar-burger');
const navMenu = document.querySelector('.navbar-menu');

const toggleActive = () => {
  burger.classList.toggle('is-active');
  navMenu.classList.toggle('is-active');
};

burger.addEventListener('click', toggleActive);
