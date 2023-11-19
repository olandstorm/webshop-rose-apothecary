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
