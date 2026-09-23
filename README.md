# Emsolak

Order site for Emsolak — a Lagos bakery and bulk caterer. Customers build an order on
the page; it opens WhatsApp with the invoice already written out. React, built to
static files. No backend, no payment processing.

## Editing the site

Everything the owner needs to change lives in **`src/config.js`**: the WhatsApp number,
products, prices, minimum quantities, delivery zones, notice periods and the FAQ.
Nothing else needs touching to run the business.

```js
{ id: "meat-pie", name: "Meat Pie", category: "Pastries",
  price: 1000, unit: "piece", moq: 10, step: 5, desc: "..." }
```

`moq` is the minimum order quantity and `step` is the increment the +/− buttons move
in. A product has either one `price` or a list of `variants`.

## Before going live

1. Set the real `whatsapp` number in `src/config.js` — country code first, no `+` and
   no spaces, so `08031234567` becomes `2348031234567`. Orders go nowhere until this
   is done.
2. Update `instagram`, `email` and `hours` in the same file.
3. Check every price, minimum and notice period.
4. Check the three `facts` under the headline are actually true.
5. Add real photographs. Drop them in `public/` and pass `src` to each `<Frame>` — the
   sand-coloured blocks name the shot each one is waiting for.

## Running it

```bash
npm install
npm run dev
```

## Building and hosting

```bash
npm run build
```

That writes `dist/`. Drag it onto [netlify.com/drop](https://app.netlify.com/drop) for
a free URL, then point a domain at it. Vercel and GitHub Pages work the same way.

## Layout

```
src/
  config.js            prices, products, business details — edit this
  styles.css           design tokens; one flat colour per section
  lib/order.js         money formatting and the WhatsApp invoice
  components/          Header, Hero, Menu, ProductCard, Terms,
                       Gallery, Faq, Footer, OrderDrawer, Frame, Icons
```
