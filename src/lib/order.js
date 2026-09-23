import { business } from "../config.js";

export const naira = (n) => "₦" + n.toLocaleString("en-NG");

export const priceRange = (product) => {
  const prices = product.variants ? product.variants.map((v) => v.price) : [product.price];
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  return low === high ? naira(low) : `${naira(low)} – ${naira(high)}`;
};

/** "Two tier · Flavour: Vanilla · Finish: Fondant" */
export const describe = (line) =>
  [line.variant, ...line.options.map((o) => `${o.key}: ${o.value}`)]
    .filter(Boolean)
    .join(" · ");

export const subtotalOf = (cart) =>
  cart.reduce((sum, line) => sum + line.price * line.qty, 0);

const longDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function buildInvoice({ cart, customer, zone }) {
  const reference = "EM" + Date.now().toString().slice(-5);
  const subtotal = subtotalOf(cart);
  const fixedFee = typeof zone.fee === "number";
  const total = subtotal + (fixedFee ? zone.fee : 0);
  const pickup = zone.fee === 0;

  const items = cart
    .map((line) => {
      const spec = describe(line);
      return (
        `• ${line.name}${spec ? ` (${spec})` : ""}\n` +
        `   ${line.qty} ${line.unit}${line.qty > 1 ? "s" : ""} × ${naira(line.price)} = ${naira(
          line.price * line.qty
        )}`
      );
    })
    .join("\n");

  const text = [
    `*ORDER ${reference}*`,
    `${business.name}`,
    "",
    `*Name:* ${customer.name}`,
    `*Phone:* ${customer.phone}`,
    `*${pickup ? "Collection" : "Delivery"}:* ${zone.name}`,
    pickup ? null : `*Address:* ${customer.address}`,
    `*Needed:* ${longDate(customer.date)}${customer.time ? `, ${customer.time}` : ""}`,
    "",
    "*ITEMS*",
    items,
    "",
    `Subtotal: ${naira(subtotal)}`,
    `Delivery: ${fixedFee ? (zone.fee ? naira(zone.fee) : "Free, collection") : "to be confirmed"}`,
    `*Total: ${naira(total)}${fixedFee ? "" : "+"}*`,
    customer.notes ? `\n*Notes:* ${customer.notes}` : null,
    "",
    `Placed on the ${business.name} website.`,
  ]
    .filter((row) => row !== null)
    .join("\n");

  return { reference, total, text };
}

export const chatLink = (text) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
