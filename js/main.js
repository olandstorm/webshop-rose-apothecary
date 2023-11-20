/**
 *      [] Skriv pseudokod
 *      [] Gör så att menyn stängs när man klickar på kundvagnen i menyn
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
const shoppingCart = document.querySelector('#shoppingCart');
const themeToggle = document.querySelector('#toggleTheme');
const lightMode = document.querySelector('#lightModeIcon');
const darkMode = document.querySelector('#darkModeIcon');

// Funktion för att öppna och stänga navigationsmenyn, även med länkarna
function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open');
  bodyTag.classList.toggle('fixed_background');
  shoppingCart.classList.toggle('shopping_black');
  if (isOpen) {
    menuBtn.setAttribute('aria-label', 'Close meny');
  } else {
    menuBtn.setAttribute('aria-label', 'Open meny');
  }
}

// Loop med event för länkarna i navigationsmenyn
// ! Medveten anonym funktion !
menuLinks.forEach((item) => {
  item.addEventListener('click', toggleMenu);
});

// Event för menyknapp
menuBtn.addEventListener('click', toggleMenu);

// Toggle för dark/lightmode

if (
  // eslint-disable-next-line
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.body.classList.add('dark_mode');
  darkMode.classList.toggle('visually_hidden');
} else {
  lightMode.classList.toggle('visually_hidden');
}

function toggleTheme() {
  document.body.classList.toggle('dark_mode');
  lightMode.classList.toggle('visually_hidden');
  darkMode.classList.toggle('visually_hidden');
}

themeToggle.addEventListener('click', toggleTheme);
