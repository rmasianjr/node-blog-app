const burger = document.querySelector('.navbar-burger');
const navMenu = document.querySelector('.navbar-menu');
const paginationLink = document.querySelectorAll('.pagination-link');
const currentPageURL = window.location.href;

const toggleActive = () => {
  burger.classList.toggle('is-active');
  navMenu.classList.toggle('is-active');
};

burger.addEventListener('click', toggleActive);

if (
  currentPageURL === `${window.location.origin}/posts` ||
  currentPageURL === `${window.location.origin}/posts/myposts`
) {
  paginationLink[0].classList.add('is-current');
}

paginationLink.forEach(link => {
  if (link.href === currentPageURL) {
    link.classList.add('is-current');
  }
});
