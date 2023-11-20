/**
 *      [] Skriv pseudokod
 *
 *      // productGroup
 *      [] Skapa en array för alla produkter i butiken
 *      [] Fyll i all info om objekten i arrayen
 *      [] Gör en loop som visar produkterna i HTML-strukturen
 *
 *      // cartPage
 *      [] En funktion så att när man klickar på kundvagnen stängs alltid menyn för att Open-klassen
 *          tas bort
 *      [] Därefter tas kunden till kundkorgen
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

const phraseImgBlack = document.querySelector('#phraseImageBlack');
const phraseImgWhite = document.querySelector('#phraseImageWhite');

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

// Funktioner för att byta bild på framsidan beroende på theme
function changePhraseToWhite() {
  phraseImgWhite.classList.remove('visually_hidden');
  phraseImgBlack.classList.add('visually_hidden');
}
function changePhraseToBlack() {
  phraseImgWhite.classList.add('visually_hidden');
  phraseImgBlack.classList.remove('visually_hidden');
}

// Toggle för dark/lightmode
if (
  // eslint-disable-next-line
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.body.classList.add('dark_mode');
  darkMode.classList.toggle('visually_hidden');
  changePhraseToWhite();
} else {
  lightMode.classList.toggle('visually_hidden');
  changePhraseToBlack();
}

function toggleTheme() {
  document.body.classList.toggle('dark_mode');
  lightMode.classList.toggle('visually_hidden');
  darkMode.classList.toggle('visually_hidden');
  const isDark = document.body.classList.contains('dark_mode');
  if (isDark) {
    changePhraseToWhite();
  } else {
    changePhraseToBlack();
  }
}

themeToggle.addEventListener('click', toggleTheme);
