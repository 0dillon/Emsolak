import { products } from "../config.js";

/* ------------------------------------------------------------------
   Order form validation.

   Kept out of the component so the rules can be read in one place and
   exercised directly. Every check returns the field to focus and a
   sentence to show under it — a red border on its own tells somebody
   that they are wrong without telling them why.
   ------------------------------------------------------------------ */

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isoDate = (d) => {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export const longDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

/**
 * Parse YYYY-MM-DD strictly. `new Date("2027-02-31")` quietly rolls forward
 * to 3 March, so a date that never existed would be accepted as a different
 * one. Round-tripping the parts catches that.
 */
export function parseStrictDate(iso) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!parts) return null;
  const year = Number(parts[1]);
  const month = Number(parts[2]);
  const day = Number(parts[3]);
  const date = new Date(year, month - 1, day);
  const survived =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  return survived ? date : null;
}

/** The item in the basket that needs the most notice. */
export function longestLead(cart) {
  let days = 0;
  let name = null;
  for (const line of cart) {
    const product = products.find((p) => p.id === line.id);
    const lead = product?.leadDays ?? 0;
    if (lead > days) {
      days = lead;
      name = product.name;
    }
  }
  return { days, name };
}

/** Earliest date this basket can be collected or delivered. */
export function earliestDate(cart) {
  const d = startOfToday();
  d.setDate(d.getDate() + longestLead(cart).days);
  return isoDate(d);
}

/**
 * Nigerian numbers arrive as 0803…, 803…, +234803… and with spaces or
 * dashes through them. Reduce all of those to the local 0-prefixed form
 * so the kitchen always reads the same shape, or return null if it
 * cannot be one.
 */
export function normalisePhone(raw) {
  let digits = String(raw).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("234")) digits = "0" + digits.slice(3);
  if (digits.length === 10 && /^[789]/.test(digits)) digits = "0" + digits;
  return /^0[1-9]\d{9}$/.test(digits) ? digits : null;
}

/** Returns { field, message } for the first problem, or null when clean. */
export function validateOrder({ customer, cart, pickup }) {
  const name = customer.name.trim();
  if (name.length < 2 || !/\p{L}/u.test(name)) {
    return { field: "name", message: "Please enter the name for this order." };
  }

  if (!customer.phone.trim()) {
    return { field: "phone", message: "We need a phone number to reach you about this order." };
  }
  if (!normalisePhone(customer.phone)) {
    return {
      field: "phone",
      message: "That does not look like a Nigerian number. Try 0803 000 0000.",
    };
  }

  if (!pickup) {
    const address = customer.address.trim();
    if (address.length < 6) {
      return {
        field: "address",
        message: "Please give the full address, including the street and area.",
      };
    }
  }

  if (!customer.date) {
    return { field: "date", message: "Tell us the day you need this." };
  }

  if (!parseStrictDate(customer.date)) {
    return { field: "date", message: "That is not a real date." };
  }

  if (customer.date < isoDate(startOfToday())) {
    return { field: "date", message: "That date has already passed." };
  }

  const earliest = earliestDate(cart);
  if (customer.date < earliest) {
    const { days, name: driver } = longestLead(cart);
    return {
      field: "date",
      message:
        `${driver} needs ${days === 1 ? "a day" : `${days} days`} notice, ` +
        `so the earliest we can do this order is ${longDate(earliest)}.`,
    };
  }

  const horizon = startOfToday();
  horizon.setFullYear(horizon.getFullYear() + 1);
  if (customer.date > isoDate(horizon)) {
    return { field: "date", message: "That is more than a year away. Check the year." };
  }

  return null;
}
