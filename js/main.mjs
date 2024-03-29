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
// Toggles the menu with an animation when it opens and makes
// sure the button has the right aria-label
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

// Function for the links in the menu to get you back to the product page and close menu
function startPageLinks() {
  toggleMenu();
  if (productPage.classList.contains('hidden')) {
    productPage.classList.remove('hidden');
    cartPage.classList.add('hidden');
  }
}

// Add event listeners for all links in the menu
menuLinks.forEach((item) => {
  item.addEventListener('click', startPageLinks);
});

// Open up the cart page when clicking the cart icon in the header
function openCart() {
  cartPage.classList.remove('hidden');
  productPage.classList.add('hidden');

  // Close the menu if the user clicks the icon when the menu is open
  if (nav.classList.contains('open')) {
    toggleMenu();
  }
  // Scrolls the page to the top when entering the cart page
  if (productPage.classList.contains('hidden')) {
    window.scrollTo(0, 0);
  }
}

shoppingCart.addEventListener('click', openCart);

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
  orderForm.reset();
  cartIsEmpty();
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

// Toggles the promo code field to display or not with an animation added to it
function openCodeField() {
  // eslint-disable-next-line
  gsap.fromTo(promoContainer, { opacity: 0 }, { opacity: 1, duration: 0.7 });
  promoContainer.classList.toggle('hidden');
}
codeBtn.addEventListener('click', openCodeField);

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
    (dayOfWeek === 1 && currentHour < 3)
  ) {
    return 1.15;
  }
  return 1;
}

/**
 * --------------------------------------------------
 *                Render cart item
 * --------------------------------------------------
 */

// Rendering HTML for each item added to the cart array returning the code with productHTML
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
 *                    Cart
 * --------------------------------------------------
 */

// Button to go back to the product page
function shopMore() {
  cartPage.classList.add('hidden');
  productPage.classList.remove('hidden');
}
backToProducts.addEventListener('click', shopMore);

// Function to update the total amount of items on the cart icon
// when amounts on the item is in-/decreased
function updateCartIcon(totalAmount) {
  if (totalAmount > 0) {
    cartAmount.classList.remove('hidden');
    clearCart.classList.remove('hidden');
    cartAmount.innerHTML = '';
    cartAmount.innerHTML = `
   ${totalAmount}
  `;
  }
}

// Toggles the option to pay via invoice if the total amount exceeds $800 and returns a message
// letting the user know this
function removeInvoiceOption(billedAmount) {
  let onlyCardMessage = '';
  if (billedAmount > 800) {
    onlyCardMessage =
      '<p class="discount_display_text">Amounts over $800 can only be payed with card.</p>';
    invoiceRadio.classList.add('hidden');
  } else {
    invoiceRadio.classList.remove('hidden');
  }
  return onlyCardMessage;
}

// Renders the HTML for all ordered products in the order summary displaying amount, price and name
function renderSummaryProducts(item, adjustPriceArray) {
  let itemHTML = '';
  item.forEach((product, index) => {
    const productSum = Math.round(product.amount * adjustPriceArray[index]);
    itemHTML += `
      <div class="product_summary_field">
        <p class="done_amount">${product.amount}x</p>
        <p>${product.name}</p>
        <p>$${productSum}</p>
      </div>
    `;
  });

  fullOrderContainer.innerHTML = itemHTML;
}

// The main function to print the cart of products containing adjustments for price and HTML renders
// for the cart page
// ---- NOTE: If I would do this project all over, this would be structured differently and avoid
// ---- having such a long function.
function printCart() {
  let totalSum = 0;
  let fullSum = 0;
  let totalAmount = 0;
  let billedAmount = 0;
  const adjustPriceArray = [];
  let mondayOffer = '';
  let mondayAmount = '';
  let mondayMessage = '';
  let shippingMessage = '';
  let tenProcentMessage = '';
  // To update the date when the user is active on the page and not when the page loads
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();
  // Calls to a function that raises the price on weekends
  const priceChange = ifAddOn(dayOfWeek, currentHour);

  // Clear the HTML
  cartProducts.innerHTML = '';

  // A loop to render all products pushed to the cart array
  cartArray.forEach((product, index) => {
    let tenProcentAmount = '';
    let tenProcentSpec = '';
    const adjustedProductPrice = Math.round(product.price * priceChange);
    // Pushes the items added into an array to be able to get it when displaying the order summary
    adjustPriceArray.push(adjustedProductPrice);
    const newProductPrice = Math.round(product.price * priceChange);

    // 10% of that item is taken of if the amount of the item exceeds 10
    if (product.amount >= 10) {
      // Calculates the difference to display it in numbers for the user
      const priceDiffer = Math.round(
        // eslint-disable-next-line
        adjustedProductPrice * product.amount * 0.1
      );
      adjustPriceArray[index] *= 0.9;

      tenProcentMessage =
        '<p class="discount_display_text">10% off if you buy ten items or more of the same product!</p>';
      tenProcentAmount = `<p class="ten_off_text">- $${priceDiffer}</p>`;
      tenProcentSpec = '<p class="ten_off_text">10 gives 10%</p>';
    }

    const productSum = Math.round(product.amount * adjustPriceArray[index]);
    totalSum += productSum; // The total that will be adjusted by discounts
    fullSum += productSum; // The total without any discounts
    totalAmount += product.amount;

    // Call and recieve the return from the function to then render the HTML
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

  // Calculate shipping that is free if the user orders more than 15 products and otherwise
  // $10 + 10% of the total amount
  let shippingSumTotal = 0;
  if (totalAmount > 15) {
    shippingSumTotal = 0;
    shippingMessage =
      '<p class="discount_display_text">More than 15 items gives you free shipping!</p>';
  } else {
    shippingSumTotal = `${Math.round(10 + 0.1 * totalSum)}`;
  }

  // Monday morning discount on the total price showing the amount removed from the total and
  // the new total amount by totalSum
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

  // The total amount with shipping and discount
  billedAmount = Number(shippingSumTotal) + totalSum;

  // Returns a message if the total amount gets over $800 and the invoice payment option
  // gets disabled
  const onlyCardMessage = removeInvoiceOption(billedAmount);

  // Renders HTML for the calculations of price and messages about discounts and offers recieved
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
        $${Math.round(billedAmount * deal)}
      </p>
    </div>
  `;

  // Updates the amount on the cart icon in the header
  updateCartIcon(totalAmount);

  // Creates event listeners for all delete buttons rendered for each product in the cart array
  Array.from(document.querySelectorAll('.delete_product')).forEach((btn) => {
    btn.addEventListener('click', deleteSingleProduct);
  });

  // Creates event listeners for all decrease buttons rendered for each product in the cart array
  Array.from(document.querySelectorAll('.decrease_cart_btn')).forEach((btn) => {
    btn.addEventListener('click', decreaseCartAmount);
  });

  // Creates event listeners for all increase buttons rendered for each product in the cart array
  Array.from(document.querySelectorAll('.increase_cart_btn')).forEach((btn) => {
    btn.addEventListener('click', increaseCartAmount);
  });

  // Call to render the products in the order summary
  renderSummaryProducts(cartArray, adjustPriceArray);

  // Renders HTML to print on the order summary
  fullOrderSummary.innerHTML = '';
  fullOrderSummary.innerHTML = `
    <p class="done_total">Total:</p>
    <p>$${Math.round(billedAmount * deal)}</p>
  `;
}

/**
 * --------------------------------------------------
 *           Adjust items in product list
 * --------------------------------------------------
 */

// To decrease the amount of the item in the array of products, making it not go below 0 and then
// render the product list
function decreaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = products.find((p) => p.id === index);
  if (product.amount <= 0) {
    product.amount = 0;
  } else {
    product.amount -= 1;
  }
  // eslint-disable-next-line
  printProducts(currentFilter);
}

// To increase the amount of the item in the array of products and then render the product list
function increaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const product = products.find((p) => p.id === index);
  product.amount += 1;
  // eslint-disable-next-line
  printProducts(currentFilter);
}

// Creates an animation with a pop up when the item is added to the cart to inform the user
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

// Function to push item into the cart array making sure if the item is already there, then adding
// to the amount. Otherwise making a new deep copy of the product. Also shows the form when adding
// a product to the cart array
function addToCart(e) {
  const index = Number(e.currentTarget.dataset.id);
  // Finding the product clicked on
  const productToAdd = products.find((p) => p.id === index);
  // Removes the actions to run if the amount is 0 on the item
  if (productToAdd.amount > 0) {
    formSection.classList.remove('hidden');
    // eslint-disable-next-line
    changeRequiredFields();

    // Defining what information to be copied to the cart array
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

    // Checks if the item already excists in the cart array
    const existingProduct = cartArray.find(
      // eslint-disable-next-line
      (product) => product.id === cartProduct.id
    );

    // Removes the text about the 10% offer when the amount of items is over 10
    if (productToAdd.amount >= 10) {
      const offerText = document.getElementById(`offer-${index}`);
      offerText.classList.add('hidden');
    }

    // If the product exists in the cart array, the amount is getting added to the product in cart
    if (existingProduct) {
      existingProduct.amount += cartProduct.amount;

      // If the product is not in the array already, it gets a deep copy of the product
    } else {
      cartArray.push(JSON.parse(JSON.stringify(cartProduct)));
    }

    // Adds an animation to the amount displayed on the cart icon in the header
    // eslint-disable-next-line
    gsap.to('#amountCounter', {
      scale: 1.3,
      yoyo: true,
      repeat: 1,
      ease: 'power3.out',
      duration: 0.4,
    });

    // Starts the timer for 15 min when an item is added to the cart
    if (!timerRunning) {
      startTimer(1000 * 60 * 15);
    }

    // Calls for the pop up to inform the user that an item(s) has been added to the cart
    addProductPopUp();

    // Renders the cart page with the products in the cart array
    printCart();

    // Resets the numbers on the item in the product array
    productToAdd.amount = 0;

    // Resets the amounts displayed on the button and between
    const totalBtn = document.getElementById(`total-${index}`);
    const amountNumber = document.getElementById(`amount-${index}`);

    if (amountNumber) {
      amountNumber.textContent = productToAdd.amount;
    }
    if (totalBtn) {
      totalBtn.textContent = 'Buy $0';
    }
  }
}

/**
 * --------------------------------------------------
 *           Images in the product list
 * --------------------------------------------------
 */

// Change images on the product page, toggling different icons
// ---- NOTE: This is not an optimized sollution but rather a feature I really wanted to add and
// ---- used this method just to make it work in a short amount of time during deadline pressure
// ---- and would find a better sollution if redoing this project again.
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
        break;
      case 'secondImage':
        firstImage.classList.add('hidden');
        secondImage.classList.remove('hidden');
        firstIcon.classList.remove('hidden');
        secondIcon.classList.add('hidden');
        thirdIcon.classList.add('hidden');
        fourthIcon.classList.remove('hidden');
        break;
      default:
        break;
    }
  }
}

// Adding event listeners to the buttons to change image
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

/**
 * --------------------------------------------------
 *                  Product list
 * --------------------------------------------------
 */

// Renders the HTML for the product item in the list also adding images if more than
// one and a third if more than two, returning HTML-structure to the print function
function renderProductItem(
  product,
  priceChange,
  tenProcentSpec,
  // eslint-disable-next-line
  adjustedProductPrice
) {
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

  const productHTML = `
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

  return { productHTML };
}

// Rendering function that receives the HTML structure from renderProductItem and also includes
// filter options for the products
function printProducts(filter) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentHour = today.getHours();
  const priceChange = ifAddOn(dayOfWeek, currentHour);
  productContainer.innerHTML = '';

  // Filter products depending on price range
  let filteredProducts;
  switch (filter) {
    case 'ten':
      filteredProducts = products.filter(
        // eslint-disable-next-line
        (product) => Math.round(product.price * priceChange) <= 10
      );
      break;
    case 'eleventothirty':
      filteredProducts = products.filter(
        (product) =>
          // eslint-disable-next-line
          Math.round(product.price * priceChange) > 10 &&
          // eslint-disable-next-line
          Math.round(product.price * priceChange) <= 30
      );
      break;
    case 'abovethirty':
      filteredProducts = products.filter(
        // eslint-disable-next-line
        (product) => Math.round(product.price * priceChange) > 30
      );
      break;
    case 'all':
    default:
      filteredProducts = products;
      break;
  }

  // Calculates and displays a message if the amount on a single product exceeds 10 to give 10% off
  filteredProducts.forEach((product) => {
    let tenProcentSpec = '';
    let adjustedProductPrice = Math.round(product.price * priceChange);

    if (product.amount >= 10) {
      tenProcentSpec = `<p class="ten_off_text offer_text" id="offer-${product.id}">10 gives 10%!</p>`;
      adjustedProductPrice *= 0.9;
    }

    const productItemRender = renderProductItem(
      product,
      priceChange,
      tenProcentSpec,
      // eslint-disable-next-line
      adjustedProductPrice
    );

    productContainer.innerHTML += productItemRender.productHTML;
  });

  // Loop to add eventlisteners to all products for the image-buttons
  products.forEach((product) => {
    addEventListeners(product);
  });

  // Variables for the buttons to change the amount on the product in the product list
  const decreaseBtn = document.querySelectorAll('.decrease_btn');
  const increaseBtn = document.querySelectorAll('.increase_btn');

  // Adding event listeners to the buttons to change amount in the product list
  decreaseBtn.forEach((btn) => {
    btn.addEventListener('click', decreaseAmount);
  });

  increaseBtn.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });

  // Button to add item to cart
  const buyItem = document.querySelectorAll('.total_btn');

  buyItem.forEach((btn) => {
    btn.addEventListener('click', addToCart);
  });
}

printProducts(currentFilter);

/**
 * --------------------------------------------------
 *          Sort and filter the product list
 * --------------------------------------------------
 */

// Displays the filter and sorting field with animation added to it
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

// Generic sorting function to sort products from A to Z / 1 to 9 and then render the new order
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

// Generic sorting function to sort products from Z to A / 9 to 1 and then render the new order
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

// Different functions to sort with the different properties
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

// Event listeners for the different sorting options to trigger the sorting
sortNameAZ.addEventListener('click', sortProductsByName);
sortNameZA.addEventListener('click', sortProductsByNameReversed);
sortPrice19.addEventListener('click', sortProductsByPrice);
sortPrice91.addEventListener('click', sortProductsByPriceReversed);
sortCategoryAZ.addEventListener('click', sortProductsByCategory);
sortCategoryZA.addEventListener('click', sortProductsByCategoryReversed);
sortRating19.addEventListener('click', sortProductsByRating);
sortRating91.addEventListener('click', sortProductsByRatingReversed);

// Function to trigger the filter options by recieving the value of the clicked radio button
// and then render the new filtered list
function filterPrice(e) {
  const selectedRange = e.target.value;
  currentFilter = selectedRange;
  printProducts(currentFilter);
}

// Event listener on each of the radiobuttons to receive the value on the selected button
document.querySelectorAll('input[name="priceRange"]').forEach((radioButton) => {
  radioButton.addEventListener('change', filterPrice);
});

/**
 * --------------------------------------------------
 *               Form and validation
 * --------------------------------------------------
 */

// ---- NOTE : This part is not made in a perfect way and has some code repetition I
// wish I had found better ways to solve.

// Adds on required as an attribute to the payment inputs depending on the choice from the user
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

// Gives the radio buttons for payment choice their event listeners for adding required
cardInvoiceRadios.forEach((radioBtn) => {
  radioBtn.addEventListener('change', changeRequiredFields);
});

// Toggles which inputs are on display depending on users choice
function changePaymentMethod() {
  invoiceOption.classList.toggle('hidden');
  cardOption.classList.toggle('hidden');
}

// Gives the radio buttons for payment choice their event listeners for displaying the right input
cardInvoiceRadios.forEach((radioBtn) => {
  radioBtn.addEventListener('change', changePaymentMethod);
});

// Functions to run the RegEx on each input to return a boolean
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

// Function that checks if there is already an error message by the input, if not,
// adding one if the RegEx returns false
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

// Runs all the RegEx and displays error messages when returning value is false and
// changing the submit buttons styling depending on RegEx runs false or true
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

// Event listeners for all inputs to run the check if valid or not
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

// Adds and removes the class hidden from the error pop up if inputs are invalid from RegEx
function hideErrorPopUp() {
  wrongInputPopUp.classList.add('hidden');
}

function showErrorPopUp() {
  wrongInputPopUp.classList.remove('hidden');
}

// Animation for the error message pop up that displays if inputs passes required in
// HTML but not RegEx validations
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

// Shows all errormessages if there is any and adds a class to all inputs
// styling them with a red border
function displayErrorMessage() {
  const errorMessages = document.querySelectorAll('.input_error_message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.classList.remove('hidden');
  });
  const allErrorInputs = document.querySelectorAll('.input_error_field');
  allErrorInputs.forEach((errorInput) => {
    errorInput.classList.add('error_field');
  });
}

// Event listener for inputs to display error stylings when HTML required is not valid
policyAgreeCheckbox.addEventListener('invalid', displayErrorMessage);
socialNr.addEventListener('invalid', displayErrorMessage);
emailForm.addEventListener('invalid', displayErrorMessage);
phoneNumber.addEventListener('invalid', displayErrorMessage);
postalArea.addEventListener('invalid', displayErrorMessage);
postalCode.addEventListener('invalid', displayErrorMessage);
streetName.addEventListener('invalid', displayErrorMessage);
lName.addEventListener('invalid', displayErrorMessage);
fName.addEventListener('invalid', displayErrorMessage);

// Final check up for submit button before sending form
function finalCheckout(e) {
  // Prevents default submit action to be sure that HTML requirements and RegEx is both true
  e.preventDefault();
  displayErrorMessage();
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
      orderDone.classList.remove('hidden');
      // eslint-disable-next-line
      gsap.fromTo(orderDone, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      window.scrollTo(0, 0);
    } else {
      wrongInput();
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
      orderDone.classList.remove('hidden');
      // eslint-disable-next-line
      gsap.fromTo(orderDone, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      window.scrollTo(0, 0);
    } else {
      wrongInput();
    }
  }
}

// Event listener for the submit function/button for the form
orderForm.addEventListener('submit', finalCheckout);

// Triggers a pop up to make sure that the user wants to clear the form and cart
clearCartAndField.addEventListener('click', triggerPopUp);

// When the pop up with the order confirmation comes up this then resets the page and cart to make
// sure no inputs or toggles gets disturbed
function backToStart() {
  orderDone.classList.add('hidden');
  emptyCart();
  orderForm.reset();
  stopTimer();
  window.location.reload();
}

startOver.addEventListener('click', backToStart);
