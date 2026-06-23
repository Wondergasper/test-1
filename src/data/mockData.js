export const PRODUCT_CATALOG = [
  { id: 'rice', name: 'Local Rice', category: 'Grains', price: '₦480', priceValue: 480, location: 'Ogun State', inSeason: true, image: '/product_rice.png', description: 'Grown organically in the fertile soils of Ogun State. Rich in fiber and essential nutrients, this premium local parboiled rice is stone-free and perfect for traditional dishes like Jollof or fried rice.' },
  { id: 'tomatoes', name: 'Fresh Tomatoes', category: 'Vegetables', price: '₦320', priceValue: 320, location: 'Kaduna State', inSeason: false, image: '/product_tomatoes.png', description: 'Fresh, juicy, and sun-ripened tomatoes sourced directly from Kaduna farms. Handpicked at peak ripeness, they offer a rich, sweet-tart flavor profile ideal for stews, sauces, and salads.' },
  { id: 'catfish', name: 'Catfish', category: 'Protein', price: '₦1,200', priceValue: 1200, location: 'Kogi State', inSeason: false, image: '/product_catfish.png', description: 'Freshly harvested pond catfish from Kogi. Rich in lean protein and omega-3 fatty acids. Perfect for making traditional pepper soup, grilling, or smoking.' },
  { id: 'yam', name: 'Yam', category: 'Tubers', price: '₦280', priceValue: 280, location: 'Benue State', inSeason: true, image: '/product_yam.png', description: 'Premium quality new season sweet yams harvested from Benue. High starch content, dry texture, and naturally sweet taste. Excellent for boiling, frying, or pounding.' },
  { id: 'corn', name: 'Sweet Corn', category: 'Fruits', price: '₦180', priceValue: 180, location: 'Benue State', inSeason: true, image: '/product_corn.png', description: 'Freshly plucked sweet corn. Super tender, juicy, and naturally sweet. Excellent for boiling, roasting, or adding to salads and stews.' },
  { id: 'beans', name: 'Honey Beans', category: 'Grains', price: '₦550', priceValue: 550, location: 'Oyo State', inSeason: true, image: '/product_beans.png', description: 'Premium sweet honey beans (Oloyin) sourced from Oyo. Clean, quick-cooking, and naturally sweet. Ideal for making moin-moin, akara, or plain bean stews.' },
  { id: 'peppers', name: 'Habanero Peppers', category: 'Vegetables', price: '₦450', priceValue: 450, location: 'Plateau State', inSeason: true, image: '/product_peppers.png', description: 'Extremely spicy and aromatic red habanero peppers (Atarodo) harvested from the highlands of Jos, Plateau State. Lends an authentic, hot kick to any soup or stew.' },
  { id: 'palmoil', name: 'Palm Oil', category: 'Oil', price: '₦900', priceValue: 900, location: 'Edo State', inSeason: true, image: '/product_palmoil.png', description: 'Pure, unadulterated red palm oil processed traditionally in Edo State. Low acidity, rich red color, and excellent taste. Ideal for native stews, soups, and traditional cooking.' },
];

export const CATEGORY_FILTERS = ['All', 'Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits', 'Oil'];
export const ORDER_FILTERS = ['All Orders', 'Processing', 'In Transit', 'Delivered'];

export const ORDERS = [
  {
    id: '#FC-2024-0892',
    date: 'Nov 12',
    status: 'Delivered',
    badge: 'bg-secondary-container text-primary',
    total: 4200,
    itemsSummary: '5kg Local Rice + 3kg Tomatoes',
    items: [
      { name: 'Local Rice', qty: 5, price: 480, sub: 2400 },
      { name: 'Fresh Tomatoes', qty: 3, price: 320, sub: 960 },
      { name: 'Delivery', qty: 1, price: 840, sub: 840 },
    ],
  },
  {
    id: '#FC-2024-0901',
    date: 'Nov 18',
    status: 'In Transit',
    badge: 'bg-secondary/10 text-secondary font-medium',
    total: 8500,
    itemsSummary: '10kg Yam + 2kg Catfish',
    items: [
      { name: 'Yam', qty: 10, price: 280, sub: 2800 },
      { name: 'Catfish', qty: 2, price: 1200, sub: 2400 },
      { name: 'Delivery', qty: 1, price: 3300, sub: 3300 },
    ],
  },
  {
    id: '#FC-2024-0915',
    date: 'Nov 22',
    status: 'Processing',
    badge: 'bg-surface text-on-surface-variant',
    total: 9600,
    itemsSummary: '20kg Local Rice',
    items: [
      { name: 'Local Rice', qty: 20, price: 480, sub: 9600 },
    ],
  },
];

export const INITIAL_PRODUCTS = [
  { id: 'prod-1', name: 'Local Rice', category: 'Grains', priceValue: 480, stock: 240, status: 'Active', img: '/product_rice.png', origin: 'Ogun' },
  { id: 'prod-2', name: 'Catfish', category: 'Protein', priceValue: 1200, stock: 48, status: 'Low Stock', img: '/product_catfish.png', origin: 'Kogi' },
  { id: 'prod-3', name: 'Fresh Tomatoes', category: 'Vegetables', priceValue: 320, stock: 0, status: 'Out of Stock', img: '/product_tomatoes.png', origin: 'Kaduna' },
];

export const INITIAL_ORDERS = [
  {
    id: '#FC-0892',
    customer: 'Amara Adebayo',
    items: '5kg Rice + 3kg Tomatoes',
    totalValue: 4200,
    status: 'Delivered',
    date: 'Nov 12',
    deliveryHub: 'Lekki drop-off',
    lineItems: [
      { name: 'Local Rice', qty: 5, price: 480, sub: 2400 },
      { name: 'Fresh Tomatoes', qty: 3, price: 320, sub: 960 },
      { name: 'Delivery', qty: 1, price: 840, sub: 840 },
    ],
  },
  {
    id: '#FC-0901',
    customer: 'Chinedu Okeke',
    items: '10kg Yam + 2kg Catfish',
    totalValue: 8500,
    status: 'In Transit',
    date: 'Nov 18',
    deliveryHub: 'Lagos distribution hub',
    lineItems: [
      { name: 'Yam', qty: 10, price: 280, sub: 2800 },
      { name: 'Catfish', qty: 2, price: 1200, sub: 2400 },
      { name: 'Delivery', qty: 1, price: 3300, sub: 3300 },
    ],
  },
];

export const INITIAL_PAYMENTS = [
  { id: 'PMT-204', orderId: '#FC-0915', customer: 'Kemi Lawal', amountValue: 9600, method: 'Bank Transfer', status: 'Pending settlement', reference: 'TRX-2281', paidAt: 'Nov 22, 8:42 AM', reviewed: false, notes: 'Transfer received, reconciliation still pending.' },
  { id: 'PMT-198', orderId: '#FC-0901', customer: 'Chinedu Okeke', amountValue: 8500, method: 'Card', status: 'Paid', reference: 'TRX-2244', paidAt: 'Nov 18, 7:14 AM', reviewed: true, notes: 'Payment verified and matched to dispatch batch.' },
];
