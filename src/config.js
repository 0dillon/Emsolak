/* ------------------------------------------------------------------
   Business details, menu and prices. Edit this file only.
   ------------------------------------------------------------------ */

export const business = {
  name: "Emsolak",
  // Country code first, no "+" and no spaces. 08031234567 -> 2348031234567
  whatsapp: "2348141249093",
  instagram: "https://instagram.com/emsolak",
  email: "orders@emsolak.com",
  hours: "Monday to Saturday, 8am – 7pm",
  serves: "Lagos and Ogun State",
};

/* Shown under the headline. Keep these true — change or delete any that are not. */
export const facts = [
  ["Two states", "Lagos and Ogun, delivered"],
  ["24 hours", "Turnaround on bulk pastry"],
  ["Bulk or single", "One cake or fifty trays"],
];

export const zones = [
  { name: "Pickup at our kitchen", fee: 0 },
  { name: "Lagos — Mainland", fee: null },
  { name: "Lagos — Island, Lekki, Ajah", fee: null },
  { name: "Ogun State", fee: null },
];

export const categories = [
  "Pastries",
  "Frozen",
  "Cakes",
  "Bread",
  "Small Chops",
  "Kitchen",
];

/* price OR variants[{name, price}]
   moq  — minimum order quantity
   step — increment the quantity buttons move in                     */
export const products = [
  {
    id: "meat-pie",
    art: "Pie",
    name: "Meat Pie",
    category: "Pastries",
    note: "Baked to order",
    desc: "Short pastry, seasoned minced beef and potato. Sent out hot in lined trays.",
    price: 1000,
    unit: "piece",
    moq: 10,
    step: 5,
  },
  {
    id: "chicken-pie",
    art: "Pie",
    name: "Chicken Pie",
    category: "Pastries",
    note: "Baked to order",
    desc: "Flaky layered pastry with a shredded chicken and vegetable filling.",
    price: 1000,
    unit: "piece",
    moq: 10,
    step: 5,
  },
  {
    id: "sausage-roll",
    photo: "/photos/sausage-rolls.webp",
    alt: "A tray of freshly baked sausage rolls",
    art: "SausageRoll",
    name: "Sausage Roll",
    category: "Pastries",
    note: "Baked to order",
    desc: "Butter pastry wrapped around seasoned sausage. A steady seller for offices.",
    price: 1000,
    unit: "piece",
    moq: 10,
    step: 5,
  },
  {
    id: "donuts",
    art: "Donut",
    name: "Donuts",
    category: "Pastries",
    note: "Baked to order",
    desc: "Soft, slow-proofed and finished the morning they go out.",
    unit: "piece",
    moq: 10,
    step: 5,
    variants: [
      { name: "Sugar glazed", price: 1000 },
      { name: "Jam filled", price: 1000 },
      { name: "Chocolate", price: 1000 },
    ],
  },

  {
    id: "meat-pie-frozen",
    photo: "/photos/meat-pies-raw.webp",
    alt: "Unbaked meat pies, crimped by hand and ready for the freezer",
    art: "Pie",
    name: "Meat Pie",
    category: "Frozen",
    note: "Raw, frozen",
    desc: "Bake straight from the freezer in 25 minutes. Keeps three months.",
    price: 800,
    unit: "piece",
    moq: 20,
    step: 10,
  },
  {
    id: "chicken-pie-frozen",
    photo: "/photos/pies-tray-raw.webp",
    alt: "A full tray of unbaked pies glazed and ready to bake",
    art: "Pie",
    name: "Chicken Pie",
    category: "Frozen",
    note: "Raw, frozen",
    desc: "Built for shops and canteens that bake through the day.",
    price: 800,
    unit: "piece",
    moq: 20,
    step: 10,
  },
  {
    id: "sausage-roll-frozen",
    photo: "/photos/sausage-rolls-raw.webp",
    alt: "Rolled, unbaked sausage rolls lined up on a baking tray",
    art: "SausageRoll",
    name: "Sausage Roll",
    category: "Frozen",
    note: "Raw, frozen",
    desc: "Supplied in tens. Standing weekly deliveries available.",
    price: 800,
    unit: "piece",
    moq: 20,
    step: 10,
  },
  {
    id: "peppered-chicken",
    photo: "/photos/peppered-chicken.webp",
    alt: "Marinated chicken portioned and bagged for the freezer",
    art: "Drumstick",
    name: "Peppered Chicken",
    category: "Frozen",
    note: "Marinated, frozen",
    desc: "Cut, seasoned and part-cooked. Heat through and serve.",
    price: 10000,
    unit: "pack",
    moq: 1,
  },

  {
    id: "cake",
    photo: "/photos/cakes-anniversary.webp",
    alt: "Six iced celebration cakes finished with sugar roses",
    art: "Tiers",
    name: "Celebration Cake",
    category: "Cakes",
    note: "Three days notice",
    desc: "Birthdays, weddings and corporate. Send your reference photo in the chat once you have ordered.",
    unit: "cake",
    moq: 1,
    variants: [
      { name: '6 inch, single layer', price: 20000 },
      { name: '8 inch, single layer', price: 35000 },
      { name: '10 inch, single layer', price: 55000 },
      { name: "Two tier", price: 90000 },
      { name: "Three tier", price: 150000 },
      { name: "Wedding, premium finish", price: 200000 },
    ],
    options: [
      {
        key: "Flavour",
        choices: ["Vanilla", "Chocolate", "Red velvet", "Carrot", "Marble", "Fruit"],
      },
      { key: "Finish", choices: ["Buttercream", "Fondant", "Whipped cream"] },
    ],
    textField: "Message on the cake",
  },

  {
    id: "bread",
    photo: "/photos/bread.webp",
    alt: "Stacks of freshly baked loaves bagged for delivery",
    art: "Loaf",
    name: "Bread",
    category: "Bread",
    note: "Baked daily",
    desc: "Soft milk loaf, baked each morning and delivered the same day.",
    unit: "loaf",
    moq: 1,
    variants: [
      { name: "Small loaf", price: 1000 },
      { name: "Family loaf", price: 1500 },
      { name: "Jumbo loaf", price: 2000 },
    ],
  },

  {
    id: "small-chops",
    photo: "/photos/small-chops.webp",
    alt: "Foil trays of spring rolls, samosa, puff puff and peppered meat",
    art: "Cookie",
    name: "Small Chops",
    category: "Small Chops",
    note: "Sold by the pack",
    desc: "Puff puff, spring roll, samosa, gizzard and chicken, boxed per guest.",
    unit: "pack",
    moq: 5,
    variants: [
      { name: "Regular", price: 2000 },
      { name: "Standard", price: 2800 },
      { name: "Deluxe", price: 3500 },
    ],
  },

  {
    id: "soup",
    photo: "/photos/egusi.webp",
    alt: "A pot of egusi cooked with assorted meat",
    art: "Bowl",
    name: "Soup, by the bowl",
    category: "Kitchen",
    note: "Two days notice",
    desc: "Cooked the traditional way and sealed in a bowl for the freezer.",
    unit: "bowl",
    moq: 1,
    variants: [
      { name: "Egusi", price: 20000 },
      { name: "Ogbono", price: 20000 },
      { name: "Banga", price: 22000 },
      { name: "Afang", price: 25000 },
      { name: "Edikaikong", price: 25000 },
      { name: "Seafood okra", price: 30000 },
    ],
  },
  {
    id: "meal-tray",
    photo: "/photos/jollof-plates.webp",
    alt: "Plates of jollof and fried rice served with fish and beef",
    art: "Bowl",
    name: "Party Tray",
    category: "Kitchen",
    note: "Two days notice",
    desc: "Cooked to order for events. Each tray serves roughly fifteen people.",
    unit: "tray",
    moq: 1,
    variants: [
      { name: "Jollof rice", price: 20000 },
      { name: "Fried rice", price: 22000 },
      { name: "Rice with protein", price: 30000 },
      { name: "Asun, peppered meat", price: 35000 },
    ],
  },
];

export const notice = [
  ["Cakes", "Three days"],
  ["Bulk pastries", "Twenty four hours"],
  ["Small chops", "Twenty four hours"],
  ["Soups and trays", "Two days"],
];

export const faqs = [
  {
    q: "How much notice do you need?",
    a: "Cakes need three days, bulk pastries and small chops twenty four hours, soups and party trays two days. If your event is sooner than that, message us anyway and we will tell you honestly whether we can do it.",
  },
  {
    q: "Where do you deliver?",
    a: "Across Lagos and Ogun State. The fee depends on your area and is confirmed in the chat once we have your address. Collection from our kitchen is free.",
  },
  {
    q: "How do I pay?",
    a: "Bank transfer. We send account details after confirming your order. Cakes and large orders are secured with a fifty percent deposit, with the balance settled before delivery.",
  },
  {
    q: "How long do the frozen pastries keep?",
    a: "Three months in a working freezer. Bake them from frozen, there is no need to defrost first.",
  },
  {
    q: "Can I order a custom cake design?",
    a: "Yes. Place the order here, then send your reference photo in the same chat and we will quote for any extra detailing.",
  },
  {
    q: "Can I change or cancel an order?",
    a: "Up to twenty four hours before your delivery date. Deposits on custom cakes are not refunded once baking has started.",
  },
];
