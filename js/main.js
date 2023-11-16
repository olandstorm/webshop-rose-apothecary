/**
 *      [] Skriv pseudokod
 *      []
 *      []
 *      []
 *      []
 *      []
 *      []
 */

const menuBtn = document.querySelector('#toggleNav');
const nav = document.querySelector('#fullNav');
const bodyTag = document.body;
const menuLinks = document.querySelectorAll('.menuLink');

function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open');
  if (isOpen) {
    menuBtn.setAttribute('aria-label', 'Close meny');
    bodyTag.classList.add('fixed_background');
  } else {
    menuBtn.setAttribute('aria-label', 'Open meny');
    bodyTag.classList.remove('fixed_background');
  }
}

/* function closeMenu() {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
} */

menuLinks.forEach((item) => {
  item.addEventListener('click', toggleMenu);
});

menuBtn.addEventListener('click', toggleMenu);

/* for (let i = 0; i < menuLinks.length; i += 1) {
  menuLinks[i].addEventListener('click', closeMenu);
} */
