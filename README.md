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

`moq` is the minimum order quantity. A product has either one `price` or a list of
`variants`. The +/− buttons move by one; set `step` on a product if it should be
ordered in larger multiples instead.

## Before going live

1. Set the real `whatsapp` number in `src/config.js` — country code first, no `+` and
   no spaces, so `08031234567` becomes `2348031234567`. Orders go nowhere until this
   is done.
2. Update `instagram`, `email` and `hours` in the same file.
3. Check every price, minimum and notice period.
4. Check the three `facts` under the headline are actually true.
5. Fill the gaps in the photography. Ten of the thirteen products and the whole
   gallery use real photographs. The three still drawing a silhouette are the baked
   pastries — meat pie, chicken pie and donuts — and they need photographs of the
   baked article, not the raw one. See "Photographs" below.

## Photographs

Photos live in `public/photos/` and are referenced from `src/config.js` as
`photo: "/photos/name.webp"` with an `alt` line describing the shot. A product
without a `photo` falls back to its drawn silhouette, so the menu never shows a
hole. The gallery's own list is at the top of `src/components/Gallery.jsx`; its large
tile spans two columns and two rows, so the grid only sits flush at 9 or 13 tiles.

Match the photograph to the card. The frozen products are labelled "Raw, frozen" and
use unbaked shots; the pastries are labelled "Baked to order" and need baked ones.

To add one: save it into `public/photos/`, keep the long edge around 1100px and
export as WebP at quality 80 — the whole set is about 880 kB, which matters on
mobile data. Then add the `photo` and `alt` lines to that product.

## Running it

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

Covers the order form's rules: phone normalisation, and the date checks that
refuse a day already past, a date that never existed such as 31 February, and
any day earlier than the notice the basket needs.

Notice periods are `leadDays` on each product in `src/config.js`. Change one
there and the date picker, the warning under the field, the notice table and
the FAQ all follow — but the table and the FAQ carry their own wording, so
check those read right too.

## Search, sharing and speed

`vite.config.js` generates everything a crawler or a link preview reads —
canonical tag, Open Graph and Twitter tags, `Bakery` and `FAQPage` structured
data, `robots.txt` and `sitemap.xml` — from `site`, `location` and `business`
in `src/config.js`. Change the address or the hours in one place and all of it
follows.

`npm run build` also prerenders the page into `dist/index.html`, so the file
contains the real text rather than an empty `<div>`. Without that step, link
previews and any crawler that does not run JavaScript see nothing, and the
page cannot paint until the bundle has parsed.

Fonts are self-hosted in `public/fonts`, so the first paint waits on no third
party. `public/share.jpg` is the 1200x630 card shown when the link is pasted
into WhatsApp; rebuild it if the branding changes.

## Building and hosting

```bash
npm run build
```

That writes `dist/`. Drag it onto [netlify.com/drop](https://app.netlify.com/drop) for
a free URL, then point a domain at it. `netlify.toml` sets the cache headers, so
connect the repository instead if you want Netlify to build on every push.

Whatever the final address is, put it in `site.url` in `src/config.js` and build
again — the canonical tag, the sitemap and the link previews all use it, and they
are wrong until it is right.

## Layout

```
src/
  config.js            prices, products, business details — edit this
  styles.css           design tokens; one flat colour per section
  lib/order.js         money formatting and the WhatsApp invoice
  components/          Header, Hero, Menu, ProductCard, Terms,
                       Gallery, Faq, Footer, OrderDrawer, Frame, Icons
```
