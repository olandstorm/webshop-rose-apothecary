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

export default products;
