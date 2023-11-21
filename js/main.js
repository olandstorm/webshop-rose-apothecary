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
 *      [] Fyll i all info om objekten i arrayen
 *      [X] Gör en loop som visar produkterna i HTML-strukturen
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

const productContainer = document.querySelector('#productContainer');

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
        alt: '',
      },
      {
        src: './assets/img/products/soap_pink_2.webp',
        alt: '',
      },
      {
        src: './assets/img/products/soap_pink_3.webp',
        alt: '',
      },
    ],
    rating: 5,
    category: 'soap',
  },
  {
    name: 'Latte Love',
    description:
      'Elevate your shower experience with the invigorating aroma of our coffee-scented soap, as each lather releases the rich and robust fragrance of freshly ground beans, awakening your senses to a delightful symphony of warmth and revitalization.',
    price: 5,
    images: [
      {
        src: './assets/img/products/soap_cacao_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/soap_cacao_2.webp',
        alt: '',
      },
      {
        src: './assets/img/products/soap_cacao_3.webp',
        alt: '',
      },
    ],
    rating: 4.5,
    category: 'soap',
  },
  {
    name: 'Cloudy Mood',
    description:
      'Purify and rejuvenate your skin with our charcoal-infused soap, expertly crafted to draw out impurities and toxins, leaving your complexion refreshed and invigorated as the activated charcoal works its magic to provide a deep, cleansing experience.',
    price: 5,
    images: [
      {
        src: './assets/img/products/soap_black_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/soap_black_2.webp',
        alt: '',
      },
    ],
    rating: 4,
    category: 'soap',
  },
  {
    name: 'Honey Cream',
    description:
      'Nourish your skin with the golden elixir of our honey-based cream, a luscious blend that not only envelopes you in a sweet, luxurious fragrance but also deeply moisturizes and revitalizes, leaving your skin with a radiant, dew-kissed glow.',
    price: 23,
    images: [
      {
        src: './assets/img/products/cream_honey_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/cream_honey_2.webp',
        alt: '',
      },
    ],
    rating: 4,
    category: 'skincare',
  },
  {
    name: 'Just Breezy',
    description:
      'Transform your space into a tranquil haven with the refreshing essence of our breezy-scented candle, where delicate notes of sea breeze and crisp air dance harmoniously, creating an atmosphere that evokes the serene tranquility of a coastal retreat.',
    price: 27,
    images: [
      {
        src: './assets/img/products/candle_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/candle_2.webp',
        alt: '',
      },
    ],
    rating: 4.5,
    category: 'candle',
  },
  {
    name: 'Unpuff',
    description:
      'Elevate your skincare routine with our rejuvenating eye serum, a luxurious elixir meticulously crafted to diminish fine lines and fatigue, as it delicately revitalizes the delicate skin around your eyes, leaving them bright, refreshed, and beautifully awakened.',
    price: 24,
    images: [
      {
        src: './assets/img/products/serum_eye_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/serum_eye_2.webp',
        alt: '',
      },
      {
        src: './assets/img/products/serum_lip_eye.webp',
        alt: '',
      },
    ],
    rating: 5,
    category: 'skincare',
  },
  {
    name: 'Dreamy Linen',
    description:
      'Indulge in the epitome of luxury and comfort with our expensive linen bedsheets, meticulously woven from the finest threads to caress your skin with a sumptuously smooth texture, elevating your sleep experience to a level of opulence that transcends the ordinary.',
    price: 89,
    images: [
      {
        src: './assets/img/products/bed_linen_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/bed_linen_2.webp',
        alt: '',
      },
    ],
    rating: 4.5,
    category: 'linen',
  },
  {
    name: 'New Faces',
    description:
      'Immerse your skin in the transformative luxury of our face serum, a sublime elixir infused with potent antioxidants and nourishing extracts that glide effortlessly, working in harmony to reveal a radiant complexion, as fine lines fade away, leaving your skin embraced in a velvety softness and youthful luminosity.',
    price: 26,
    images: [
      {
        src: './assets/img/products/serum_brown_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/serum_brown_2.webp',
        alt: '',
      },
      {
        src: './assets/img/products/serum_brown_3.webp',
        alt: '',
      },
    ],
    rating: 4,
    category: 'skincare',
  },
  {
    name: 'Sweet Kiss',
    description:
      'Revitalize your lips with our exquisite lip serum, a velvety elixir enriched with hydrating botanicals and plumping peptides, delicately enhancing your pout with a burst of moisture and a subtle, natural fullness, for irresistibly soft and beautifully defined lips.',
    price: 28,
    images: [
      {
        src: './assets/img/products/serum_lip_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/serum_lip_eye.webp',
        alt: '',
      },
    ],
    rating: 5,
    category: 'skincare',
  },
  {
    name: 'Perfectly Musky',
    description:
      'Immerse yourself in the captivating allure of our musk-scented liquid soap, a velvety lather that envelops your senses with a rich, warm embrace, leaving your skin delicately perfumed with the timeless and seductive essence of musk.',
    price: 27,
    images: [
      {
        src: './assets/img/products/bottle_fluid_soap_1.webp',
        alt: '',
      },
      {
        src: './assets/img/products/bottle_fluid_soap_hand_oil_serum.webp',
        alt: '',
      },
    ],
    rating: 4,
    category: 'soap',
  },
];

// en funktion för att printa produkterna
function printProducts() {
  productContainer.innerHTML = '';

  products.forEach((product, index) => {
    productContainer.innerHTML += `
    <article class="product_card" id="product_card__${[index]}">
    <figure class="product_img_container">
      <img src="${product.images[0].src}" alt="${product.images[0].alt}" 
      height="600" width="783"
      class="product_img">
    </figure>
    <div class="product_info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: ${product.price} $</p>
        <p>Rating: ${product.rating}/5</p>
        <button class="decrease_btn">-</button><button class="increase_btn">+</button><input
            type="number">
        <button class="total_btn">Buy 65$</button>
    </div>
</article>
    `;
  });
}

printProducts();
