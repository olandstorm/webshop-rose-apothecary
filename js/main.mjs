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
 *      [] Måndagar innan kl 10 är det 10% rabatt på totalen och en text visas och förklarar detta
 *      [X] Vid beställning >10 st av samma produkt tillkommer rabatt på 10% på den varan
 *      [X] Vid beställning av mer än 15 produkter är frakten gratis, annars 25kr + 10% av totalen
 *              ^Ändrat denna till $10 istället för 25kr^
 *      [] Användaren har bara 15 min från att varukorgssidan öppnas att slutföra beställningen
 *      [] Användaren meddelas om detta överskrids och allt rensas/nollställs
 *
 *      // formuläret
 *      [X] Man kan välja betalsätt vilket öppnar två olika formulär
 *      [] Har man beställt för mer än 800 kr kan man inte välja faktura
 *      [] Alla fält, förutom kort-fälten, valideras
 *      [] Felen som finns markeras tydligt
 *      [] Knappen skicka är inte möjlig att klicka förrän alla fält är validerade
 *
 *
 *      [] Se över alla klasser (knapparna tex)
 *      [X] Lägga till ruta om försäkran om att man vill tömma varukorg
 *      [] Lägga in fler bilder på varje produkt
 *      [] Lägg till copytext
 *      [] Fixa en tom varukorg
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

const sureToDelete = document.querySelector('#sureToDelete');
const backToCart = document.querySelector('#backToCart');
const deleteContainer = document.querySelector('#popUpDelete');

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

// En array för alla produkter som hamnar i varukorgen
let cartArray = [];

// Funktion för att öppna och stänga navigationsmenyn, även med länkarna
function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open');
  bodyTag.classList.toggle('fixed_background');
  shoppingCart.classList.toggle('shopping_black');
  cartAmount.classList.toggle('amount_color');
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
// Ändra färgtema
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

// Ta bort enskild produkt i listan
function deleteSingleProduct(e) {
  const productId = Number(e.currentTarget.id.replace('delete-', ''));
  console.log(productId);
  const index = cartArray.findIndex((product) => product.id === productId);
  if (index > -1) {
    cartArray.splice(index, 1);
  }
  const lastItemDelete = cartArray.length;
  if (lastItemDelete === 0) {
    clearCart.classList.add('visually_hidden');
    cartAmount.classList.add('visually_hidden');
  }
  // eslint-disable-next-line
  printCart();
}

// Pop-up för att tömma kundvagnen
function closePopUp() {
  deleteContainer.classList.add('visually_hidden');
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
  const today = new Date();
  const isFriday = today.getDay() === 6;
  const isMonday = today.getDay() === 1;
  const currentHour = today.getHours();

  cartProducts.innerHTML = '';

  if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
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
            <button class="decrease_cart_btn cart_adjust_btn" data-id="${index}">-</button><span
                class="product_amount">${product.amount}</span><button
                class="increase_cart_btn cart_adjust_btn" data-id="${index}">+</button>
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

  // räkna ut frakt
  let shippingSumTotal = 0;
  if (totalAmount > 15) {
    shippingSumTotal = 0;
  } else {
    shippingSumTotal = `${Math.round(10 + 0.1 * totalSum)}`;
  }
  billedAmount = Number(shippingSumTotal) + totalSum;

  // För att skriva ut totalen
  checkoutTotal.innerHTML = '';
  checkoutTotal.innerHTML = `
  <p>Subtotal:</p>
  <p id="totalSum">$${Math.round(totalSum)}</p>
  <p>Shipping:</p>
  <p id="shippingSum">$${shippingSumTotal}</p>
  <p>Total inc VAT:</p>
  <p id="billedAmount">$${Math.round(billedAmount)}</p>
  `;

  // För att uppdatera numret på varukorgen
  if (totalAmount > 0) {
    cartAmount.classList.remove('visually_hidden');
    clearCart.classList.remove('visually_hidden');
    cartAmount.innerHTML = '';
    cartAmount.innerHTML = `
   ${totalAmount}
  `;
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
}

// Tömma varukorgen med knappen
function emptyCart() {
  cartArray = [];
  clearCart.classList.add('visually_hidden');
  cartAmount.classList.add('visually_hidden');
  deleteContainer.classList.add('visually_hidden');
  printCart();
  console.log(cartArray);
}
// Pop-up-fönster för att dubbelkolla att användaren vill ta bort alla varor
function triggerPopUp() {
  deleteContainer.classList.remove('visually_hidden');
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
  printCart();
}
// En funktion för att printa produkterna
function printProducts() {
  let priceChange = 1;
  const today = new Date();
  const isFriday = today.getDay() === 6;
  const isMonday = today.getDay() === 1;
  const currentHour = today.getHours();

  productContainer.innerHTML = '';

  if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
    priceChange = 1.15;
  }

  products.forEach((product, index) => {
    let productPrice = product.price;
    if (product.amount >= 10) {
      productPrice *= 0.9;
    }
    const adjustedProductPrice = productPrice * priceChange;

    productContainer.innerHTML += `
    <article class="product_card" id="product_card__${[index]}">
    <figure class="product_img_container">
      <img src="${product.images[0].src}" alt="${product.images[0].alt}" 
      height="${product.images[0].height}" width="${product.images[0].width}"
      class="product_img">
    </figure>
    <div class="product_info">
        <h2>${product.name}</h2>
        <p class="product_description">${product.description}</p>
        <p>Price: $${Math.round(product.price * priceChange)}</p>
        <p>Rating: ${product.rating}/5</p>
        <div class="adjust_amount_container">
        <button class="decrease_btn" data-id="${index}">-</button>
        <p class="amount_number" id="amount-${index}">${product.amount}</p>
        <button class="increase_btn" data-id="${index}">+</button>
        </div>
        <button class="total_btn" id="total-${index}">
        Buy $${Math.round(adjustedProductPrice * product.amount)}
        </button>
    </div>
</article>
    `;
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
  filterField.classList.toggle('visually_hidden');
}

filterBtn.addEventListener('click', toggleFilter);

// Sortera på pris

function sortListPrice19() {
  products.sort((product1, product2) => product1.price - product2.price);
  printProducts();
}

function sortListPrice91() {
  products.sort((product1, product2) => product2.price - product1.price);
  printProducts();
}

sortPrice19.addEventListener('click', sortListPrice19);
sortPrice91.addEventListener('click', sortListPrice91);

// Sortera på rating

function sortListRating19() {
  products.sort((product1, product2) => product1.rating - product2.rating);
  printProducts();
}

function sortListRating91() {
  products.sort((product1, product2) => product2.rating - product1.rating);
  printProducts();
}

sortRating19.addEventListener('click', sortListRating19);
sortRating91.addEventListener('click', sortListRating91);

// Sortera på namn

function sortListNameAZ() {
  products.sort((product1, product2) => {
    if (product1.name < product2.name) {
      return -1;
    }
    if (product1.name > product2.name) {
      return 1;
    }
    return 0;
  });
  printProducts();
}

function sortListNameZA() {
  products.sort((product1, product2) => {
    if (product1.name > product2.name) {
      return -1;
    }
    if (product1.name < product2.name) {
      return 1;
    }
    return 0;
  });

  printProducts();
}

sortNameAZ.addEventListener('click', sortListNameAZ);
sortNameZA.addEventListener('click', sortListNameZA);

// Sortera på kategori

function sortListCategoryAZ() {
  products.sort((product1, product2) => {
    if (product1.category < product2.category) {
      return -1;
    }
    if (product1.category > product2.category) {
      return 1;
    }
    return 0;
  });
  printProducts();
}

function sortListCategoryZA() {
  products.sort((product1, product2) => {
    if (product1.category > product2.category) {
      return -1;
    }
    if (product1.category < product2.category) {
      return 1;
    }
    return 0;
  });
  printProducts();
}

sortCategoryAZ.addEventListener('click', sortListCategoryAZ);
sortCategoryZA.addEventListener('click', sortListCategoryZA);

// Öppna kundkorgen

function openCart() {
  cartPage.classList.remove('visually_hidden');
  productPage.classList.add('visually_hidden');

  if (nav.classList.contains('open')) {
    toggleMenu();
  }
  if (productPage.classList.contains('visually_hidden')) {
    setTimeout((document.body.scrollTop = 0), 0);
    setTimeout((document.documentElement.scrollTop = 0), 0);
  }
}

shoppingCart.addEventListener('click', openCart);

// Gå tillbaka till produktsidan

function shopMore() {
  cartPage.classList.add('visually_hidden');
  productPage.classList.remove('visually_hidden');
}

backToProducts.addEventListener('click', shopMore);

// Toggle rabattkodsfältet
function openCodeField() {
  promoContainer.classList.toggle('visually_hidden');
}

codeBtn.addEventListener('click', openCodeField);

// Välja faktura eller kort
function changePaymentMethod() {
  invoiceOption.classList.toggle('visually_hidden');
  cardOption.classList.toggle('visually_hidden');
}
cardInvoiceRadios.forEach((radioBtn) => {
  radioBtn.addEventListener('change', changePaymentMethod);
});

// Rensa formulär och varukorg
clearCartAndField.addEventListener('click', emptyCart);
