/**
 *
 *
 *
 *      [X] Skriv pseudokod
 *
 *
 *
 *
 *      // produkterna
 *      [] Skapa en array för alla produkter i butiken
 *      [] Fyll i all info om objekten i arrayen
 *      [] Gör en loop som visar produkterna i HTML-strukturen
 *      [] Fredagar efter 15 - måndag kl 03 ökar alla priser med 15%
 *
 *      // plus och minus
 *      [] Skapa event för plus och minusknappar som ökar/minskar antalet av produkten
 *      [] När antalet uppdateras uppdateras också beställningsknappens värde
 *
 *      // beställningsknappen
 *      [] Printar antal * priset
 *      [] Har ett event som placerar munkarna i varukorgen när man klickar på knappen
 *      [] Nollställer produktkortet när man klickat på knappen
 *
 *      // sortering
 *      [] En knapp för sortering öppnar ett fönster med alternativ
 *      [] Man kan sortera på namn, pris, kategori och rating åt båda håll
 *      [] Det finns knappar för alla dessa alternativ
 *
 *      // filtrering
 *      [] En knapp för filtrering öppnar samma fönster som sortering
 *      [] Olika radio-buttons kan filtrera på olika spann av pris
 *
 *      // varukorgen
 *      [] Uppdateras /VISUELLT/ när man klickar på beställningsknapparna
 *      [] ! OPTIONAL ! Har en dropdownmeny när man hovrar över som visar valda produkter i nuläget
 *      [] Stänger produktsidan och öppnar varukorgssidan vid klick
 *      [] Stänger alltid menyn också om man klickar på varukorgen
 *
 *      // varukorgssidan
 *      [] Visar alla valda produkter i en loop
 *      [] Man kan ändra antal med knappar samt ta bort alla produkter av en sort med en knapp
 *      [] Man kan också rensa alla produkter med en knapp
 *      [] Det finns ett fält för rabattkoder
 *      [] Prisspecifikation med frakt och totalpris visas och uppdateras /VISUELLT/ vid ändringar
 *      [] Måndagar innan kl 10 är det 10% rabatt på totalen och en text visas och förklarar detta
 *      [] Vid beställning >10 st av samma produkt tillkommer rabatt på 10% på den varan
 *      [] Vid beställning av mer än 15 produkter är frakten gratis, annars 25kr + 10% av totalen
 *      [] Användaren har bara 15 min från att varukorgssidan öppnas att slutföra beställningen
 *      [] Användaren meddelas om detta överskrids och allt rensas/nollställs
 *
 *      // formuläret
 *      [] Man kan välja betalsätt vilket öppnar två olika formulär
 *      [] Har man beställt för mer än 800 kr kan man inte välja faktura
 *      [] Alla fält, förutom kort-fälten, valideras
 *      [] Felen som finns markeras tydligt
 *      [] Knappen skicka är inte möjlig att klicka förrän alla fält är validerade
 *
 *
 *
 *
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
