/**
 *
 *
 *
 *      // produkterna
 *      [X] Skapa en array för alla produkter i butiken
 *      [X] Fyll i all info om objekten i arrayen
 *      [X] Skriv in så att alla bilder får rätt mått i innerHTML
 *      [X] Gör en loop som visar produkterna i HTML-strukturen
 *      [X] Fredagar efter 15 - måndag kl 03 ökar alla priser med 15%
 *
 *      // plus och minus
 *      [X] Skapa event för plus och minusknappar som ökar/minskar antalet av produkten
 *      [X] När antalet uppdateras uppdateras också beställningsknappens värde
 *
 *      // beställningsknappen
 *      [X] Printar antal * priset
 *      [X] Har ett event som placerar munkarna i varukorgen när man klickar på knappen
 *      [X] Nollställer produktkortet när man klickat på knappen
 *
 *
 *      // filtrering och sortering
 *      [X] En knapp för filtrering och sortering öppnar fält med alternativ
 *      [X] Man kan sortera på namn, pris, kategori och rating åt båda håll
 *      [X] Det finns knappar för alla dessa alternativ
 *      [] ! OPTIONAL ! Olika radiobuttons kan filtrera på olika spann av pris
 *
 *      // varukorgen
 *      [X] Uppdateras /VISUELLT/ när man klickar på beställningsknapparna
 *      [] ! OPTIONAL ! Har en dropdownmeny när man hovrar över som visar valda produkter i nuläget
 *      [X] Stänger produktsidan och öppnar varukorgssidan vid klick
 *      [X] Stänger alltid menyn också om man klickar på varukorgen
 *
 *      // varukorgssidan
 *      [X] Visar alla valda produkter i en loop
 *      [X] Man kan ändra antal med knappar samt ta bort alla produkter av en sort med en knapp
 *      [X] Man kan också rensa alla produkter med en knapp
 *      [X] Det finns ett fält för rabattkoder
 *      [X] Prisspecifikation med frakt och totalpris visas och uppdateras /VISUELLT/ vid ändringar
 *      [X] Måndagar innan kl 10 är det 10% rabatt på totalen och en text visas och förklarar detta
 *      [X] Vid beställning >10 st av samma produkt tillkommer rabatt på 10% på den varan
 *      [X] Vid beställning av mer än 15 produkter är frakten gratis, annars 25kr + 10% av totalen
 *              ^Ändrat denna till $10 istället för 25kr^
 *      [X] Användaren har bara 15 min från att varukorgssidan öppnas att slutföra beställningen
 *      [X] Användaren meddelas om detta överskrids och allt rensas/nollställs
 *
 *      // formuläret
 *      [X] Man kan välja betalsätt vilket öppnar två olika formulär
 *      [X] Har man beställt för mer än 800 kr kan man inte välja faktura
 *      [X] Alla fält, förutom kort-fälten, valideras
 *      [X] Felen som finns markeras tydligt
 *      [X] Knappen skicka är inte möjlig att klicka förrän alla fält är validerade
 *      [X] Det ska visas en beställningsöversikt som kommer fram när beställningen läggs
 *
 *      // EXTRA
 *      [X] Se över alla klasser och namnge dem bättre (knapparna i CSS tex)
 *      [X] Lägga till ruta om försäkran om att man vill tömma varukorg
 *      [] Lägga in fler bilder på varje produkt
 *      [X] Lägg till copytext
 *      [X] Fixa en tom varukorgs-vy
 *      [X] Sorterings-funktionen
 *      [X] Lösa visually_hidden-problemet
 *      [X] Fallback-meddelande om användaren inte har JS
 *      [] Skriv ut vad rabatten är på
 *      [] Flytta ut i moduler och förbättra print-funktionerna
 *      [X] Gömma formuläret om varukorgen är tom
 *
 *
 */

// Importera produkterna från products.mjs
// eslint-disable-next-line
import products from './products.mjs';

// Variabler för menyn
const menuBtn = document.querySelector('#toggleNav');
const nav = document.querySelector('#fullNav');
const menuLinks = document.querySelectorAll('.menuLink');

// Variabel för body
const bodyTag = document.body;

// Variabler för kundvagnen
const shoppingCart = document.querySelector('#shoppingCart');
const cartAmount = document.querySelector('#amountCounter');
const productPage = document.querySelector('#productPage');
const cartPage = document.querySelector('#cartPage');
const backToProducts = document.querySelector('#backToProducts');
const productContainer = document.querySelector('#productContainer');
const cartProducts = document.querySelector('#cartProducts');
const clearCart = document.querySelector('#clearCartBtn');
const promoContainer = document.querySelector('#promoCodeContainer');
const codeBtn = document.querySelector('#codeBtn');
const checkoutTotal = document.querySelector('#checkoutTotal');

const orderForm = document.querySelector('#orderForm');
const wrongInputPopUp = document.querySelector('#wrongInputPopUp');

const sureToDelete = document.querySelector('#sureToDelete');
const backToCart = document.querySelector('#backToCart');
const deleteContainer = document.querySelector('#popUpDelete');

const tenMoreMin = document.querySelector('#tenMoreMin');
const clearAllBtn = document.querySelector('#clearAllBtn');
const slowPopUP = document.querySelector('#slowPopUp');

const invoiceRadio = document.querySelector('#invoiceRadio');

// Variabler för knappar för att byta bilder

// Timer för långsam användare
let timerRunning = false;
let timerId;

// Variabler för att skifta färgtema
const themeToggle = document.querySelector('#toggleTheme');
const lightMode = document.querySelector('#lightModeIcon');
const darkMode = document.querySelector('#darkModeIcon');

// Variabler för att byta bild i beskrivningen
const phraseImgBlack = document.querySelector('#phraseImageBlack');
const phraseImgWhite = document.querySelector('#phraseImageWhite');

// Variabler för filter
const filterBtn = document.querySelector('#filterBtn');
const filterField = document.querySelector('#sortFilterField');

const sortNameAZ = document.querySelector('#sortNameAZ');
const sortNameZA = document.querySelector('#sortNameZA');
const sortPrice19 = document.querySelector('#sortPrice19');
const sortPrice91 = document.querySelector('#sortPrice91');
const sortCategoryAZ = document.querySelector('#sortCategoryAZ');
const sortCategoryZA = document.querySelector('#sortCategoryZA');
const sortRating19 = document.querySelector('#sortRating19');
const sortRating91 = document.querySelector('#sortRating91');

// Variabler för formuläret
const clearCartAndField = document.querySelector('#clearBtn');
const cardInvoiceRadios = Array.from(
  // eslint-disable-next-line
  document.querySelectorAll('input[name="payment_method"]')
);
const cardOption = document.querySelector('#cardForm');
const invoiceOption = document.querySelector('#invoiceForm');

// Variabler för RegEx och formulär
const lName = document.querySelector('#lName');
const fName = document.querySelector('#fName');
const streetName = document.querySelector('#streetName');
const postalCode = document.querySelector('#postalCode');
const postalArea = document.querySelector('#postalArea');
const phoneNumber = document.querySelector('#phoneNumber');
const emailForm = document.querySelector('#emailForm');
const socialNr = document.querySelector('#socialNr');
const checkoutBtn = document.querySelector('#checkoutBtn');
const policyAgreeCheckbox = document.querySelector('#policyAgreeCheckbox');
const cardRadioButton = document.querySelector('#cardRadioButton');
const invoiceRadioButton = document.querySelector('#invoiceRadioButton');

// RegEx
const nameRegEx = /^[a-zäöå,.'-]+$/i;
const addressRegEx =
  /^([A-zäöåÄÖÅ.'-]{2,40}?\s)+([0-9]{1,5}[A-z]{0,3}?)(\s[A-z]{0,2})?$/;
const postalNrRegEx = /^[1-9]\d{2}\s?\d{2}/;
const postalAreaRegEx = /^([A-zåäöÅÄÖ.'-]{2,})+(\s[A-zåäöÅÄÖ.'-]{0,})?$/;
const phoneRegEx = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const socialRegEx =
  /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/;

// Objekt för olika error-meddelanden
const errorMessageInput = {
  fName: 'Please check this field again.',
  lName: 'Please check this field again.',
  streetName: 'Please enter a valid street address.',
  postalCode: 'Please enter a valid postal code.',
  postalArea: 'Please enter a valid postal area.',
  phoneNumber: 'Please enter a valid phone number.',
  emailForm: 'Please enter a valid email address.',
  socialNr: 'Please enter a valid social security number.',
  policyAgreeCheckbox: 'You need to agree to this',
};

// Variabler för bekräftelseformulär
const orderDone = document.querySelector('#orderDone');
const fullOrderContainer = document.querySelector('#fullOrderContainer');
const fullOrderSummary = document.querySelector('#fullOrderSummary');
const startOver = document.querySelector('#startOver');

// En array för alla produkter som hamnar i varukorgen
let cartArray = [];

// Tom varukorg
function cartIsEmpty() {
  orderForm.classList.add('hidden');
  cartProducts.innerHTML = `
  <div class="empty_cart">
  <p>Your cart is empty.</p>
  </div>
  `;
  checkoutTotal.innerHTML = '';
}
cartIsEmpty();

// Funktion för att öppna och stänga navigationsmenyn, även med länkarna
function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open');
  bodyTag.classList.toggle('fixed_background');
  shoppingCart.classList.toggle('shopping_black');
  cartAmount.classList.toggle('amount_color');
  if (isOpen) {
    // eslint-disable-next-line
    gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    menuBtn.setAttribute('aria-label', 'Close meny');
  } else {
    menuBtn.setAttribute('aria-label', 'Open meny');
  }
}

// Meddelande för seg kund
function messageToSlow() {
  // eslint-disable-next-line
  gsap.fromTo(slowPopUP, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  slowPopUP.classList.remove('hidden');
}
function startTimer(duration) {
  timerId = setTimeout(messageToSlow, duration);
  timerRunning = true;
}

// Function för att avbryta timer
function stopTimer() {
  if (timerRunning) {
    clearTimeout(timerId);
    timerRunning = false;
  }
}

// Popup när kunden är för långsam
function clearAll() {
  // eslint-disable-next-line
  emptyCart();
  orderForm.reset();
  slowPopUP.classList.add('hidden');
  window.scrollTo(0, 0);
}
function addTenMin() {
  slowPopUP.classList.add('hidden');
  startTimer(1000 * 60 * 10);
}

tenMoreMin.addEventListener('click', addTenMin);
clearAllBtn.addEventListener('click', clearAll);

// Loop med event för länkarna i navigationsmenyn
// ! Medveten anonym funktion !
menuLinks.forEach((item) => {
  item.addEventListener('click', toggleMenu);
});

// Event för menyknapp
menuBtn.addEventListener('click', toggleMenu);

// Funktioner för att byta bild på framsidan beroende på theme
function changePhraseToWhite() {
  phraseImgWhite.classList.remove('hidden');
  phraseImgBlack.classList.add('hidden');
}
function changePhraseToBlack() {
  phraseImgWhite.classList.add('hidden');
  phraseImgBlack.classList.remove('hidden');
}

// Toggle för dark/lightmode
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.body.classList.add('dark_mode');
  darkMode.classList.toggle('hidden');
  changePhraseToWhite();
} else {
  lightMode.classList.toggle('hidden');
  changePhraseToBlack();
}
// Ändra färgtema
function toggleTheme() {
  document.body.classList.toggle('dark_mode');
  lightMode.classList.toggle('hidden');
  darkMode.classList.toggle('hidden');
  const isDark = document.body.classList.contains('dark_mode');
  if (isDark) {
    changePhraseToWhite();
  } else {
    changePhraseToBlack();
  }
}

themeToggle.addEventListener('click', toggleTheme);

// Minska antal i kundvagn
function decreaseCartAmount(e) {
  const index = e.currentTarget.dataset.id;
  if (cartArray[index].amount <= 1) {
    cartArray[index].amount = 1;
  } else {
    cartArray[index].amount -= 1;
  }
  // eslint-disable-next-line
  printCart();
}

// Öka antal i kundvagn
function increaseCartAmount(e) {
  const index = e.currentTarget.dataset.id;
  cartArray[index].amount += 1;
  // eslint-disable-next-line
  printCart();
}

// Ta bort enskild produkt i kundvagnen
function deleteSingleProduct(e) {
  const productId = Number(e.currentTarget.id.replace('delete-', ''));
  console.log(productId);
  const index = cartArray.findIndex((product) => product.id === productId);
  if (index > -1) {
    cartArray.splice(index, 1);
    // eslint-disable-next-line
    printCart();
  }
  const lastItemDelete = cartArray.length;
  if (lastItemDelete === 0) {
    // eslint-disable-next-line
    emptyCart();
  }
}

// Pop-up för att tömma kundvagnen
function closePopUp() {
  deleteContainer.classList.add('hidden');
}
backToCart.addEventListener('click', closePopUp);
// eslint-disable-next-line
sureToDelete.addEventListener('click', emptyCart);

// En funktion för att printa varukorgen
function printCart() {
  let priceChange = 1;
  let totalSum = 0;
  let totalAmount = 0;
  let billedAmount = 0;
  let mondayOffer = '';
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();

  cartProducts.innerHTML = '';
  // Helgpåslag av pris 15%
  if (
    (dayOfWeek === 5 && currentHour >= 15) ||
    dayOfWeek === 6 ||
    dayOfWeek === 0 ||
    (dayOfWeek === 1 && currentHour <= 3)
  ) {
    priceChange = 1.15;
  }

  cartArray.forEach((product, index) => {
    let productPrice = product.price;
    if (product.amount >= 10) {
      productPrice *= 0.9;
    }
    const adjustedProductPrice = productPrice * priceChange;

    totalSum += product.amount * adjustedProductPrice;
    totalAmount += product.amount;

    cartProducts.innerHTML += `
    <article class="product_in_cart" id="cartItem_${[index]}">
    <div class="cart_pic_name">
        <figure>
            <img 
            src="${product.images[0].src}" 
            alt="${product.images[0].alt}" 
            height="${product.images[0].height}" 
            width="${product.images[0].width}"
            >
        </figure>
        <h2>${product.name}</h2>
        <p class="product_unit_price">
        $${Math.round(product.price * priceChange)}
        </p>
    </div>
    <div class="cart_amount_container">
        <div class="adjust_btn_container">
            <button class="decrease_cart_btn cart_adjust_btn product_btn" data-id="${index}">-</button><span
                class="product_amount">${product.amount}</span><button
                class="increase_cart_btn cart_adjust_btn product_btn" data-id="${index}">+</button>
        </div>
    </div>
    <div class="cart_total_container">
        <p>Total: 
        $${Math.round(adjustedProductPrice * product.amount)}
        </p>
    </div>
    <button class="delete_product" 
    id="delete-${product.id}">
    <span class="material-symbols-outlined">
            delete
        </span></button>
    </article>
    `;
  });

  // Måndagsrabatt på 10% innan kl 10
  if (dayOfWeek === 1 && currentHour <= 17) {
    totalSum *= 0.9;
    mondayOffer += `<p class="monday_offer">
      Monday morning shopping gives you an extra 10% off!
      </p>`;
  }

  // Räkna ut frakt
  let shippingSumTotal = 0;
  if (totalAmount > 15) {
    shippingSumTotal = 0;
  } else {
    shippingSumTotal = `${Math.round(10 + 0.1 * totalSum)}`;
  }
  // Totalsumman med frakt
  billedAmount = Number(shippingSumTotal) + totalSum;

  // För att skriva ut totalen
  checkoutTotal.innerHTML = '';
  checkoutTotal.innerHTML = `
  ${mondayOffer}
  <div class="checkout_total">
  <p>Subtotal:</p>
  <p id="totalSum">$${Math.round(totalSum)}</p>
  <p>Shipping:</p>
  <p id="shippingSum">$${shippingSumTotal}</p>
  <p>Total:</p>
  <p id="billedAmount">$${Math.round(billedAmount)}</p>
  </div>
  `;

  // För att uppdatera numret på varukorgen
  if (totalAmount > 0) {
    cartAmount.classList.remove('hidden');
    clearCart.classList.remove('hidden');
    cartAmount.innerHTML = '';
    cartAmount.innerHTML = `
   ${totalAmount}
  `;
  }
  // Ta bort faktura som alternativ om $800 överksrids
  if (billedAmount > 800) {
    invoiceRadio.classList.add('hidden');
  } else {
    invoiceRadio.classList.remove('hidden');
  }

  // Ta bort enskild produkt
  Array.from(document.querySelectorAll('.delete_product')).forEach((btn) => {
    btn.addEventListener('click', deleteSingleProduct);
  });

  // Funktioner för att minska och öka antal produkter
  const decreaseCartBtn = document.querySelectorAll('.decrease_cart_btn');
  const increaseCartBtn = document.querySelectorAll('.increase_cart_btn');

  // Öka och minska antal med knapparna
  decreaseCartBtn.forEach((btn) => {
    btn.addEventListener('click', decreaseCartAmount);
  });

  increaseCartBtn.forEach((btn) => {
    btn.addEventListener('click', increaseCartAmount);
  });

  fullOrderContainer.innerHTML = '';
  cartArray.forEach((product) => {
    let productPrice = product.price;
    if (product.amount >= 10) {
      productPrice *= 0.9;
    }
    const adjustedProductPrice = productPrice * priceChange;

    totalSum += product.amount * adjustedProductPrice;
    totalAmount += product.amount;

    fullOrderContainer.innerHTML += `
    <div class="product_summary_field">
    <p class="done_amount">${product.amount}x</p>
    <p>${product.name}</p>
    <p>$${Math.round(adjustedProductPrice * product.amount)}</p>
</div>
    `;
  });

  // Skriva ut totalen på bekräftelsen
  fullOrderSummary.innerHTML = '';
  fullOrderSummary.innerHTML = `
  <p class="done_total">Total:</p>
  <p>$${Math.round(billedAmount)}</p>
  `;
}

// Tömma varukorgen
function emptyCart() {
  cartArray = [];
  clearCart.classList.add('hidden');
  cartAmount.classList.add('hidden');
  deleteContainer.classList.add('hidden');
  stopTimer();
  printCart();
  cartIsEmpty();
  console.log(cartArray);
}
// Pop-up-fönster för att dubbelkolla att användaren vill ta bort alla varor
function triggerPopUp() {
  // eslint-disable-next-line
  gsap.fromTo(deleteContainer, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  deleteContainer.classList.remove('hidden');
}
clearCart.addEventListener('click', triggerPopUp);

// Knapparna för att öka och minska antalet
function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  if (products[index].amount <= 0) {
    products[index].amount = 0;
  } else {
    products[index].amount -= 1;
  }
  // eslint-disable-next-line
  printProducts();
}

function increaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  products[index].amount += 1;
  // eslint-disable-next-line
  printProducts();
}

// Funktion för att lägga till produkter i kundvagnen
function addToCart(e) {
  const index = e.currentTarget.id.split('-')[1];
  console.log(e.currentTarget.id);
  orderForm.classList.remove('hidden');

  // Välja ut rätt produkt
  const productToAdd = {
    ...products[index],
  };

  // Kolla om produkten finns i varukorgen
  const existingProduct = cartArray.find(
    // eslint-disable-next-line
    (product) => product.id === productToAdd.id
  );

  // Om den finns adderas amounten istället för att lägga till ny produkt
  if (existingProduct) {
    existingProduct.amount += productToAdd.amount;
    // Annars läggs den till som ny produkt
  } else {
    cartArray.push(productToAdd);
  }

  // Nollställa antalet i product-arrayen
  products[index].amount = 0;

  // Nollställa antalet i HTML-strukturen
  const amountNumber = document.getElementById(`amount-${index}`);
  const totalBtn = document.getElementById(`total-${index}`);

  // Om summan är mer än noll ändras den till noll
  if (amountNumber) {
    amountNumber.textContent = products[index].amount;
  }

  if (totalBtn) {
    totalBtn.textContent = 'Buy $0';
  }
  console.log(cartArray);
  // eslint-disable-next-line
  gsap.to('#amountCounter', {
    scale: 1.3,
    yoyo: true,
    repeat: 1,
    ease: 'power3.out',
    duration: 0.4,
  });

  // Starta timer
  if (!timerRunning) {
    startTimer(1000 * 60 * 15);
  }

  printCart();
}

// Byta bilder på produkterna
function toggleImage(imageType, productId) {
  const firstImage = document.getElementById(`firstImage-${productId}`);
  const secondImage = document.getElementById(`secondImage-${productId}`);
  const thirdImage = document.getElementById(`thirdImage-${productId}`);
  const firstIcon = document.getElementById(`firstIcon-${productId}`);
  const secondIcon = document.getElementById(`secondIcon-${productId}`);
  const thirdIcon = document.getElementById(`thirdIcon-${productId}`);
  const fourthIcon = document.getElementById(`fourthIcon-${productId}`);
  const fifthIcon = document.getElementById(`fifthIcon-${productId}`);
  const sixthIcon = document.getElementById(`sixthIcon-${productId}`);

  if (firstImage && secondImage && thirdImage) {
    switch (imageType) {
      case 'firstImage':
        firstImage.classList.remove('hidden');
        secondImage.classList.add('hidden');
        thirdImage.classList.add('hidden');
        firstIcon.classList.add('hidden');
        secondIcon.classList.remove('hidden');
        thirdIcon.classList.remove('hidden');
        fourthIcon.classList.add('hidden');
        fifthIcon.classList.remove('hidden');
        sixthIcon.classList.add('hidden');
        console.log('1');
        break;
      case 'secondImage':
        firstImage.classList.add('hidden');
        secondImage.classList.remove('hidden');
        thirdImage.classList.add('hidden');
        firstIcon.classList.remove('hidden');
        secondIcon.classList.add('hidden');
        thirdIcon.classList.add('hidden');
        fourthIcon.classList.remove('hidden');
        fifthIcon.classList.remove('hidden');
        sixthIcon.classList.add('hidden');
        console.log('2');
        break;
      case 'thirdImage':
        firstImage.classList.add('hidden');
        secondImage.classList.add('hidden');
        thirdImage.classList.remove('hidden');
        firstIcon.classList.remove('hidden');
        secondIcon.classList.add('hidden');
        thirdIcon.classList.remove('hidden');
        fourthIcon.classList.add('hidden');
        fifthIcon.classList.add('hidden');
        sixthIcon.classList.remove('hidden');
        console.log('3');
        break;
      default:
        break;
    }
  } else if (firstImage && secondImage && !thirdImage) {
    switch (imageType) {
      case 'firstImage':
        firstImage.classList.remove('hidden');
        secondImage.classList.add('hidden');
        firstIcon.classList.add('hidden');
        secondIcon.classList.remove('hidden');
        thirdIcon.classList.remove('hidden');
        fourthIcon.classList.add('hidden');
        console.log('1');
        break;
      case 'secondImage':
        firstImage.classList.add('hidden');
        secondImage.classList.remove('hidden');
        firstIcon.classList.remove('hidden');
        secondIcon.classList.add('hidden');
        thirdIcon.classList.add('hidden');
        fourthIcon.classList.remove('hidden');
        console.log('2');
        break;
      default:
        break;
    }
  }
}

// Eventlyssnare på knapparna
function addEventListeners(product) {
  const firstImageBtn = document.getElementById(`firstImageBtn-${product.id}`);
  const secondImageBtn = document.getElementById(
    // eslint-disable-next-line
    `secondImageBtn-${product.id}`
  );
  const thirdImageBtn = document.getElementById(`thirdImageBtn-${product.id}`);

  if (firstImageBtn) {
    firstImageBtn.addEventListener(
      'click',
      () =>
        // eslint-disable-next-line
        toggleImage('firstImage', product.id)
      // eslint-disable-next-line
    );
  }

  if (secondImageBtn) {
    secondImageBtn.addEventListener(
      'click',
      () =>
        // eslint-disable-next-line
        toggleImage('secondImage', product.id)
      // eslint-disable-next-line
    );
  }

  if (thirdImageBtn) {
    thirdImageBtn.addEventListener(
      'click',
      () =>
        // eslint-disable-next-line
        toggleImage('thirdImage', product.id)
      // eslint-disable-next-line
    );
  }
}

// En funktion för att printa produkterna
function printProducts() {
  let priceChange = 1;
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();

  productContainer.innerHTML = '';

  if (
    (dayOfWeek === 5 && currentHour >= 15) ||
    dayOfWeek === 6 ||
    dayOfWeek === 0 ||
    (dayOfWeek === 1 && currentHour <= 3)
  ) {
    priceChange = 1.15;
  }

  products.forEach((product, index) => {
    let productPrice = product.price;
    if (product.amount >= 10) {
      productPrice *= 0.9;
    }
    const adjustedProductPrice = productPrice * priceChange;

    // Lägger till en bild och knappar om det finns mer än en
    const secondImage =
      product.images.length >= 2
        ? `<img 
    src="${product.images[1].src}" 
    alt="${product.images[1].alt}" 
    height="${product.images[1].height}" 
    width="${product.images[1].width}"
    class="product_img hidden"
    id="secondImage-${product.id}"
    >`
        : '';
    // Lägger till knappar om det finns fler bilder
    const imageBtns =
      product.images.length >= 2
        ? `
  <button class="change_image" id="firstImageBtn-${product.id}">
  <span class="material-symbols-outlined image_icon hidden" aria-label="First image" id="firstIcon-${product.id}">
radio_button_unchecked
</span>
<span class="material-symbols-outlined image_icon" aria-label="Image showing" id="secondIcon-${product.id}">
radio_button_checked
</span>
</button>
  <button class="change_image" id="secondImageBtn-${product.id}">
  <span class="material-symbols-outlined image_icon" aria-label="Second image" id="thirdIcon-${product.id}">
radio_button_unchecked
</span>
<span class="material-symbols-outlined image_icon hidden" aria-label="Image showing" id="fourthIcon-${product.id}">
radio_button_checked
</span>
  </button>`
        : '';
    // Lägger till en tredje bild och knapp om det finns mer än en
    const thirdImage =
      product.images.length === 3
        ? `<img 
      src="${product.images[2].src}" 
      alt="${product.images[2].alt}" 
      height="${product.images[2].height}" 
      width="${product.images[2].width}"
      class="product_img hidden"
      id="thirdImage-${product.id}"
      >`
        : '';
    // Lägger till en till knapp om det finns tre bilder
    const imageBtnsThird =
      product.images.length === 3
        ? `
      <button class="change_image" id="thirdImageBtn-${product.id}">
      <span class="material-symbols-outlined image_icon" aria-label="Third image" id="fifthIcon-${product.id}">
radio_button_unchecked
</span>
<span class="material-symbols-outlined image_icon hidden" aria-label="Image showing" id="sixthIcon-${product.id}">
radio_button_checked
</span>
</button>`
        : '';

    productContainer.innerHTML += `
    <article class="product_card" id="product_card__${[index]}">
    <figure class="product_img_container">
      <img src="${product.images[0].src}" alt="${product.images[0].alt}" 
      height="${product.images[0].height}" width="${product.images[0].width}"
      class="product_img"
      id="firstImage-${product.id}">
      ${secondImage}
      ${thirdImage}
      <div class="button_container">
      ${imageBtns}
      ${imageBtnsThird}
      </div>
    </figure>
    <div class="product_info">
        <h2>${product.name}</h2>
        <p class="product_description">${product.description}</p>
        <p>$${Math.round(product.price * priceChange)}</p>
        <p>Rating: ${product.rating}/5</p>
        <div class="adjust_amount_container">
        <button class="decrease_btn product_btn" data-id="${index}">-</button>
        <p class="amount_number" id="amount-${index}">${product.amount}</p>
        <button class="increase_btn product_btn" data-id="${index}">+</button>
        </div>
        <button class="total_btn product_btn" id="total-${index}">
        Buy $${Math.round(adjustedProductPrice * product.amount)}
        </button>
    </div>
</article>
    `;
  });
  // Loop för att få alla eventlyssnare
  products.forEach((product) => {
    addEventListeners(product);
  });

  // Funktioner för att minska och öka antal produkter
  const decreaseBtn = document.querySelectorAll('.decrease_btn');
  const increaseBtn = document.querySelectorAll('.increase_btn');

  // Öka och minska antal med knapparna
  decreaseBtn.forEach((btn) => {
    btn.addEventListener('click', decreaseAmount);
  });

  increaseBtn.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });

  // Lägga till i kundkorgen
  const buyItem = document.querySelectorAll('.total_btn');

  buyItem.forEach((btn) => {
    btn.addEventListener('click', addToCart);
  });
}

printProducts();

// Filter och sortering
function toggleFilter() {
  // eslint-disable-next-line
  gsap.fromTo(
    filterField,
    { height: 0, overflow: 'hidden', opacity: 0 },
    // eslint-disable-next-line
    { height: 'auto', opacity: 1, duration: 0.7, ease: 'sine.out' }
  );
  filterField.classList.toggle('hidden');
}

filterBtn.addEventListener('click', toggleFilter);

// Sorteringsfunktion
function sortProducts(property) {
  products.sort((product1, product2) => {
    if (product1[property] < product2[property]) {
      return -1;
    }
    if (product1[property] > product2[property]) {
      return 1;
    }
    return 0;
  });
  printProducts();
}

// Sortera baklänges
function sortProductsReversed(property) {
  products.sort((product1, product2) => {
    if (product1[property] > product2[property]) {
      return -1;
    }
    if (product1[property] < product2[property]) {
      return 1;
    }
    return 0;
  });
  printProducts();
}
// Funktioner för att få in rätt property
function sortProductsByName() {
  sortProducts('name');
}
function sortProductsByNameReversed() {
  sortProductsReversed('name');
}
function sortProductsByPrice() {
  sortProducts('price');
}
function sortProductsByPriceReversed() {
  sortProductsReversed('price');
}
function sortProductsByCategory() {
  sortProducts('category');
}
function sortProductsByCategoryReversed() {
  sortProductsReversed('category');
}
function sortProductsByRating() {
  sortProducts('rating');
}
function sortProductsByRatingReversed() {
  sortProductsReversed('rating');
}
// Eventlyssnare på sorteringsknapparna
sortNameAZ.addEventListener('click', sortProductsByName);
sortNameZA.addEventListener('click', sortProductsByNameReversed);
sortPrice19.addEventListener('click', sortProductsByPrice);
sortPrice91.addEventListener('click', sortProductsByPriceReversed);
sortCategoryAZ.addEventListener('click', sortProductsByCategory);
sortCategoryZA.addEventListener('click', sortProductsByCategoryReversed);
sortRating19.addEventListener('click', sortProductsByRating);
sortRating91.addEventListener('click', sortProductsByRatingReversed);

// Öppna kundkorgen

function openCart() {
  cartPage.classList.remove('hidden');
  productPage.classList.add('hidden');

  if (nav.classList.contains('open')) {
    toggleMenu();
  }
  if (productPage.classList.contains('hidden')) {
    window.scrollTo(0, 0);
  }
}

shoppingCart.addEventListener('click', openCart);

// Gå tillbaka till produktsidan
function shopMore() {
  cartPage.classList.add('hidden');
  productPage.classList.remove('hidden');
}

backToProducts.addEventListener('click', shopMore);

// Toggle rabattkodsfältet
function openCodeField() {
  // eslint-disable-next-line
  gsap.fromTo(promoContainer, { opacity: 0 }, { opacity: 1, duration: 0.7 });
  promoContainer.classList.toggle('hidden');
}

codeBtn.addEventListener('click', openCodeField);

// Välja faktura eller kort
function changePaymentMethod() {
  invoiceOption.classList.toggle('hidden');
  cardOption.classList.toggle('hidden');
}
cardInvoiceRadios.forEach((radioBtn) => {
  radioBtn.addEventListener('change', changePaymentMethod);
});

// Rensa formulär och varukorg
clearCartAndField.addEventListener('click', emptyCart);

// Funktioner för att validera all RegEx
function validateFName() {
  return nameRegEx.test(fName.value);
}
function validateLName() {
  return nameRegEx.test(lName.value);
}
function validateAdress() {
  return addressRegEx.test(streetName.value);
}
function validatePostalCode() {
  return postalNrRegEx.test(postalCode.value);
}
function validatePostalArea() {
  return postalAreaRegEx.test(postalArea.value);
}
function validatePhoneNumber() {
  return phoneRegEx.test(phoneNumber.value);
}
function validateEmail() {
  return emailRegEx.test(emailForm.value);
}
function validateSocialNr() {
  return socialRegEx.test(socialNr.value);
}
function validatePolicy() {
  return policyAgreeCheckbox.checked;
}
function isCardChosen() {
  return cardRadioButton.checked;
}
function isInvoiceChosen() {
  return invoiceRadioButton.checked;
}

// Funktion för att kolla om det finns error-meddelande eller om det ska läggas till
function displayInputError(inputField, isValid) {
  const messageElement = document.querySelector(`#${inputField}-error`);
  const inputErrorField = document.querySelector(`#${inputField}`);
  if (!isValid) {
    if (!messageElement) {
      const errorMessage = errorMessageInput[inputField];
      const newErrorElement = document.createElement('p');
      inputErrorField.classList.add('input_error_field');
      newErrorElement.classList.add('input_error_message', 'hidden');
      newErrorElement.id = `${inputField}-error`;
      newErrorElement.innerText = errorMessage;
      document
        .getElementById(`${inputField}-errorContainer`)
        .append(newErrorElement);
    }
  } else if (messageElement) {
    messageElement.remove();
    document.getElementById(inputField).classList.remove('error_field');
    document.getElementById(inputField).classList.remove('input_error_field');
  }
}

function checkInput() {
  displayInputError('fName', validateFName());
  displayInputError('lName', validateLName());
  displayInputError('streetName', validateAdress());
  displayInputError('postalCode', validatePostalCode());
  displayInputError('postalArea', validatePostalArea());
  displayInputError('phoneNumber', validatePhoneNumber());
  displayInputError('emailForm', validateEmail());
  displayInputError('socialNr', validateSocialNr());
  displayInputError('policyAgreeCheckbox', validatePolicy());

  if (isCardChosen()) {
    if (
      validateFName() &&
      validateLName() &&
      validateAdress() &&
      validatePostalCode() &&
      validatePostalArea() &&
      validatePhoneNumber() &&
      validateEmail() &&
      validatePolicy()
    ) {
      checkoutBtn.classList.remove('disabled_btn');
    } else {
      checkoutBtn.classList.add('disabled_btn');
    }
  } else if (isInvoiceChosen()) {
    if (
      validateFName() &&
      validateLName() &&
      validateAdress() &&
      validatePostalCode() &&
      validatePostalArea() &&
      validatePhoneNumber() &&
      validateEmail() &&
      validatePolicy() &&
      validateSocialNr()
    ) {
      checkoutBtn.classList.remove('disabled_btn');
    } else {
      checkoutBtn.classList.add('disabled_btn');
    }
  }
}

cardRadioButton.addEventListener('input', checkInput);
invoiceRadioButton.addEventListener('input', checkInput);
policyAgreeCheckbox.addEventListener('input', checkInput);
socialNr.addEventListener('input', checkInput);
emailForm.addEventListener('input', checkInput);
phoneNumber.addEventListener('input', checkInput);
postalArea.addEventListener('input', checkInput);
postalCode.addEventListener('input', checkInput);
streetName.addEventListener('input', checkInput);
lName.addEventListener('input', checkInput);
fName.addEventListener('input', checkInput);

// Funktion för att kolla fälten
function activateCheckoutBtn() {
  checkInput();
  const errorMessages = document.querySelectorAll('.input_error_message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.classList.remove('hidden');
  });
  const allErrorInputs = document.querySelectorAll('.input_error_field');
  allErrorInputs.forEach((errorInput) => {
    errorInput.classList.add('error_field');
  });
}

// Funktion och animation för popup om att något är fel i formuläret
function hidePopUp() {
  wrongInputPopUp.classList.add('hidden');
}
function showPopUp() {
  wrongInputPopUp.classList.remove('hidden');
}
// eslint-disable-next-line
const wrongInputAnimation = gsap.timeline();

function wrongInput() {
  wrongInputAnimation
    .call(showPopUp)
    .from(wrongInputPopUp, { opacity: 0 })
    .to(wrongInputPopUp, { opacity: 1, duration: 0.7 }, '<')
    .from(wrongInputPopUp, { y: 140, duration: 0.6, ease: 'power2.out' }, '<')
    .to(wrongInputPopUp, { opacity: 0, duration: 0.5 }, '>3')
    .call(hidePopUp);
}

// Funktion för skicka-knappen
function finalCheckout(e) {
  // Skicka inte in formuläret
  e.preventDefault();
  activateCheckoutBtn();
  checkInput();
  if (isCardChosen()) {
    if (
      validateFName() &&
      validateLName() &&
      validateAdress() &&
      validatePostalCode() &&
      validatePostalArea() &&
      validatePhoneNumber() &&
      validateEmail() &&
      validatePolicy()
    ) {
      console.log('Allt är ifyllt rätt');
      orderDone.classList.remove('hidden');
      // eslint-disable-next-line
      gsap.fromTo(orderDone, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      window.scrollTo(0, 0);
    } else {
      wrongInput();
      console.log('Please correct the form errors before submitting.');
    }
  } else if (isInvoiceChosen()) {
    if (
      validateFName() &&
      validateLName() &&
      validateAdress() &&
      validatePostalCode() &&
      validatePostalArea() &&
      validatePhoneNumber() &&
      validateEmail() &&
      validatePolicy() &&
      validateSocialNr()
    ) {
      console.log('Allt är ifyllt rätt');
      orderDone.classList.remove('hidden');
      // eslint-disable-next-line
      gsap.fromTo(orderDone, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      window.scrollTo(0, 0);
    } else {
      wrongInput();
      console.log('Please correct the form errors before submitting.');
    }
  }
}

// Kallar på skickaknappen
orderForm.addEventListener('submit', finalCheckout);

// Start over när beställning är lagd

function backToStart() {
  orderDone.classList.add('hidden');
  emptyCart();
  orderForm.reset();
  stopTimer();
  window.location.reload();
}

startOver.addEventListener('click', backToStart);
