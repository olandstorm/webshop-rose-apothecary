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
 *      [X] ! OPTIONAL ! Olika radiobuttons kan filtrera på olika spann av pris
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
 *      [X] Lägga in fler bilder på varje produkt
 *      [X] Lägg till copytext
 *      [X] Fixa en tom varukorgs-vy
 *      [X] Sorterings-funktionen
 *      [X] Lösa visually_hidden-problemet
 *      [X] Fallback-meddelande om användaren inte har JS
 *      [X] Skriv ut vad rabatten är på
 *      [] Flytta ut i moduler och förbättra print-funktionerna
 *      [X] Gömma formuläret om varukorgen är tom
 *
 *
 */

/**
 * --------------------------------------------------
 *            Importing product list
 * --------------------------------------------------
 */
// eslint-disable-next-line
import products from './products.mjs';

/**
 * --------------------------------------------------
 *              //// Variables ////
 * --------------------------------------------------
 */

// Body tag
const bodyTag = document.body;

// For the navigation menu
const menuBtn = document.querySelector('#toggleNav');
const nav = document.querySelector('#fullNav');
const menuLinks = document.querySelectorAll('.menuLink');

// For shifting color scheme
const themeToggle = document.querySelector('#toggleTheme');
const lightMode = document.querySelector('#lightModeIcon');
const darkMode = document.querySelector('#darkModeIcon');

// For the product page
const productPage = document.querySelector('#productPage');

// For shifting image in introduction field
const phraseImgBlack = document.querySelector('#phraseImageBlack');
const phraseImgWhite = document.querySelector('#phraseImageWhite');

// Filter choices
const filterBtn = document.querySelector('#filterBtn');
const filterField = document.querySelector('#sortFilterField');
let currentFilter = 'all';

const sortNameAZ = document.querySelector('#sortNameAZ');
const sortNameZA = document.querySelector('#sortNameZA');
const sortPrice19 = document.querySelector('#sortPrice19');
const sortPrice91 = document.querySelector('#sortPrice91');
const sortCategoryAZ = document.querySelector('#sortCategoryAZ');
const sortCategoryZA = document.querySelector('#sortCategoryZA');
const sortRating19 = document.querySelector('#sortRating19');
const sortRating91 = document.querySelector('#sortRating91');

// For adding product to cart-popup
const addPopUp = document.querySelector('#addPopUp');

// For the cart page
const shoppingCart = document.querySelector('#shoppingCart');
const cartAmount = document.querySelector('#amountCounter');
const cartPage = document.querySelector('#cartPage');
const backToProducts = document.querySelector('#backToProducts');
const productContainer = document.querySelector('#productContainer');
const cartProducts = document.querySelector('#cartProducts');
const clearCart = document.querySelector('#clearCartBtn');
const checkoutTotal = document.querySelector('#checkoutTotal');

// Array for the cart
let cartArray = [];

// For the promo code field
const codeBtn = document.querySelector('#codeBtn');
const promoContainer = document.querySelector('#promoCodeContainer');
const codeInput = document.querySelector('#codeInput');
const addCode = document.querySelector('#addCode');
const codeTextField = document.querySelector('#codeTextField');

// For the promo code price adjustment
let deal = 1;

// For the form
const orderForm = document.querySelector('#orderForm');
const formSection = document.querySelector('#formSection');
const wrongInputPopUp = document.querySelector('#wrongInputPopUp');
const clearCartAndField = document.querySelector('#clearBtn');
const checkoutBtn = document.querySelector('#checkoutBtn');

// For payment choices
const cardRadioButton = document.querySelector('#cardRadioButton');
const invoiceRadio = document.querySelector('#invoiceRadio');
const invoiceRadioButton = document.querySelector('#invoiceRadioButton');
const cardInvoiceRadios = Array.from(
  // eslint-disable-next-line
  document.querySelectorAll('input[name="payment_method"]')
);
const cardOption = document.querySelector('#cardForm');
const invoiceOption = document.querySelector('#invoiceForm');

// For delete all-popup
const sureToDelete = document.querySelector('#sureToDelete');
const backToCart = document.querySelector('#backToCart');
const deleteContainer = document.querySelector('#popUpDelete');

// For time out-popup
const tenMoreMin = document.querySelector('#tenMoreMin');
const clearAllBtn = document.querySelector('#clearAllBtn');
const slowPopUP = document.querySelector('#slowPopUp');

// Timer for time limit of products in cart
let timerRunning = false;
let timerId;

// For RegEx and inputs
const lName = document.querySelector('#lName');
const fName = document.querySelector('#fName');
const streetName = document.querySelector('#streetName');
const postalCode = document.querySelector('#postalCode');
const postalArea = document.querySelector('#postalArea');
const phoneNumber = document.querySelector('#phoneNumber');
const emailForm = document.querySelector('#emailForm');
const socialNr = document.querySelector('#socialNr');
const policyAgreeCheckbox = document.querySelector('#policyAgreeCheckbox');
const cardNumberInput = document.querySelector('#cardNumberInput');
const cardExpireInput = document.querySelector('#cardExpireInput');
const cardCVCInput = document.querySelector('#cardCVCInput');

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

// Error messages
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

// For confirmation-popup
const orderDone = document.querySelector('#orderDone');
const fullOrderContainer = document.querySelector('#fullOrderContainer');
const fullOrderSummary = document.querySelector('#fullOrderSummary');
const startOver = document.querySelector('#startOver');

/**
 * --------------------------------------------------
 *                //// Functions ////
 * --------------------------------------------------
 */

/**
 * --------------------------------------------------
 *                   Menu and theme
 * --------------------------------------------------
 */
// Toggles the menu and close the menu with the links
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

// For the menubutton
menuBtn.addEventListener('click', toggleMenu);

// For the links in the menu
menuLinks.forEach((item) => {
  item.addEventListener('click', toggleMenu);
});

// Shift image in description field depending on color theme
function changePhraseToWhite() {
  phraseImgWhite.classList.remove('hidden');
  phraseImgBlack.classList.add('hidden');
}
function changePhraseToBlack() {
  phraseImgWhite.classList.add('hidden');
  phraseImgBlack.classList.remove('hidden');
}

// Check user default theme and add dark theme if prefered
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  bodyTag.classList.add('dark_mode');
  darkMode.classList.toggle('hidden');
  changePhraseToWhite();
} else {
  lightMode.classList.toggle('hidden');
  changePhraseToBlack();
}

// Toggle the color theme between dark and light and
// change image in description field depending on theme
function toggleTheme() {
  bodyTag.classList.toggle('dark_mode');
  lightMode.classList.toggle('hidden');
  darkMode.classList.toggle('hidden');
  const isDark = bodyTag.classList.contains('dark_mode');
  if (isDark) {
    changePhraseToWhite();
  } else {
    changePhraseToBlack();
  }
}

// Event listener for the button that toggles color theme
themeToggle.addEventListener('click', toggleTheme);

/**
 * --------------------------------------------------
 *                   Timer
 * --------------------------------------------------
 */

// Popup when timer runs out
function messageToSlow() {
  // eslint-disable-next-line
  gsap.fromTo(slowPopUP, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  slowPopUP.classList.remove('hidden');
}

// To start the timer with a set duration
function startTimer(duration) {
  timerId = setTimeout(messageToSlow, duration);
  timerRunning = true;
}

// To stop the timer
function stopTimer() {
  if (timerRunning) {
    clearTimeout(timerId);
    timerRunning = false;
  }
}

// Empty the cart and reset the form
function clearAll() {
  // eslint-disable-next-line
  emptyCart();
  orderForm.reset();
  slowPopUP.classList.add('hidden');
  window.scrollTo(0, 0);
}

// Restart timer with 10 minutes to timer time
function addTenMin() {
  slowPopUP.classList.add('hidden');
  startTimer(1000 * 60 * 10);
}

// Event listener for the popup when timer runs out
tenMoreMin.addEventListener('click', addTenMin);
clearAllBtn.addEventListener('click', clearAll);

/**
 * --------------------------------------------------
 *              Adjust amounts in cart
 * --------------------------------------------------
 */

// Render empty cart when theres no item in cart
function cartIsEmpty() {
  formSection.classList.add('hidden');
  cartProducts.innerHTML = `
    <div class="empty_cart">
      <p>Your cart is empty.</p>
    </div>
  `;
  checkoutTotal.innerHTML = '';
}
cartIsEmpty();

// Decrease the amount on the item in the cart array and then reprint the cart
function decreaseCartAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = cartArray.find((p) => p.id === index);
  if (product.amount <= 1) {
    product.amount = 1;
  } else {
    product.amount -= 1;
  }
  // eslint-disable-next-line
  printCart();
}

// Increase the amount on the item in the cart array and then reprint the cart
function increaseCartAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = cartArray.find((p) => p.id === index);
  product.amount += 1;
  // eslint-disable-next-line
  printCart();
}

// Delete single product and check if its the last product in cart to render empty cart
function deleteSingleProduct(e) {
  const index = Number(e.currentTarget.id.replace('delete-', ''));
  const product = cartArray.findIndex((p) => p.id === index);
  if (product > -1) {
    cartArray.splice(product, 1);
    // eslint-disable-next-line
    printCart();
  }
  const lastItemDelete = cartArray.length;
  if (lastItemDelete === 0) {
    // eslint-disable-next-line
    emptyCart();
  }
}

// Empties the cart on products and renders an empty cart
function emptyCart() {
  cartArray = [];
  clearCart.classList.add('hidden');
  cartAmount.classList.add('hidden');
  deleteContainer.classList.add('hidden');
  stopTimer();
  cartIsEmpty();
  console.log(cartArray);
}

/**
 * --------------------------------------------------
 *                Empty cart popups
 * --------------------------------------------------
 */

// Pop up that checks if user wants to empty cart
function triggerPopUp() {
  // eslint-disable-next-line
  gsap.fromTo(deleteContainer, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  deleteContainer.classList.remove('hidden');
}

// Event listener to trigger pop up to check if user wants to empty cart
clearCart.addEventListener('click', triggerPopUp);

// Close pop up that checks if user wants to empty cart
function closePopUp() {
  deleteContainer.classList.add('hidden');
}

// Event listeners for buttons in "sure to empty cart"-pop up
backToCart.addEventListener('click', closePopUp);
sureToDelete.addEventListener('click', emptyCart);

/**
 * --------------------------------------------------
 *              Deals and promo codes
 * --------------------------------------------------
 */

// Adding product if user writes in the right code
const dealProduct = {
  name: 'Tomato Tango Symphony by Jenni',
  price: 1337,
  images: [
    {
      src: './assets/img/products/deal_img.webp',
      alt: 'A brown shampoo bottle with a brown label on it',
      width: 672,
      height: 600,
    },
  ],
  amount: 1,
  id: 99,
};

// Checks the input of the promo code input and renders different results depending on input
function checkCode() {
  if (codeInput.value === 'a_damn_fine-cup_of-coffee') {
    deal = 0;
    codeTextField.innerHTML = `
    <p>You got access to free items! Enjoy!</p>
    `;
    codeInput.value = '';
    // eslint-disable-next-line
    printCart();
  } else if (codeInput.value === 'JENNIPULLI') {
    cartArray.push(dealProduct);
    codeTextField.innerHTML = `
    <p>Enjoy your tomatoes!</p>
    `;
    codeInput.value = '';
    // eslint-disable-next-line
    printCart();
  }
}

// Event listener for the button to add the promo code
addCode.addEventListener('click', checkCode);

// Weekend increased price

function ifAddOn(dayOfWeek, currentHour) {
  // Helgpåslag av pris 15%
  if (
    (dayOfWeek === 5 && currentHour >= 15) ||
    dayOfWeek === 6 ||
    dayOfWeek === 0 ||
    (dayOfWeek === 1 && currentHour <= 3)
  ) {
    return 1.15;
  }
  return 1;
}

/**
 * --------------------------------------------------
 *              Render cart item
 * --------------------------------------------------
 */

function renderCartItem(
  product,
  index,
  newProductPrice,
  productSum,
  tenProcentAmount,
  // eslint-disable-next-line
  tenProcentSpec
) {
  const productHTML = `
  <article class="product_in_cart" id="cartItem_${[index]}">
    <div class="cart_pic_container">
      <figure>
        <img
          src="${product.images[0].src}"
          alt="${product.images[0].alt}"
          height="${product.images[0].height}"
          width="${product.images[0].width}"
        />
      </figure>
    </div>
    <div class="cart_amount_container">
    <div class="cart_name_price">
    <h2>${product.name}</h2>
    <p class="product_unit_price">
      $${newProductPrice}
    </p>
    </div>
      <div class="adjust_btn_container">
        <button
          class="decrease_cart_btn cart_adjust_btn product_btn"
          data-id="${product.id}">-</button>
        <span class="product_amount">${product.amount}</span>
        <button
          class="increase_cart_btn cart_adjust_btn product_btn"
          data-id="${product.id}">+</button>
      </div>
    </div>
    <div class="cart_total_container">
      <div class="center_total_amounts">
        ${tenProcentSpec} ${tenProcentAmount}
        <p>Total: $${Math.round(productSum)}</p>
      </div>
    </div>
    <button class="delete_product" id="delete-${product.id}">
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </article>
`;

  return { productHTML };
}

/**
 * --------------------------------------------------
 *               Render cart
 * --------------------------------------------------
 */

function updateCartIcon(totalAmount) {
  // För att uppdatera numret på varukorgen
  if (totalAmount > 0) {
    cartAmount.classList.remove('hidden');
    clearCart.classList.remove('hidden');
    cartAmount.innerHTML = '';
    cartAmount.innerHTML = `
   ${totalAmount}
  `;
  }
}

function removeInvoiceOption(billedAmount) {
  let onlyCardMessage = '';
  // Ta bort faktura som alternativ om $800 överksrids
  if (billedAmount > 800) {
    onlyCardMessage =
      '<p class="discount_display_text">Amounts over $800 can only be payed with card.</p>';
    invoiceRadio.classList.add('hidden');
  } else {
    invoiceRadio.classList.remove('hidden');
  }
  return onlyCardMessage;
}

// En funktion för att printa varukorgen
function printCart() {
  let totalSum = 0;
  let fullSum = 0;
  let totalAmount = 0;
  let billedAmount = 0;
  let mondayOffer = '';
  let mondayAmount = '';
  let mondayMessage = '';
  let shippingMessage = '';
  let tenProcentMessage = '';
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();
  const priceChange = ifAddOn(dayOfWeek, currentHour);

  cartProducts.innerHTML = '';

  cartArray.forEach((product, index) => {
    let tenProcentAmount = '';
    let tenProcentSpec = '';
    let adjustedProductPrice = Math.round(product.price * priceChange);
    const newProductPrice = Math.round(product.price * priceChange);

    if (product.amount >= 10) {
      const priceDiffer = Math.round(
        // eslint-disable-next-line
        adjustedProductPrice * product.amount * 0.1
      );
      adjustedProductPrice *= 0.9;

      tenProcentMessage =
        '<p class="discount_display_text">10% off if you buy ten items or more of the same product!</p>';
      tenProcentAmount = `<p class="ten_off_text">- $${priceDiffer}</p>`;
      tenProcentSpec = '<p class="ten_off_text">10 gives 10%</p>';
    }

    totalSum += Math.round(product.amount * adjustedProductPrice);
    fullSum += Math.round(product.amount * adjustedProductPrice);
    const productSum = Math.round(product.amount * adjustedProductPrice);
    totalAmount += product.amount;

    const cartItemRender = renderCartItem(
      product,
      index,
      newProductPrice,
      productSum,
      tenProcentAmount,
      // eslint-disable-next-line
      tenProcentSpec
    );

    cartProducts.innerHTML += cartItemRender.productHTML;
  });

  // Räkna ut frakt
  let shippingSumTotal = 0;
  if (totalAmount > 15) {
    shippingSumTotal = 0;
    shippingMessage =
      '<p class="discount_display_text">More than 15 items gives you free shipping!</p>';
  } else {
    shippingSumTotal = `${Math.round(10 + 0.1 * totalSum)}`;
  }

  // Måndagsrabatt på 10% innan kl 10
  if (dayOfWeek === 1 && currentHour < 10) {
    totalSum *= 0.9;
    if (Math.round(fullSum) - Math.round(totalSum) > 0) {
      mondayAmount += `<p class="discount_text">- $${
        Math.round(fullSum) - Math.round(totalSum)
      }</p>`;
      mondayOffer += `<p class="discount_display_text">
        Monday morning shopping gives you an extra 10% off!
        </p>`;
      mondayMessage += `
      <p class="discount_text">Monday offer</p>`;
    }
  }

  // Totalsumman med frakt
  billedAmount = Number(shippingSumTotal) + totalSum;

  const onlyCardMessage = removeInvoiceOption(billedAmount);

  // För att skriva ut totalen
  checkoutTotal.innerHTML = '';
  checkoutTotal.innerHTML = `
    ${mondayOffer} ${tenProcentMessage} ${shippingMessage} ${onlyCardMessage}
    <div class="checkout_total">
      <p>Subtotal:</p>
      <p id="totalSum">$${Math.round(fullSum)}</p>
      <p>Shipping:</p>
      <p id="shippingSum">$${shippingSumTotal}</p>
      ${mondayMessage} ${mondayAmount}
      <p class="total_text">Total:</p>
      <p id="billedAmount" class="total_text">
      $${Math.round(billedAmount * deal)}</p>
    </div>
  `;

  updateCartIcon(totalAmount);

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
    <p>$${Math.round(billedAmount * deal)}</p>
  `;
}

// Knapparna för att öka och minska antalet
function decreaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = products.find((p) => p.id === index);
  if (product.amount <= 0) {
    product.amount = 0;
  } else {
    product.amount -= 1;
  }
  console.log(index);
  // eslint-disable-next-line
  printProducts(currentFilter);
}

function increaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = products.find((p) => p.id === index);
  product.amount += 1;
  console.log(index);
  // eslint-disable-next-line
  printProducts(currentFilter);
}

// Animering för att lägga till vara i varukorgen
function hideAddPopUp() {
  addPopUp.classList.add('hidden');
}
function showAddPopUp() {
  addPopUp.classList.remove('hidden');
}
// eslint-disable-next-line
const addAnimation = gsap.timeline();

function addProductPopUp() {
  addAnimation
    .call(showAddPopUp)
    .from(addPopUp, { opacity: 0 })
    .to(addPopUp, { opacity: 1, duration: 0.7 }, '<')
    .from(addPopUp, { y: 140, duration: 0.6, ease: 'power2.out' }, '<')
    .to(addPopUp, { opacity: 0, duration: 0.5 }, '>1')
    .call(hideAddPopUp);
}

// Lägger till required på kortfälten alternativt personnummer beroende på radioinput

function changeRequiredFields() {
  if (cardRadioButton.checked) {
    socialNr.required = false;
    cardCVCInput.required = true;
    cardExpireInput.required = true;
    cardNumberInput.required = true;
  } else if (invoiceRadioButton.checked) {
    socialNr.required = true;
    cardCVCInput.required = false;
    cardExpireInput.required = false;
    cardNumberInput.required = false;
  }
}

cardInvoiceRadios.forEach((radioBtn) => {
  radioBtn.addEventListener('change', changeRequiredFields);
});

// Funktion för att lägga till produkter i kundvagnen
function addToCart(e) {
  const index = Number(e.currentTarget.dataset.id);
  console.log(e.currentTarget.dataset.id);
  formSection.classList.remove('hidden');
  changeRequiredFields();

  // Välja ut rätt produkt
  const productToAdd = products.find((p) => p.id === index);
  console.log(productToAdd);

  const cartProduct = {
    id: productToAdd.id,
    name: productToAdd.name,
    description: productToAdd.description,
    price: productToAdd.price,
    images: [...productToAdd.images],
    rating: productToAdd.rating,
    category: productToAdd.category,
    amount: productToAdd.amount,
  };

  // Kolla om produkten finns i varukorgen
  const existingProduct = cartArray.find(
    // eslint-disable-next-line
    (product) => product.id === cartProduct.id
  );

  if (productToAdd.amount >= 10) {
    // Ta bort rabatt-text när man klickar
    const offerText = document.getElementById(`offer-${index}`);
    console.log(offerText);
    offerText.classList.add('hidden');
  }
  // Om den finns adderas amounten istället för att lägga till ny produkt
  if (existingProduct) {
    existingProduct.amount += cartProduct.amount;
    // Annars läggs den till som ny produkt
  } else {
    cartArray.push(JSON.parse(JSON.stringify(cartProduct)));
  }

  if (productToAdd.amount > 0) {
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

    addProductPopUp();
  }

  printCart();
  // Nollställa antalet i product-arrayen
  productToAdd.amount = 0;

  // Nollställa antalet i HTML-strukturen
  const totalBtn = document.getElementById(`total-${index}`);
  const amountNumber = document.getElementById(`amount-${index}`);

  if (amountNumber) {
    amountNumber.textContent = productToAdd.amount;
  }

  if (totalBtn) {
    totalBtn.textContent = 'Buy $0';
  }
  console.log(cartArray);
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
function printProducts(filter) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();
  const priceChange = ifAddOn(dayOfWeek, currentHour);
  productContainer.innerHTML = '';

  let filteredProducts;
  switch (filter) {
    case 'ten':
      filteredProducts = products.filter((product) => product.price <= 10);
      break;
    case 'eleventothirty':
      filteredProducts = products.filter(
        // eslint-disable-next-line
        (product) => product.price > 10 && product.price <= 30
      );
      break;
    case 'abovethirty':
      filteredProducts = products.filter((product) => product.price > 30);
      break;
    case 'all':
    default:
      filteredProducts = products;
      break;
  }

  filteredProducts.forEach((product) => {
    let tenProcentSpec = '';
    let adjustedProductPrice = Math.round(product.price * priceChange);

    if (product.amount >= 10) {
      tenProcentSpec = `<p class="ten_off_text offer_text" id="offer-${product.id}">10 gives 10%!</p>`;
      adjustedProductPrice *= 0.9;
    }

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
          />`
        : '';
    // Lägger till knappar om det finns fler bilder
    const imageBtns =
      product.images.length >= 2
        ? ` <button
              class="change_image"
              id="firstImageBtn-${product.id}">
              <span
                class="material-symbols-outlined image_icon hidden"
                aria-label="First image"
                id="firstIcon-${product.id}">
                crop_16_9
              </span>
              <span
                class="material-symbols-outlined image_icon filled_icon"
                aria-label="Image showing"
                id="secondIcon-${product.id}">
                crop_16_9
              </span>
            </button>
            <button class="change_image" id="secondImageBtn-${product.id}">
              <span
                class="material-symbols-outlined image_icon"
                aria-label="Second image"
                id="thirdIcon-${product.id}">
                crop_16_9
              </span>
              <span
                class="material-symbols-outlined image_icon filled_icon hidden"
                aria-label="Image showing"
                id="fourthIcon-${product.id}">
                crop_16_9
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
          />`
        : '';
    // Lägger till en till knapp om det finns tre bilder
    const imageBtnsThird =
      product.images.length === 3
        ? `<button
            class="change_image"
            id="thirdImageBtn-${product.id}">
            <span
              class="material-symbols-outlined image_icon"
              aria-label="Third image"
              id="fifthIcon-${product.id}">
              crop_16_9
            </span>
            <span
              class="material-symbols-outlined image_icon filled_icon hidden"
              aria-label="Image showing"
              id="sixthIcon-${product.id}">
              crop_16_9
            </span>
          </button>`
        : '';

    productContainer.innerHTML += `
      <article class="product_card" id="product_card__${product.id}">
        <figure class="product_img_container">
          <img
            src="${product.images[0].src}"
            alt="${product.images[0].alt}"
            height="${product.images[0].height}"
            width="${product.images[0].width}"
            class="product_img"
            id="firstImage-${product.id}"
          />
          ${secondImage} ${thirdImage}
          <div class="button_container">${imageBtns} ${imageBtnsThird}</div>
        </figure>
        <div class="product_info">
          <div>
            <h2>${product.name}</h2>
            <p class="product_description">${product.description}</p>
            <p>$${Math.round(product.price * priceChange)}</p>
            <p>Rating: ${product.rating}/5</p>
          </div>
          <div>
            <div class="offer_spacer">${tenProcentSpec}</div>
            <div class="adjust_amount_container">
              <button class="decrease_btn product_btn" data-id="${product.id}">
                -
              </button>
              <p class="amount_number" id="amount-${product.id}">
                ${product.amount}
              </p>
              <button class="increase_btn product_btn" data-id="${product.id}">
                +
              </button>
            </div>
            <button
              class="total_btn product_btn"
              id="total-${product.id}"
              data-id="${product.id}"
            >
              Buy $${Math.round(adjustedProductPrice * product.amount)}
            </button>
          </div>
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

printProducts(currentFilter);

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
  printProducts(currentFilter);
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
  printProducts(currentFilter);
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

// Filtrering
function filterPrice(e) {
  const selectedRange = e.target.value;
  currentFilter = selectedRange;
  printProducts(currentFilter);
}

document.querySelectorAll('input[name="priceRange"]').forEach((radioButton) => {
  radioButton.addEventListener('change', filterPrice);
});

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
      const newErrorElement = document.createElement('span');
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
function hideErrorPopUp() {
  wrongInputPopUp.classList.add('hidden');
}
function showErrorPopUp() {
  wrongInputPopUp.classList.remove('hidden');
}
// eslint-disable-next-line
const wrongInputAnimation = gsap.timeline();

function wrongInput() {
  wrongInputAnimation
    .call(showErrorPopUp)
    .from(wrongInputPopUp, { opacity: 0 })
    .to(wrongInputPopUp, { opacity: 1, duration: 0.7 }, '<')
    .from(wrongInputPopUp, { y: 140, duration: 0.6, ease: 'power2.out' }, '<')
    .to(wrongInputPopUp, { opacity: 0, duration: 0.5 }, '>3')
    .call(hideErrorPopUp);
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
checkoutBtn.addEventListener('click', finalCheckout);
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
