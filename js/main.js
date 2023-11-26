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
 *      [] Olika radiobuttons kan filtrera på olika spann av pris
 *
 *      // varukorgen
 *      [] Uppdateras /VISUELLT/ när man klickar på beställningsknapparna
 *      [] ! OPTIONAL ! Har en dropdownmeny när man hovrar över som visar valda produkter i nuläget
 *      [X] Stänger produktsidan och öppnar varukorgssidan vid klick
 *      [X] Stänger alltid menyn också om man klickar på varukorgen
 *
 *      // varukorgssidan
 *      [] Visar alla valda produkter i en loop
 *      [] Man kan ändra antal med knappar samt ta bort alla produkter av en sort med en knapp
 *      [] Man kan också rensa alla produkter med en knapp
 *      [X] Det finns ett fält för rabattkoder
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
const productPage = document.querySelector('#productPage');
const cartPage = document.querySelector('#cartPage');
const backToProducts = document.querySelector('#backToProducts');

const themeToggle = document.querySelector('#toggleTheme');
const lightMode = document.querySelector('#lightModeIcon');
const darkMode = document.querySelector('#darkModeIcon');

const phraseImgBlack = document.querySelector('#phraseImageBlack');
const phraseImgWhite = document.querySelector('#phraseImageWhite');

const productContainer = document.querySelector('#productContainer');

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

const promoContainer = document.querySelector('#promoCodeContainer');
const codeBtn = document.querySelector('#codeBtn');

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

// En objekt-array med alla produkter
const products = [
  {
    name: 'Dear Rose',
    description:
      'Indulge your senses in the intoxicating allure of our bestselling rose-scented soap, where every lather unveils a symphony of delicate floral notes that transport you to a blooming garden of unparalleled elegance and timeless sophistication.',
    price: 6,
    images: [
      {
        src: './assets/img/products/soap_pink_1.webp',
        alt: 'Two bars of pink soap',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/soap_pink_2.webp',
        alt: 'Three bars of pink soap',
        width: 600,
        height: 848,
      },
      {
        src: './assets/img/products/soap_pink_3.webp',
        alt: 'Three bars of pink soap',
        width: 600,
        height: 900,
      },
    ],
    rating: 5,
    category: 'soap',
    amount: 0,
    id: 0,
  },
  {
    name: 'Latte Love',
    description:
      'Elevate your shower experience with the invigorating aroma of our coffee-scented soap, as each lather releases the rich and robust fragrance of freshly ground beans, awakening your senses to a delightful symphony of warmth and revitalization.',
    price: 5,
    images: [
      {
        src: './assets/img/products/soap_coffee_1.webp',
        alt: 'A bar of brown soap with coffee beans on',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/soap_coffee_2.webp',
        alt: 'Two bars of brown soap with coffee beans on',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/soap_coffee_3.webp',
        alt: 'Two bars of brown soap with coffee beans on',
        width: 600,
        height: 900,
      },
    ],
    rating: 4.5,
    category: 'soap',
    amount: 0,
    id: 1,
  },
  {
    name: 'Cloudy Mood',
    description:
      'Purify and rejuvenate your skin with our charcoal-infused soap, expertly crafted to draw out impurities and toxins, leaving your complexion refreshed and invigorated as the activated charcoal works its magic to provide a deep, cleansing experience.',
    price: 5,
    images: [
      {
        src: './assets/img/products/soap_black_1.webp',
        alt: 'Two bars of black and white soap',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/soap_black_2.webp',
        alt: 'Four bars of black and white soap',
        width: 600,
        height: 900,
      },
    ],
    rating: 4,
    category: 'soap',
    amount: 0,
    id: 2,
  },
  {
    name: 'Honey Cream',
    description:
      'Nourish your skin with the golden elixir of our honey-based cream, a luscious blend that not only envelopes you in a sweet, luxurious fragrance but also deeply moisturizes and revitalizes, leaving your skin with a radiant, dew-kissed glow.',
    price: 23,
    images: [
      {
        src: './assets/img/products/cream_honey_1.webp',
        alt: 'A jar of cream with the color of honey',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/cream_honey_2.webp',
        alt: 'A jar of cream with the color of honey on a linen fabric',
        width: 600,
        height: 900,
      },
    ],
    rating: 4,
    category: 'skincare',
    amount: 0,
    id: 3,
  },
  {
    name: 'Just Breezy',
    description:
      'Transform your space into a tranquil haven with the refreshing essence of our breezy-scented candle, where delicate notes of sea breeze and crisp air dance harmoniously, creating an atmosphere that evokes the serene tranquility of a coastal retreat.',
    price: 27,
    images: [
      {
        src: './assets/img/products/candle_1.webp',
        alt: 'A candle in a brown glass jar in a beige staged set up',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/candle_2.webp',
        alt: 'A candle in a brown glass jar on a beige linen fabric with a wooden plate behind',
        width: 600,
        height: 900,
      },
    ],
    rating: 4.5,
    category: 'candle',
    amount: 0,
    id: 4,
  },
  {
    name: 'Unpuff',
    description:
      'Elevate your skincare routine with our rejuvenating eye serum, a luxurious elixir meticulously crafted to diminish fine lines and fatigue, as it delicately revitalizes the delicate skin around your eyes, leaving them bright, refreshed, and beautifully awakened.',
    price: 24,
    images: [
      {
        src: './assets/img/products/serum_eye_1.webp',
        alt: 'Three pipette bottles with white unnamed labels',
        width: 600,
        height: 799,
      },
      {
        src: './assets/img/products/serum_eye_2.webp',
        alt: 'A pipette bottle with white unnamed label on staged with two glass jars with wooden lids',
        width: 600,
        height: 798,
      },
      {
        src: './assets/img/products/serum_lip_eye.webp',
        alt: 'Two pipette bottles an a glass jar with a wooden lid on a rustic beige plate',
        width: 600,
        height: 799,
      },
    ],
    rating: 5,
    category: 'skincare',
    amount: 0,
    id: 5,
  },
  {
    name: 'Dreamy Linen',
    description:
      'Indulge in the epitome of luxury and comfort with our expensive linen bedsheets, meticulously woven from the finest threads to caress your skin with a sumptuously smooth texture, elevating your sleep experience to a level of opulence that transcends the ordinary.',
    price: 89,
    images: [
      {
        src: './assets/img/products/bed_linen_1.webp',
        alt: 'A brown wooden bed with white linen bed sheets',
        width: 783,
        height: 600,
      },
      {
        src: './assets/img/products/bed_linen_2.webp',
        alt: 'A brown wooden bed with white linen bed sheets',
        width: 600,
        height: 901,
      },
    ],
    rating: 4.5,
    category: 'linen',
    amount: 0,
    id: 6,
  },
  {
    name: 'New Faces',
    description:
      'Immerse your skin in the transformative luxury of our face serum, a sublime elixir infused with potent antioxidants and nourishing extracts that glide effortlessly, working in harmony to reveal a radiant complexion, as fine lines fade away, leaving your skin embraced in a velvety softness and youthful luminosity.',
    price: 26,
    images: [
      {
        src: './assets/img/products/serum_brown_1.webp',
        alt: 'A brown pipette bottle staged on a green leaf and mirror',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/serum_brown_2.webp',
        alt: 'A brown pipette bottle staged next to two green leafs',
        width: 600,
        height: 900,
      },
      {
        src: './assets/img/products/serum_brown_3.webp',
        alt: 'A brown pipette bottle staged with towels, green leafs and wooden plates',
        width: 900,
        height: 600,
      },
    ],
    rating: 4,
    category: 'skincare',
    amount: 0,
    id: 7,
  },
  {
    name: 'Sweet Kiss',
    description:
      'Revitalize your lips with our exquisite lip serum, a velvety elixir enriched with hydrating botanicals and plumping peptides, delicately enhancing your pout with a burst of moisture and a subtle, natural fullness, for irresistibly soft and beautifully defined lips.',
    price: 28,
    images: [
      {
        src: './assets/img/products/serum_lip_1.webp',
        alt: 'An open glass pipette bottle with a red liquid inside standing on a glass jar with a wooden lid',
        width: 600,
        height: 799,
      },
      {
        src: './assets/img/products/serum_lip_eye.webp',
        alt: 'Two pipette bottles an a glass jar with a wooden lid on a rustic beige plate',
        width: 600,
        height: 799,
      },
    ],
    rating: 5,
    category: 'skincare',
    amount: 0,
    id: 8,
  },
  {
    name: 'Perfectly Musky',
    description:
      'Immerse yourself in the captivating allure of our musk-scented liquid soap, a velvety lather that envelops your senses with a rich, warm embrace, leaving your skin delicately perfumed with the timeless and seductive essence of musk.',
    price: 27,
    images: [
      {
        src: './assets/img/products/bottle_fluid_soap_1.webp',
        alt: 'A brown soap pump staged with wood and beige set up',
        width: 900,
        height: 600,
      },
      {
        src: './assets/img/products/bottle_fluid_soap_hand_oil_serum.webp',
        alt: 'A brown soap pump with other brown glass jars staged with wood and beige set up',
        width: 600,
        height: 900,
      },
    ],
    rating: 4,
    category: 'soap',
    amount: 0,
    id: 9,
  },
];

// En array för alla produkter som hamnar i varukorgen
const cartArray = [];

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
        Buy $${Math.round(product.price * priceChange * product.amount)}
        </button>
    </div>
</article>
    `;
  });

  // Funktioner för att minska och öka antal produkter
  const decreaseBtn = document.querySelectorAll('.decrease_btn');
  const increaseBtn = document.querySelectorAll('.increase_btn');

  function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if (products[index].amount <= 0) {
      products[index].amount = 0;
    } else {
      products[index].amount -= 1;
    }
    printProducts();
  }

  function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    products[index].amount += 1;
    printProducts();
  }

  // Öka och minska antal med knapparna
  decreaseBtn.forEach((btn) => {
    btn.addEventListener('click', decreaseAmount);
  });

  increaseBtn.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });

  /**
   * -------------------------
   *  Lägga till i kundvagn
   * -------------------------
   */

  const buyItem = document.querySelectorAll('.total_btn');

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
  }

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

// Öppna beställningsformuläret

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
