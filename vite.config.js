import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site, business, locations, faqs, products } from "./src/config.js";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Everything a crawler, a search engine or a WhatsApp link preview reads,
 * generated from src/config.js so there is one source of truth for the
 * address, the hours and the URL rather than four copies drifting apart.
 */
function seo() {
  const canonical = site.url.replace(/\/$/, "");
  const shareImage = canonical + site.shareImage;

  const postal = (loc) => ({
    "@type": "PostalAddress",
    streetAddress: loc.streetAddress,
    addressLocality: loc.locality,
    addressRegion: loc.region,
    addressCountry: loc.country,
  });

  const geoOf = (loc) =>
    loc.latitude != null && loc.longitude != null
      ? { "@type": "GeoCoordinates", latitude: loc.latitude, longitude: loc.longitude }
      : undefined;

  const cheapest = Math.min(
    ...products.flatMap((p) => (p.variants ? p.variants.map((v) => v.price) : [p.price]))
  );

  const orgId = canonical + "/#org";

  /* One organisation with a branch per kitchen. Google wants each location
     as its own node with its own address; the menu and the contact details
     belong to the business above them rather than being repeated. */
  const org = {
    "@type": ["Organization", "FoodEstablishment"],
    "@id": orgId,
    name: business.name,
    url: canonical,
    image: shareImage,
    logo: canonical + "/icon-512.png",
    description: site.description,
    telephone: "+" + business.whatsapp,
    email: business.email,
    sameAs: [business.instagram].filter(Boolean),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Lagos State" },
      { "@type": "AdministrativeArea", name: "Ogun State" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Menu",
      itemListElement: products.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: p.name, description: p.desc },
        price: p.variants ? Math.min(...p.variants.map((v) => v.price)) : p.price,
        priceCurrency: "NGN",
      })),
    },
  };

  const branches = locations.map((loc) => {
    const geo = geoOf(loc);
    return {
      "@type": "Bakery",
      "@id": `${canonical}/#${loc.id}`,
      name: `${business.name} — ${loc.label}`,
      parentOrganization: { "@id": orgId },
      url: canonical,
      image: shareImage,
      telephone: "+" + business.whatsapp,
      email: business.email,
      address: postal(loc),
      ...(geo ? { geo } : {}),
      openingHours: business.openingHours,
      priceRange: `₦${cheapest.toLocaleString("en-NG")}+`,
      currenciesAccepted: "NGN",
      paymentAccepted: "Bank transfer",
    };
  });

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const main = locations[0];
  const regionCode = main.region.startsWith("Ogun") ? "NG-OG" : "NG-LA";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, ...branches, faqPage],
  };

  const head = `
    <link rel="canonical" href="${canonical}/" />
    <meta name="theme-color" content="#14512f" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="geo.region" content="${regionCode}" />
    <meta name="geo.placename" content="${esc(main.locality)}" />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(business.name)}" />
    <meta property="og:locale" content="${esc(site.locale)}" />
    <meta property="og:url" content="${canonical}/" />
    <meta property="og:title" content="${esc(site.title)}" />
    <meta property="og:description" content="${esc(site.description)}" />
    <meta property="og:image" content="${shareImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Emsolak — cakes, pastry and party food, Lagos" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(site.title)}" />
    <meta name="twitter:description" content="${esc(site.description)}" />
    <meta name="twitter:image" content="${shareImage}" />

    <script type="application/ld+json">${JSON.stringify(graph)}</script>`;

  /* The SSR pass runs the same plugin, and has no use for these files. */
  let isSsr = false;

  return {
    name: "emsolak-seo",

    configResolved(config) {
      isSsr = Boolean(config.build?.ssr);
    },

    transformIndexHtml(html) {
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(site.title)}</title>`)
        .replace(
          /<meta\s+name="description"[\s\S]*?\/>/,
          `<meta name="description" content="${esc(site.description)}" />`
        )
        .replace("</head>", `${head}\n  </head>`);
    },

    generateBundle() {
      if (isSsr) return;

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${canonical}/sitemap.xml\n`,
      });

      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${canonical}/</loc>\n    <lastmod>${today}</lastmod>\n` +
          `    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
  server: { port: 4321 },
});
